/**
 * UdyamOS Production Cloud API Server
 * Fast HTTP REST server backed by persistent SQLite database (node:sqlite)
 * Handling domain queries, invoice creation, device sync, and zero-knowledge grants.
 */

import http from 'node:http';
import { URL } from 'node:url';
import { CloudSyncEngine } from './sync-engine.ts';
import { UdyamDatabase, getDatabase } from './db.ts';

export function createApiServer(
  engine: CloudSyncEngine = new CloudSyncEngine(),
  database: UdyamDatabase = getDatabase()
): http.Server {
  return http.createServer(async (req, res) => {
    const parsedUrl = new URL(req.url ?? '/', `http://${req.headers.host || 'localhost'}`);
    const pathname = parsedUrl.pathname;
    const method = req.method?.toUpperCase();

    const sendJson = (statusCode: number, data: any) => {
      res.writeHead(statusCode, {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Idempotency-Key'
      });
      res.end(JSON.stringify(data));
    };

    if (method === 'OPTIONS') {
      res.writeHead(204, {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Idempotency-Key'
      });
      return res.end();
    }

    // Helper to read JSON request body safely
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

    // ==========================================
    // SYSTEM & HEALTH ENDPOINTS
    // ==========================================
    if (pathname === '/api/v1/health' && method === 'GET') {
      return sendJson(200, {
        status: 'healthy',
        timestamp: new Date().toISOString(),
        version: '0.1.0',
        engine: 'SQLite WAL (node:sqlite)'
      });
    }

    // ==========================================
    // DASHBOARD & TELEMETRY (LIVE SQL)
    // ==========================================
    if (pathname === '/api/v1/dashboard' && method === 'GET') {
      const tenantId = parsedUrl.searchParams.get('tenantId') || 'org-skt-001';
      const dashboard = database.getDashboard(tenantId);
      return sendJson(200, dashboard);
    }

    if (pathname === '/api/v1/platform/telemetry' && method === 'GET') {
      const telemetry = database.getPlatformTelemetry();
      return sendJson(200, telemetry);
    }

    if (pathname === '/api/v1/platform/tenants' && method === 'GET') {
      const tenants = database.getPlatformTenants();
      return sendJson(200, tenants);
    }

    // ==========================================
    // INVOICES & BILLING (SQL ACID TRANSACTIONS)
    // ==========================================
    if (pathname === '/api/v1/invoices' && method === 'GET') {
      const tenantId = parsedUrl.searchParams.get('tenantId') || 'org-skt-001';
      const search = parsedUrl.searchParams.get('search') || undefined;
      const paymentMode = parsedUrl.searchParams.get('paymentMode') || undefined;

      const invoices = database.getInvoices(tenantId, search, paymentMode);
      return sendJson(200, invoices);
    }

    if (pathname.startsWith('/api/v1/invoices/') && method === 'GET') {
      const billNo = pathname.replace('/api/v1/invoices/', '');
      const invoice = database.getInvoiceByBillNo(billNo);
      if (!invoice) {
        return sendJson(404, { error: `Invoice ${billNo} not found in database` });
      }
      return sendJson(200, invoice);
    }

    if (pathname === '/api/v1/invoices' && method === 'POST') {
      const body = await readBody();
      const tenantId = body.tenantId || 'org-skt-001';

      if (!body.lines || !Array.isArray(body.lines) || body.lines.length === 0) {
        return sendJson(400, { error: 'Invoice must contain at least one line item' });
      }

      try {
        const invoice = database.createInvoice(tenantId, body);
        return sendJson(201, { success: true, invoice });
      } catch (err: any) {
        return sendJson(500, { error: err.message || 'Failed to insert invoice into database' });
      }
    }

    // ==========================================
    // PARTIES / CUSTOMERS (SQL KHATA)
    // ==========================================
    if (pathname === '/api/v1/parties' && method === 'GET') {
      const tenantId = parsedUrl.searchParams.get('tenantId') || 'org-skt-001';
      const parties = database.getParties(tenantId);
      return sendJson(200, parties);
    }

    if (pathname === '/api/v1/parties' && method === 'POST') {
      const body = await readBody();
      const tenantId = body.tenantId || 'org-skt-001';

      if (!body.name || !body.city || !body.phone) {
        return sendJson(400, { error: 'Missing required party fields: name, city, phone' });
      }

      const party = database.createParty(tenantId, body);
      return sendJson(201, { success: true, party });
    }

    // ==========================================
    // STOCK & GODOWN LOTS (SQL INVENTORY)
    // ==========================================
    if (pathname === '/api/v1/stock' && method === 'GET') {
      const tenantId = parsedUrl.searchParams.get('tenantId') || 'org-skt-001';
      const stock = database.getStock(tenantId);
      return sendJson(200, stock);
    }

    if (pathname === '/api/v1/stock/cut' && method === 'POST') {
      const body = await readBody();
      const tenantId = body.tenantId || 'org-skt-001';

      if (!body.lotId || !body.metres) {
        return sendJson(400, { error: 'Missing lotId or metres for stock cut' });
      }

      const lot = database.cutStock(tenantId, body.lotId, Number(body.metres));
      if (!lot) {
        return sendJson(404, { error: `Lot ${body.lotId} not found` });
      }
      return sendJson(200, { success: true, lot });
    }

    // ==========================================
    // GST COMPLIANCE & SUMMARY (SQL GSTR-1)
    // ==========================================
    if (pathname === '/api/v1/gst/summary' && method === 'GET') {
      const tenantId = parsedUrl.searchParams.get('tenantId') || 'org-skt-001';
      const gstSummary = database.getGstSummary(tenantId);
      return sendJson(200, gstSummary);
    }

    // ==========================================
    // EDGE DEVICES & HARDWARE
    // ==========================================
    if (pathname === '/api/v1/devices' && method === 'GET') {
      const tenantId = parsedUrl.searchParams.get('tenantId') || 'org-skt-001';
      const dashboard = database.getDashboard(tenantId);
      return sendJson(200, dashboard.devices);
    }

    if (pathname === '/api/v1/devices/register' && method === 'POST') {
      const body = await readBody();
      if (!body.tenantId || !body.deviceCode || !body.displayName) {
        return sendJson(400, { error: 'Missing tenantId, deviceCode, or displayName' });
      }
      const device = engine.registerDevice(body.tenantId, body.deviceCode, body.displayName);
      return sendJson(200, { success: true, device });
    }

    // ==========================================
    // DELTA REPLICATION & OUTBOX SYNC
    // ==========================================
    if (pathname === '/api/v1/sync/push' && method === 'POST') {
      const body = await readBody();
      const idempotencyKey = (req.headers['x-idempotency-key'] as string) || body.idempotencyKey;
      if (!body.tenantId || !body.deviceId || !idempotencyKey || !Array.isArray(body.events)) {
        return sendJson(400, { error: 'Missing tenantId, deviceId, idempotencyKey, or events array' });
      }

      const result = engine.pushEvents(body.tenantId, body.deviceId, idempotencyKey, body.events);
      return sendJson(result.status, result);
    }

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

    // ==========================================
    // SUPPORT GRANTS (ZERO-KNOWLEDGE PRIVACY)
    // ==========================================
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
    return sendJson(404, { error: `Endpoint '${pathname}' not found on UdyamOS API` });
  });
}

// Direct execution entry point
if (process.argv[1]?.endsWith('server.ts')) {
  const PORT = process.env.PORT || 3000;
  const server = createApiServer();
  server.listen(PORT, () => {
    console.log(`✓ UdyamOS Production SQLite API Gateway listening on http://localhost:${PORT}`);
  });
}
