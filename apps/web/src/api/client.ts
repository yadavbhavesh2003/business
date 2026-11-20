/**
 * UdyamOS Web API Client
 * Connects frontend views to backend REST endpoints (/api/v1/...)
 * with resilient offline fallback to local view-models.
 */

import { formatInr } from '@udyamos/core';

export interface DashboardData {
  tenantName: string;
  kpis: Array<{
    label: string;
    value: string;
    note: string;
    noteColor: string;
    screen: string;
  }>;
  days: Array<{ label: string; s: number; c: number }>;
  ageing: Array<{
    label: string;
    amount: string;
    parties: string;
    pct: number;
    color: string;
  }>;
  alerts: Array<{
    tag: string;
    tagBg: string;
    tagColor: string;
    title: string;
    meta: string;
    action: string;
    screen: string;
  }>;
  parties: Array<{
    name: string;
    city: string;
    due: string;
    days: string;
    limit: string;
    limitColor: string;
    daysColor: string;
  }>;
  staff: Array<{
    name: string;
    role: string;
    bills: number;
    disc: string;
    cancel: number;
    cash: string;
    cashColor: string;
  }>;
  devices: Array<{
    id: string;
    name: string;
    who: string;
    state: string;
    ok: boolean;
  }>;
  updatedAt: string;
  isLive?: boolean;
}

export interface InvoiceRecord {
  id: string;
  billNo: string;
  date: string;
  partyName: string;
  partyMobile: string;
  itemsSummary: string;
  taxableTotal: number;
  cgstTotal: number;
  sgstTotal: number;
  igstTotal: number;
  roundOff: number;
  netPayable: number;
  amountInWordsGu: string;
  amountInWordsEn: string;
  paymentMode: 'Cash' | 'UPI' | 'Credit' | 'Split';
  syncStatus: 'synced' | 'pending' | 'failed';
  approvalStatus: 'approved' | 'pending_approval' | 'rejected';
}

export interface CustomerParty {
  id: string;
  name: string;
  city: string;
  phone: string;
  gstin?: string;
  creditLimit: number;
  creditDays: number;
  currentBalance: number;
  overdueDays: number;
  status: 'normal' | 'near_limit' | 'overdue';
}

export interface LotItem {
  lotId: string;
  itemName: string;
  godown: string;
  thanCount: number;
  metres: number;
  ratePerMetre: number;
  status: 'available' | 'low' | 'negative_conflict';
}

export interface PlatformTelemetryData {
  activeTenants: number;
  todayBillsCount: number;
  mrrFormatted: string;
  activePilots: number;
  syncHealthPct: string;
  activeSupportGrantsCount: number;
}

export interface TenantTelemetry {
  tenantId: string;
  name: string;
  plan: 'Growth' | 'Starter' | 'Pilot';
  devicesCount: number;
  billsProcessedToday: number;
  syncLagSeconds: number;
  activeSupportGrant: boolean;
  status: 'healthy' | 'warning' | 'degraded';
}

class ApiClient {
  private baseUrl: string = '';

  constructor() {
    // In browser, relative '/api/v1' uses Vite proxy in dev and same-origin in prod
    this.baseUrl = '/api/v1';
  }

  private async fetchJson<T>(path: string, options?: RequestInit): Promise<T> {
    const res = await fetch(`${this.baseUrl}${path}`, {
      headers: {
        'Content-Type': 'application/json',
        ...(options?.headers || {})
      },
      ...options
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`API Error ${res.status}: ${errText}`);
    }

    return res.json() as Promise<T>;
  }

  /**
   * Loads full live dashboard state.
   */
  public async getDashboard(tenantId: string = 'org-skt-001'): Promise<DashboardData> {
    try {
      const data = await this.fetchJson<DashboardData>(`/dashboard?tenantId=${tenantId}`);
      return { ...data, isLive: true };
    } catch (err) {
      console.warn('Backend API currently unreachable, using resilient offline seed data:', err);
      return this.getFallbackDashboard();
    }
  }

  /**
   * Invoices list with live filters.
   */
  public async getInvoices(filter?: { search?: string; paymentMode?: string }): Promise<InvoiceRecord[]> {
    try {
      const params = new URLSearchParams();
      if (filter?.search) params.set('search', filter.search);
      if (filter?.paymentMode && filter.paymentMode !== 'all') params.set('paymentMode', filter.paymentMode);

      const qs = params.toString() ? `?${params.toString()}` : '';
      return await this.fetchJson<InvoiceRecord[]>(`/invoices${qs}`);
    } catch (err) {
      console.warn('Backend unreachable for invoices, using cached fallback:', err);
      return this.getFallbackInvoices();
    }
  }

