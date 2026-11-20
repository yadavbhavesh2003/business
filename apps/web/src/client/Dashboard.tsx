import React, { useState, useEffect } from 'react';
import { apiClient, type DashboardData } from '../api/client.ts';

export interface DashboardProps {
  tenantName?: string;
  onNavigate?: (screenId: string) => void;
}

export const ClientDashboard: React.FC<DashboardProps> = ({
  tenantName = 'Shree Krishna Textiles',
  onNavigate
}) => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  const fetchDashboard = async () => {
    try {
      setIsRefreshing(true);
      const res = await apiClient.getDashboard(tenantName);
      setData(res);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, [tenantName]);

  // Use loaded data or fallback
  const kpis = data?.kpis || [];
  const days = data?.days || [];
  const ageing = data?.ageing || [];
  const alerts = data?.alerts || [];
  const parties = data?.parties || [];
  const staff = data?.staff || [];
  const devices = data?.devices || [];
  const isLive = data?.isLive ?? false;

  return (
    <div
      style={{
        fontFamily: "Inter, 'Noto Sans Gujarati', system-ui, sans-serif",
        color: '#15181C',
        background: '#F6F7F5',
        minHeight: '100%',
        boxSizing: 'border-box',
        padding: '24px 32px 48px',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px'
      }}
    >
      {/* Top Header */}
      <header style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '16px', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <h1 style={{ margin: 0, fontSize: '24px', fontWeight: 700 }}>Good afternoon, Rameshbhai</h1>
            {isLive ? (
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 600,
                  background: '#DEF7EC',
                  color: '#03543F',
                  padding: '2px 8px',
                  borderRadius: '12px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#059669' }}></span>
                Backend Online
              </span>
            ) : (
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 600,
                  background: '#FEF3C7',
                  color: '#92400E',
                  padding: '2px 8px',
                  borderRadius: '12px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#D97706' }}></span>
                Edge Cache
              </span>
            )}
          </div>
          <span style={{ fontSize: '14px', color: '#5B616B' }}>
            {data?.tenantName || tenantName} · Bhavnagar · Thu 19 Nov 2026
          </span>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '12px' }}>
          {/* Search bar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: '#FFFFFF',
              border: '1px solid #DADDD8',
              borderRadius: '10px',
              padding: '0 12px',
              height: '44px',
              minWidth: '260px',
              color: '#5B616B',
              fontSize: '14px'
            }}
          >
            <span style={{ fontSize: '15px' }}>🔍</span>
            <span style={{ flex: 1 }}>Search party, invoice no., lot…</span>
            <span style={{ fontSize: '11px', border: '1px solid #DADDD8', borderRadius: '6px', padding: '1px 6px' }}>Ctrl K</span>
          </div>

          <button
            onClick={fetchDashboard}
            disabled={isRefreshing}
            title="Refresh dashboard from backend"
            style={{
              height: '44px',
              borderRadius: '10px',
              border: '1px solid #DADDD8',
              background: '#FFFFFF',
              color: '#15181C',
              fontSize: '14px',
              padding: '0 14px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer'
            }}
          >
            <span>🔄</span>
            <span>{isRefreshing ? 'Syncing…' : 'Sync'}</span>
          </button>

          {/* Sync Pill */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              height: '44px',
              padding: '0 14px',
              borderRadius: '10px',
              background: '#E6F2F0',
              color: '#0B5A54',
              fontSize: '13px',
              fontWeight: 500
            }}
          >
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#0F766E' }}></span>
            <span>Synced 1m ago · D01, D02 ok</span>
          </div>

          {/* New Bill Button */}
          <button
            onClick={() => onNavigate?.('InvoiceNew')}
            style={{
              height: '44px',
              padding: '0 18px',
              borderRadius: '10px',
              background: '#0F766E',
              color: '#FFFFFF',
              border: 'none',
              fontWeight: 600,
              fontSize: '14px',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <span>+</span>
            <span>New sale bill (F2)</span>
          </button>
        </div>
      </header>

      {/* KPI 5-Card Grid */}
      <section
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
          gap: '16px'
        }}
      >
        {kpis.map((kpi, idx) => (
          <div
            key={idx}
            onClick={() => onNavigate?.(kpi.screen)}
            style={{
              background: '#FFFFFF',
              border: '1px solid #E3E5E1',
              borderRadius: '12px',
              padding: '16px 20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
              cursor: 'pointer',
              boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
              transition: 'transform 0.15s, border-color 0.15s'
            }}
          >
            <div style={{ fontSize: '13px', color: '#5B616B', fontWeight: 500 }}>
              {kpi.label}
            </div>
            <div
              style={{
                fontSize: '24px',
                fontWeight: 700,
                color: '#15181C',
                fontVariantNumeric: 'tabular-nums'
              }}
            >
              {kpi.value}
            </div>
            <div style={{ fontSize: '12px', color: kpi.noteColor, fontWeight: 500 }}>
              {kpi.note}
            </div>
          </div>
        ))}
      </section>

      {/* 2-Column Section: 14-Day Sales Chart & Receivables Ageing */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))',
          gap: '20px'
        }}
      >
        {/* Left: 14-day sales vs collections bar chart */}
        <section
          style={{
            background: '#FFFFFF',
            border: '1px solid #E3E5E1',
            borderRadius: '12px',
            padding: '20px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h2 style={{ margin: 0, fontSize: '16px', fontWeight: 700 }}>Sales vs collection (last 14 days)</h2>
              <div style={{ fontSize: '12px', color: '#5B616B', marginTop: '2px' }}>
                ₹ in thousands · Avg ₹2.41L/day
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', fontSize: '12px', color: '#5B616B' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '10px', height: '10px', background: '#0F766E', borderRadius: '2px' }}></span>
                Sales
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '10px', height: '10px', background: '#99D5CF', borderRadius: '2px' }}></span>
                Collection
              </span>
            </div>
          </div>

          {/* Bar Chart Area */}
          <div
            style={{
              height: '180px',
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              gap: '6px',
              paddingTop: '20px',
              borderBottom: '1px solid #E3E5E1'
            }}
          >
            {days.map((d, i) => (
              <div
                key={i}
                style={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '4px',
                  height: '100%',
                  justifyContent: 'flex-end'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: '2px', height: '140px' }}>
                  {/* Sales bar */}
                  <div
                    title={`Sales: ₹${d.s}k`}
                    style={{
                      width: '10px',
                      height: `${(d.s / 320) * 140}px`,
                      background: '#0F766E',
                      borderRadius: '2px 2px 0 0'
                    }}
                  ></div>
                  {/* Collection bar */}
                  <div
                    title={`Collection: ₹${d.c}k`}
                    style={{
                      width: '10px',
                      height: `${(d.c / 320) * 140}px`,
                      background: '#99D5CF',
                      borderRadius: '2px 2px 0 0'
                    }}
                  ></div>
                </div>
                <span style={{ fontSize: '11px', color: '#5B616B' }}>{d.label}</span>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#5B616B' }}>
            <span>6 Nov</span>
            <span>Today (19 Nov)</span>
          </div>
        </section>

        {/* Right: Receivables Ageing Multi-Segment Progress Bar */}
        <section
          style={{
            background: '#FFFFFF',
            border: '1px solid #E3E5E1',
            borderRadius: '12px',
            padding: '20px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h2 style={{ margin: 0, fontSize: '16px', fontWeight: 700 }}>Receivables ageing</h2>
              <div style={{ fontSize: '12px', color: '#5B616B', marginTop: '2px' }}>
                Total outstanding: ₹18,42,300 across 64 parties
              </div>
            </div>
            <button
              onClick={() => onNavigate?.('Collections')}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#0F766E',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              View ledger list →
            </button>
          </div>

          {/* Multi-segment bar */}
          <div
            style={{
              height: '14px',
              width: '100%',
              borderRadius: '7px',
              display: 'flex',
              overflow: 'hidden',
              background: '#F1F3F0'
            }}
          >
            {ageing.map((a, i) => (
              <div
                key={i}
                title={`${a.label}: ${a.amount} (${a.pct}%)`}
                style={{ width: `${a.pct}%`, background: a.color, height: '100%' }}
              ></div>
            ))}
          </div>

          {/* Ageing Breakdown List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {ageing.map((a, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontSize: '13px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span
                    style={{
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                      background: a.color
                    }}
                  ></span>
                  <span>{a.label}</span>
                  <span style={{ fontSize: '12px', color: '#5B616B' }}>({a.parties})</span>
                </div>
                <div style={{ fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>
                  {a.amount}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Urgent Attention / Action Cards */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ margin: 0, fontSize: '16px', fontWeight: 700 }}>
            Urgent attention ({alerts.length})
          </h2>
          <span style={{ fontSize: '13px', color: '#5B616B' }}>Sorted by priority</span>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '12px'
          }}
        >
          {alerts.map((al, idx) => (
            <div
              key={idx}
              style={{
                background: '#FFFFFF',
                border: '1px solid #E3E5E1',
                borderRadius: '10px',
                padding: '14px 16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                boxShadow: '0 1px 2px rgba(0,0,0,0.02)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    padding: '2px 8px',
                    borderRadius: '4px',
                    background: al.tagBg,
                    color: al.tagColor
                  }}
                >
                  {al.tag}
                </span>
                <button
                  onClick={() => onNavigate?.(al.screen)}
                  style={{
                    background: 'transparent',
                    border: '1px solid #DADDD8',
                    borderRadius: '6px',
                    padding: '3px 10px',
                    fontSize: '12px',
                    fontWeight: 600,
                    color: '#0F766E',
                    cursor: 'pointer'
                  }}
                >
                  {al.action}
                </button>
              </div>
              <div style={{ fontSize: '14px', fontWeight: 600, color: '#15181C' }}>
                {al.title}
              </div>
              <div style={{ fontSize: '12px', color: '#5B616B' }}>{al.meta}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom 3-Card Row: High Balance Parties, Cashier Closures, Counter Devices */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '20px'
        }}
      >
        {/* Card 1: Highest balance parties */}
        <section
          style={{
            background: '#FFFFFF',
            border: '1px solid #E3E5E1',
            borderRadius: '12px',
            padding: '18px 20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700 }}>Top overdue parties</h3>
            <button
              onClick={() => onNavigate?.('Parties')}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#0F766E',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              All parties →
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {parties.map((p, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '6px 0',
                  borderBottom: i < parties.length - 1 ? '1px solid #F1F3F0' : 'none',
                  fontSize: '13px'
                }}
              >
                <div>
                  <div style={{ fontWeight: 600 }}>{p.name}</div>
                  <div style={{ fontSize: '11px', color: '#5B616B' }}>{p.city}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>{p.due}</div>
                  <div style={{ fontSize: '11px', color: p.daysColor, fontWeight: 500 }}>
                    {p.days} overdue · {p.limit} limit
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Card 2: Cashier register closures */}
        <section
          style={{
            background: '#FFFFFF',
            border: '1px solid #E3E5E1',
            borderRadius: '12px',
            padding: '18px 20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700 }}>Cashiers & counters</h3>
            <button
              onClick={() => onNavigate?.('CloseDay')}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#0F766E',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Daily close →
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {staff.map((s, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '6px 0',
                  borderBottom: i < staff.length - 1 ? '1px solid #F1F3F0' : 'none',
                  fontSize: '13px'
                }}
              >
                <div>
                  <div style={{ fontWeight: 600 }}>{s.name}</div>
                  <div style={{ fontSize: '11px', color: '#5B616B' }}>{s.role}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontWeight: 500 }}>{s.bills} bills</div>
                  <div style={{ fontSize: '11px', color: s.cashColor, fontWeight: 600 }}>
                    Cash diff: {s.cash}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Card 3: Counter Devices Sync */}
        <section
          style={{
            background: '#FFFFFF',
            border: '1px solid #E3E5E1',
            borderRadius: '12px',
            padding: '18px 20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700 }}>Connected devices</h3>
            <button
              onClick={() => onNavigate?.('Settings')}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#0F766E',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Manage →
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {devices.map((d, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '6px 0',
                  borderBottom: i < devices.length - 1 ? '1px solid #F1F3F0' : 'none',
                  fontSize: '13px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span
                    style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      background: d.ok ? '#0F766E' : '#C2410C'
                    }}
                  ></span>
                  <div>
                    <div style={{ fontWeight: 600 }}>{d.name}</div>
                    <div style={{ fontSize: '11px', color: '#5B616B' }}>{d.who}</div>
                  </div>
                </div>
                <div
                  style={{
                    fontSize: '12px',
                    color: d.ok ? '#5B616B' : '#C2410C',
                    fontWeight: d.ok ? 400 : 600
                  }}
                >
                  {d.state}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
