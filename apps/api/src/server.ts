/**
 * UdyamOS Cloud API Server
 * Light, fast HTTP server handling device registration, sync push/pull, and support grants.
 */

import http from 'node:http';
import { URL } from 'node:url';
import { CloudSyncEngine } from './sync-engine.ts';

export function createApiServer(engine: CloudSyncEngine = new CloudSyncEngine()): http.Server {
  return http.createServer(async (req, res) => {
    const parsedUrl = new URL(req.url ?? '/', `http://${req.headers.host || 'localhost'}`);
    const pathname = parsedUrl.pathname;
    const method = req.method?.toUpperCase();

    const sendJson = (statusCode: number, data: any) => {
      res.writeHead(statusCode, {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Idempotency-Key'
      });
      res.end(JSON.stringify(data));
    };

    if (method === 'OPTIONS') {
      res.writeHead(204, {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Idempotency-Key'
      });
      return res.end();
    }

    // Health check
    if (pathname === '/api/v1/health' && method === 'GET') {
      return sendJson(200, { status: 'healthy', timestamp: new Date().toISOString() });
    }

    // Helper to read JSON request body
    const readBody = async (): Promise<any> => {
      return new Promise((resolve) => {
        let body = '';
        req.on('data', (chunk) => {
          body += chunk.toString();
        });
        req.on('end', () => {
          try {
            resolve(body ? JSON.parse(body) : {});
          } catch {
            resolve({});
          }
        });
      });
    };

    // 1. Device Registration Handshake
    if (pathname === '/api/v1/devices/register' && method === 'POST') {
      const body = await readBody();
      if (!body.tenantId || !body.deviceCode || !body.displayName) {
        return sendJson(400, { error: 'Missing tenantId, deviceCode, or displayName' });
      }
      const device = engine.registerDevice(body.tenantId, body.deviceCode, body.displayName);
      return sendJson(200, { success: true, device });
    }

    // 2. Batch Event Push (Outbox Sync)
    if (pathname === '/api/v1/sync/push' && method === 'POST') {
      const body = await readBody();
      const idempotencyKey = (req.headers['x-idempotency-key'] as string) || body.idempotencyKey;
      if (!body.tenantId || !body.deviceId || !idempotencyKey || !Array.isArray(body.events)) {
        return sendJson(400, { error: 'Missing tenantId, deviceId, idempotencyKey, or events array' });
      }

      const result = engine.pushEvents(body.tenantId, body.deviceId, idempotencyKey, body.events);
      return sendJson(result.status, result);
    }

    // 3. Delta Replication Stream (Pull)
    if (pathname === '/api/v1/sync/pull' && method === 'GET') {
      const tenantId = parsedUrl.searchParams.get('tenantId');
      const sinceCursor = parseInt(parsedUrl.searchParams.get('sinceCursor') || '0', 10);
      const limit = parseInt(parsedUrl.searchParams.get('limit') || '100', 10);

      if (!tenantId) {
        return sendJson(400, { error: 'Missing tenantId query parameter' });
      }

      const delta = engine.pullDelta(tenantId, sinceCursor, limit);
      return sendJson(200, delta);
    }

    // 4. Time-Boxed Support Grant Workflow (Zero-Knowledge Protection)
    if (pathname === '/api/v1/support/grant' && method === 'POST') {
      const body = await readBody();
      if (!body.tenantId || !body.staffUserId || !body.grantedBy || !body.reason) {
        return sendJson(400, { error: 'Missing required grant parameters' });
      }

      const grant = engine.grantSupportAccess(
        body.tenantId,
        body.staffUserId,
        body.durationHours || 4,
        body.grantedBy,
        body.reason
      );
      return sendJson(200, { success: true, grant });
    }

    // Default 404
    return sendJson(404, { error: 'Endpoint not found' });
  });
}

// Direct execution entry point
if (process.argv[1]?.endsWith('server.ts')) {
  const PORT = process.env.PORT || 3000;
  const server = createApiServer();
  server.listen(PORT, () => {
    console.log(`✓ UdyamOS Cloud Sync Gateway listening on http://localhost:${PORT}`);
  });
}