  /**
   * Create an invoice through backend.
   */
  public async createInvoice(data: any): Promise<{ success: boolean; invoice: InvoiceRecord }> {
    return this.fetchJson<{ success: boolean; invoice: InvoiceRecord }>('/invoices', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  /**
   * Parties directory.
   */
  public async getParties(): Promise<CustomerParty[]> {
    try {
      return await this.fetchJson<CustomerParty[]>('/parties');
    } catch (err) {
      console.warn('Backend unreachable for parties, using cached fallback:', err);
      return this.getFallbackParties();
    }
  }

  /**
   * Stock lots.
   */
  public async getStock(): Promise<LotItem[]> {
    try {
      return await this.fetchJson<LotItem[]>('/stock');
    } catch (err) {
      console.warn('Backend unreachable for stock, using cached fallback:', err);
      return this.getFallbackStock();
    }
  }

  /**
   * Platform telemetry (SaaS view).
   */
  public async getPlatformTelemetry(): Promise<PlatformTelemetryData> {
    try {
      return await this.fetchJson<PlatformTelemetryData>('/platform/telemetry');
    } catch (err) {
      return {
        activeTenants: 142,
        todayBillsCount: 4892,
        mrrFormatted: formatInr(284000),
        activePilots: 28,
        syncHealthPct: '99.94%',
        activeSupportGrantsCount: 2
      };
    }
  }

  /**
   * Platform tenants list.
   */
  public async getPlatformTenants(): Promise<TenantTelemetry[]> {
    try {
      return await this.fetchJson<TenantTelemetry[]>('/platform/tenants');
    } catch (err) {
      return [
        {
          tenantId: 'org-radhe-001',
          name: 'Radhe Radhe Textiles (Surat)',
          plan: 'Growth',
          devicesCount: 2,
          billsProcessedToday: 41,
          syncLagSeconds: 1,
          activeSupportGrant: true,
          status: 'healthy'
        },
        {
          tenantId: 'org-navkar-002',
          name: 'Navkar Dress Materials (Ahmedabad)',
          plan: 'Growth',
          devicesCount: 3,
          billsProcessedToday: 68,
          syncLagSeconds: 2,
          activeSupportGrant: false,
          status: 'healthy'
        },
        {
          tenantId: 'org-bhavna-003',
          name: 'Bhavna Saree House (Bhavnagar)',
          plan: 'Pilot',
          devicesCount: 1,
          billsProcessedToday: 14,
          syncLagSeconds: 42,
          activeSupportGrant: false,
          status: 'warning'
        }
      ];
    }
  }

  // --- Resilient Offline Fallbacks (Ensure Zero Broken Screens) ---
  private getFallbackDashboard(): DashboardData {
    return {
      tenantName: 'Shree Krishna Textiles',
      kpis: [
        { label: "Today's sales", value: '₹2,86,450', note: '▲ 12% vs last Thursday · 41 bills', noteColor: '#0B5A54', screen: 'Invoices' },
        { label: 'Collected today', value: '₹1,94,000', note: 'Cash ₹38,000 · UPI/Bank ₹1,56,000', noteColor: '#5B616B', screen: 'Payments' },
        { label: 'Receivable', value: '₹18,42,300', note: '64 parties with balance dues', noteColor: '#5B616B', screen: 'Parties' },
        { label: 'Overdue > 30 days', value: '₹6,10,800', note: '9 parties over credit days', noteColor: '#9A3412', screen: 'Collections' },
        { label: 'Low / negative stock', value: '7 lots', note: '2 negative after offline sales', noteColor: '#9A3412', screen: 'Stock' }
      ],
      days: [
        { label: '6', s: 180, c: 120 },
        { label: '7', s: 220, c: 160 },
        { label: '8', s: 140, c: 150 },
        { label: '9', s: 260, c: 180 },
        { label: '10', s: 300, c: 200 },
        { label: '11', s: 90, c: 140 },
        { label: '12', s: 0, c: 0 },
        { label: '13', s: 210, c: 130 },
        { label: '14', s: 240, c: 210 },
        { label: '15', s: 190, c: 170 },
        { label: '16', s: 280, c: 160 },
        { label: '17', s: 310, c: 260 },
        { label: '18', s: 250, c: 220 },
        { label: '19', s: 286, c: 194 }
      ],
      ageing: [
        { label: 'Not yet due / 0–30 days', amount: '₹12,31,500', parties: '48 parties', pct: 66.8, color: '#0F766E' },
        { label: '31–60 days', amount: '₹3,42,100', parties: '9 parties', pct: 18.6, color: '#E0A458' },
        { label: '61–90 days', amount: '₹1,58,700', parties: '4 parties', pct: 8.6, color: '#C2410C' },
        { label: '90+ days', amount: '₹1,10,000', parties: '3 parties', pct: 6.0, color: '#7C2D12' }
      ],
      alerts: [
        {
          tag: 'Approval',
          tagBg: '#FDF1E4',
          tagColor: '#9A3412',
          title: 'Discount 14% on INV D01-001877',
          meta: 'Kiran (cashier) · limit 8% · ₹42,600 bill',
          action: 'Review',
          screen: 'Approvals'
        },
        {
          tag: 'Sync conflict',
          tagBg: '#FDF1E4',
          tagColor: '#9A3412',
          title: 'Lot RL-2291 sold on 2 devices offline',
          meta: 'Stock now −18 m · Godown 1',
          action: 'Resolve',
          screen: 'ConflictDetail'
        },
        {
          tag: 'Promise due',
          tagBg: '#EEF0F7',
          tagColor: '#2E3A75',
          title: 'Shiv Fabrics promised ₹40,000 today',
          meta: '52 days overdue · last call 12 Nov',
          action: 'Call',
          screen: 'Collections'
        },
        {
          tag: 'Device',
          tagBg: '#EEF0EC',
          tagColor: '#3C424B',
          title: 'Godown phone not synced for 2 days',
          meta: '14 events pending · last seen Tue 6:40 pm',
          action: 'Check',
          screen: 'RevokeDevice'
        }
      ],
      parties: [
        { name: 'Patel Sarees', city: 'Surat', due: '₹2,15,000', days: '94 d', limit: '108%', limitColor: '#C2410C', daysColor: '#9A3412' },
        { name: 'Mahavir Cloth Store', city: 'Mahuva', due: '₹1,64,876', days: '71 d', limit: '110%', limitColor: '#C2410C', daysColor: '#9A3412' },
        { name: 'Shiv Fabrics', city: 'Palitana', due: '₹96,400', days: '52 d', limit: '96%', limitColor: '#0F766E', daysColor: '#B45309' },
        { name: 'Jay Ambe Garments', city: 'Bhavnagar', due: '₹88,200', days: '38 d', limit: '59%', limitColor: '#0F766E', daysColor: '#B45309' },
        { name: 'Raghuvir Traders', city: 'Amreli', due: '₹83,900', days: '33 d', limit: '56%', limitColor: '#0F766E', daysColor: '#15181C' }
      ],
      staff: [
        { name: 'Kiran Solanki', role: 'Cashier · Counter 1', bills: 18, disc: '3 (1 over limit)', cancel: 0, cash: '−₹500', cashColor: '#9A3412' },
        { name: 'Mehul Rathod', role: 'Cashier · Counter 2', bills: 15, disc: '1', cancel: 1, cash: '₹0', cashColor: '#0B5A54' },
        { name: 'Divya Joshi', role: 'Manager', bills: 6, disc: '2', cancel: 0, cash: '₹0', cashColor: '#0B5A54' },
        { name: 'Anil Makwana', role: 'Godown · challans', bills: 2, disc: '0', cancel: 0, cash: '—', cashColor: '#5B616B' }
      ],
      devices: [
        { id: 'dev-001', name: 'Counter 1 · Redmi 12', who: 'Kiran, Mehul · D01', state: 'Synced 1 min ago', ok: true },
        { id: 'dev-002', name: 'Counter 2 · Samsung A14', who: 'Mehul · D02', state: 'Synced 4 min ago', ok: true },
        { id: 'dev-003', name: 'Godown Phone · Vivo Y20', who: 'Anil (Godown) · D03', state: '14 events pending · last seen Tue 6:40 pm', ok: false }
      ],
      updatedAt: new Date().toISOString(),
      isLive: false
    };
  }

  private getFallbackInvoices(): InvoiceRecord[] {
    return [
      {
        id: 'inv-1',
        billNo: 'INV-D01-001880',
        date: '2026-11-20 15:42',
        partyName: 'Shreeji Saree Depot',
        partyMobile: '9825012345',
        itemsSummary: 'Cotton 60s (40m) · Lot #LOT-CTN-601',
        taxableTotal: 2600,
        cgstTotal: 65,
        sgstTotal: 65,
        igstTotal: 0,
        roundOff: 0,
        netPayable: 2730,
        amountInWordsGu: 'રૂપિયા બે હજાર સાતસો ત્રીસ ફક્ત',
        amountInWordsEn: 'Rupees Two Thousand Seven Hundred Thirty Only',
        paymentMode: 'UPI',
        syncStatus: 'synced',
        approvalStatus: 'approved'
      },
      {
        id: 'inv-2',
        billNo: 'INV-D01-001879',
        date: '2026-11-20 14:15',
        partyName: 'Cash Counter Sale',
        partyMobile: '',
        itemsSummary: 'Rayon Floral Print (25m) · Lot #LOT-RYN-2291',
        taxableTotal: 2125,
        cgstTotal: 53.13,
        sgstTotal: 53.13,
        igstTotal: 0,
        roundOff: -0.26,
        netPayable: 2231,
        amountInWordsGu: 'રૂપિયા બે હજાર બસો એકત્રીસ ફક્ત',
        amountInWordsEn: 'Rupees Two Thousand Two Hundred Thirty-One Only',
        paymentMode: 'Cash',
        syncStatus: 'synced',
        approvalStatus: 'approved'
      },
      {
        id: 'inv-3',
        billNo: 'INV-D02-000450',
        date: '2026-11-20 12:30',
        partyName: 'Ambika Fashion',
        partyMobile: '9825123456',
        itemsSummary: 'Chanderi Silk (10m) · Lot #LOT-CHN-440',
        taxableTotal: 1400,
        cgstTotal: 35,
        sgstTotal: 35,
        igstTotal: 0,
        roundOff: 0,
        netPayable: 1470,
        amountInWordsGu: 'રૂપિયા એક હજાર ચારસો સિત્તેર ફક્ત',
        amountInWordsEn: 'Rupees One Thousand Four Hundred Seventy Only',
        paymentMode: 'Credit',
        syncStatus: 'pending',
        approvalStatus: 'approved'
      },
      {
        id: 'inv-4',
        billNo: 'INV-D01-001878',
        date: '2026-11-19 18:20',
        partyName: 'Mahalaxmi Fabrics',
        partyMobile: '9825234567',
        itemsSummary: 'Pure Cambric 50s (50m) · Lot #LOT-CAM-105',
        taxableTotal: 4000,
        cgstTotal: 100,
        sgstTotal: 100,
        igstTotal: 0,
        roundOff: 0,
        netPayable: 4200,
        amountInWordsGu: 'રૂપિયા ચાર હજાર બસો ફક્ત',
        amountInWordsEn: 'Rupees Four Thousand Two Hundred Only',
        paymentMode: 'Credit',
        syncStatus: 'synced',
        approvalStatus: 'approved'
      }
    ];
  }

  private getFallbackParties(): CustomerParty[] {
    return [
      {
        id: 'cust-001',
        name: 'Patel Sarees',
        city: 'Surat',
        phone: '+91 98251 11222',
        creditLimit: 200000,
        creditDays: 30,
        currentBalance: 215000,
        overdueDays: 94,
        status: 'overdue'
      },
      {
        id: 'cust-002',
        name: 'Mahavir Cloth Store',
        city: 'Mahuva',
        phone: '+91 98252 22333',
        creditLimit: 150000,
        creditDays: 30,
        currentBalance: 164876,
        overdueDays: 71,
        status: 'overdue'
      },
      {
        id: 'cust-003',
        name: 'Shiv Fabrics',
        city: 'Palitana',
        phone: '+91 98253 33444',
        creditLimit: 100000,
        creditDays: 15,
        currentBalance: 96400,
        overdueDays: 52,
        status: 'overdue'
      },
      {
        id: 'cust-004',
        name: 'Jay Ambe Garments',
        city: 'Bhavnagar',
        phone: '+91 98254 44555',
        creditLimit: 150000,
        creditDays: 30,
        currentBalance: 88200,
        overdueDays: 38,
        status: 'near_limit'
      },
      {
        id: 'cust-005',
        name: 'Raghuvir Traders',
        city: 'Amreli',
        phone: '+91 98255 55666',
        creditLimit: 150000,
        creditDays: 30,
        currentBalance: 83900,
        overdueDays: 33,
        status: 'near_limit'
      },
      {
        id: 'cust-006',
        name: 'Shreeji Saree Depot',
        city: 'Surat',
        phone: '+91 98256 66777',
        creditLimit: 500000,
        creditDays: 30,
        currentBalance: 182400,
        overdueDays: 12,
        status: 'normal'
      }
    ];
  }

  private getFallbackStock(): LotItem[] {
    return [
      {
        lotId: 'LOT-CTN-601',
        itemName: 'Cotton Than 60s (Surat Mill)',
        godown: 'Godown 1 (Ring Road)',
        thanCount: 14,
        metres: 560,
        ratePerMetre: 65,
        status: 'available'
      },
      {
        lotId: 'LOT-RYN-2291',
        itemName: 'Rayon Floral Print 14kg',
        godown: 'Godown 1 (Ring Road)',
        thanCount: 0,
        metres: -15,
        ratePerMetre: 85,
        status: 'negative_conflict'
      },
      {
        lotId: 'LOT-CHN-440',
        itemName: 'Chanderi Silk Jacquard Border',
        godown: 'Godown 2 (Khatodara)',
        thanCount: 2,
        metres: 35,
        ratePerMetre: 140,
        status: 'low'
      },
      {
        lotId: 'LOT-CAM-105',
        itemName: 'Pure Cambric 50s',
        godown: 'Godown 1 (Ring Road)',
        thanCount: 8,
        metres: 320,
        ratePerMetre: 80,
        status: 'available'
      }
    ];
  }
}

export const apiClient = new ApiClient();
