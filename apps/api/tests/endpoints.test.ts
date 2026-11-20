import test from 'node:test';
import assert from 'node:assert';
import http from 'node:http';
import { createApiServer } from '../src/server.ts';
import { CloudSyncEngine } from '../src/sync-engine.ts';
import { UdyamDatabase } from '../src/db.ts';

function makeRequest(
  server: http.Server,
  method: string,
  path: string,
  body?: any
): Promise<{ status: number; body: any }> {
  return new Promise((resolve, reject) => {
    const addr = server.address() as any;
    const req = http.request(
      {
        host: '127.0.0.1',
        port: addr.port,
        path,
        method,
        headers: {
          'Content-Type': 'application/json'
        }
      },
      (res) => {
        let resBody = '';
        res.on('data', (chunk) => {
          resBody += chunk.toString();
        });
        res.on('end', () => {
          try {
            resolve({ status: res.statusCode || 500, body: JSON.parse(resBody) });
          } catch {
            resolve({ status: res.statusCode || 500, body: resBody });
          }
        });
      }
    );
    req.on('error', reject);
    if (body) {
      req.write(JSON.stringify(body));
    }
    req.end();
  });
}

test('UdyamOS Production SQLite REST API Suite', async (t) => {
  const engine = new CloudSyncEngine();
  const db = new UdyamDatabase(':memory:');
  const server = createApiServer(engine, db);

  await new Promise<void>((resolve) => server.listen(0, resolve));

  t.after(() => {
    server.close();
    db.close();
  });

  // 1. Dashboard Endpoint
  await t.test('GET /api/v1/dashboard returns real SQL KPIs and lists', async () => {
    const res = await makeRequest(server, 'GET', '/api/v1/dashboard?tenantId=org-skt-001');
    assert.strictEqual(res.status, 200);
    assert.strictEqual(res.body.tenantName, 'Shree Krishna Textiles');
    assert.strictEqual(res.body.kpis.length, 5);
    assert.ok(res.body.days.length > 0);
    assert.ok(res.body.ageing.length > 0);
    assert.ok(res.body.alerts.length > 0);
    assert.ok(res.body.parties.length > 0);
    assert.ok(res.body.staff.length > 0);
    assert.ok(res.body.devices.length > 0);
  });

  // 2. Invoices List & Detail
  await t.test('GET /api/v1/invoices returns invoices list with filters from SQLite', async () => {
    const res = await makeRequest(server, 'GET', '/api/v1/invoices?tenantId=org-skt-001');
    assert.strictEqual(res.status, 200);
    assert.ok(Array.isArray(res.body));
    assert.ok(res.body.length >= 3);

    const firstBill = res.body[0];
    const detailRes = await makeRequest(server, 'GET', `/api/v1/invoices/${firstBill.billNo}`);
    assert.strictEqual(detailRes.status, 200);
    assert.strictEqual(detailRes.body.bill_no, firstBill.billNo);
    assert.ok(detailRes.body.amount_words_gu.includes('રૂપિયા'));
  });

  // 3. Create Invoice with Section 170 Rounding & Gujarati Words into SQLite
  await t.test('POST /api/v1/invoices writes bill to SQLite and updates stock', async () => {
    const res = await makeRequest(server, 'POST', '/api/v1/invoices', {
      tenantId: 'org-skt-001',
      customerId: 'cust-006',
      deviceCode: 'D01',
      cashierName: 'Kiran Solanki',
      paymentMode: 'Credit',
      isIntraState: true,
      lines: [
        {
          productId: 'prd-001',
          lotId: 'LOT-CTN-601',
          qty: 20,
          rate: 65
        }
      ]
    });

    assert.strictEqual(res.status, 201);
    assert.strictEqual(res.body.success, true);
    assert.ok(res.body.invoice.bill_no.startsWith('INV-D01-'));
    assert.strictEqual(res.body.invoice.taxable_total, 1300);
    assert.strictEqual(res.body.invoice.cgst_total, 32.5);
    assert.strictEqual(res.body.invoice.sgst_total, 32.5);
    assert.strictEqual(res.body.invoice.net_payable, 1365);
    assert.ok(res.body.invoice.amount_words_gu.includes('રૂપિયા'));
  });

  // 4. Parties Directory from SQLite
  await t.test('GET /api/v1/parties and POST /api/v1/parties', async () => {
    const getRes = await makeRequest(server, 'GET', '/api/v1/parties?tenantId=org-skt-001');
    assert.strictEqual(getRes.status, 200);
    assert.ok(getRes.body.length >= 6);

    const postRes = await makeRequest(server, 'POST', '/api/v1/parties', {
      tenantId: 'org-skt-001',
      name: 'Radhika Silks',
      city: 'Jamnagar',
      phone: '+91 98259 00112',
      creditLimit: 250000,
      creditDays: 30
    });
    assert.strictEqual(postRes.status, 201);
    assert.strictEqual(postRes.body.party.name, 'Radhika Silks');
  });

  // 5. Stock and Lot Cutting from SQLite
  await t.test('GET /api/v1/stock and POST /api/v1/stock/cut', async () => {
    const getRes = await makeRequest(server, 'GET', '/api/v1/stock?tenantId=org-skt-001');
    assert.strictEqual(getRes.status, 200);
    const initialMetres = getRes.body.find((l: any) => l.lotId === 'LOT-CAM-105').metres;

    const cutRes = await makeRequest(server, 'POST', '/api/v1/stock/cut', {
      tenantId: 'org-skt-001',
      lotId: 'LOT-CAM-105',
      metres: 25
    });
    assert.strictEqual(cutRes.status, 200);
    assert.strictEqual(cutRes.body.lot.available_metres, initialMetres - 25);
  });

  // 6. Platform Telemetry from SQLite
  await t.test('GET /api/v1/platform/telemetry and /tenants', async () => {
    const telemRes = await makeRequest(server, 'GET', '/api/v1/platform/telemetry');
    assert.strictEqual(telemRes.status, 200);
    assert.ok(telemRes.body.activeTenants >= 4);

    const tenantsRes = await makeRequest(server, 'GET', '/api/v1/platform/tenants');
    assert.strictEqual(tenantsRes.status, 200);
    assert.ok(tenantsRes.body.length >= 4);
  });

  // 7. GST Summary from SQLite
  await t.test('GET /api/v1/gst/summary returns GSTR-1 breakdown', async () => {
    const gstRes = await makeRequest(server, 'GET', '/api/v1/gst/summary?tenantId=org-skt-001');
    assert.strictEqual(gstRes.status, 200);
    assert.ok(gstRes.body.totalTaxable > 0);
  });
});
