# Platform admin (UdyamOS team, SaaS level) + role dashboards for client staff
# Platform screens never show a customer's bills, parties or stock without a time-boxed grant from the owner.
import json, os

# ── PlatformSidebar ─────────────────────────────────────────────────────────
PSIDEBAR_GROUPS = [
  ['Overview',    [['Dashboard',       'PlatformHome'],
                   ['Analytics',       'PlatformAnalytics'],
                   ['Funnel & leads',  'PlatformFunnel']]],
  ['Customers',   [['Businesses',      'PlatformTenants'],
                   ['Subscriptions',   'PlatformSubscriptions'],
                   ['Renewals at risk','PlatformRenewals'],
                   ['Partners & CAs',  'PlatformPartners']]],
  ['Revenue',     [['Billing & invoices','PlatformBilling'],
                   ['Plans & pricing', 'PlatformPlans'],
                   ['Payouts & commissions','PlatformPayouts']]],
  ['Support',     [['Support console', 'PlatformSupport'],
                   ['Active grants',   'PlatformGrants'],
                   ['Incidents',       'PlatformIncidents', '1']]],
  ['Operations',  [['Devices & sync',  'PlatformDevices'],
                   ['App releases',    'PlatformReleases'],
                   ['Feature flags',   'PlatformFlags'],
                   ['Backups & DR',    'PlatformBackups'],
                   ['Messaging & push','PlatformMessaging']]],
  ['Masters',     [['GST rates & HSN', 'PlatformGst'],
                   ['Units & conversions','PlatformUnits'],
                   ['Print templates', 'PlatformTemplates'],
                   ['Languages',       'PlatformLanguages'],
                   ['Plan definitions','PlatformPlanDefs']]],
  ['Security',    [['Audit log',       'PlatformAudit'],
                   ['System logs',     'PlatformLogs'],
                   ['Privacy requests','PlatformPrivacy'],
                   ['Integrations',    'PlatformIntegrations']]],
  ['Settings',    [['Team & roles',    'PlatformStaff'],
                   ['Platform settings','PlatformSettings']]],
]

PSIDEBAR = (HEAD % 'PlatformSidebar') + '''<nav aria-label="Platform admin" style="width:100%;min-height:100%;box-sizing:border-box;background:#0F172A;color:#E2E8F0;padding:20px 14px;display:flex;flex-direction:column;gap:2px;font-family:Inter,system-ui,sans-serif;overflow-y:auto">
  <a href="PlatformHome.dc.html" style="display:flex;align-items:center;gap:10px;padding:0 8px 14px;text-decoration:none;color:#FFFFFF">
    <span aria-hidden="true" style="width:32px;height:32px;border-radius:8px;background:#6366F1;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:14px">U</span>
    <span style="display:flex;flex-direction:column"><span style="font-weight:700;font-size:15px">UdyamOS</span><span style="font-size:11px;color:#94A3B8">Platform admin</span></span>
  </a>
  <a href="PlatformTenants.dc.html" style="display:flex;align-items:center;justify-content:space-between;min-height:38px;padding:0 12px;margin-bottom:6px;border-radius:10px;background:#1E293B;color:#94A3B8;text-decoration:none;font-size:13px">
    <span>Search businesses, tickets…</span><span style="font-size:11px;border:1px solid #334155;border-radius:6px;padding:1px 6px">Ctrl K</span>
  </a>
  <sc-for list="{{groups}}" as="g" hint-placeholder-count="8">
    <div style="display:flex;flex-direction:column;gap:1px;padding-top:10px">
      <span style="font-size:10px;font-weight:700;color:#64748B;text-transform:uppercase;letter-spacing:0.07em;padding:0 12px 4px">{{g.title}}</span>
      <sc-for list="{{g.items}}" as="n" hint-placeholder-count="3">
        <a href="{{n.href}}" style="{{n.style}}"><span>{{n.label}}</span><sc-if value="{{n.badge}}" hint-placeholder-val="{{false}}"><span style="{{n.badgeStyle}}">{{n.badge}}</span></sc-if></a>
      </sc-for>
    </div>
  </sc-for>
  <div style="margin-top:16px;padding-top:14px;border-top:1px solid #1E293B">
    <a href="PlatformStaff.dc.html" style="display:flex;align-items:center;gap:10px;padding:10px;border-radius:10px;background:#1E293B;text-decoration:none;color:#FFFFFF">
      <span aria-hidden="true" style="width:34px;height:34px;border-radius:50%;background:#334155;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:13px">B</span>
      <span style="display:flex;flex-direction:column"><span style="font-size:14px;font-weight:600">Bhavesh</span><span style="font-size:11px;color:#94A3B8">Super admin · SSO ✓ Key ✓</span></span>
    </a>
  </div>
</nav>
</x-dc>
<script type="text/x-dc" data-dc-script data-props=\'{"active":{"editor":"text","default":"Dashboard"},"$preview":{"width":248,"height":1900}}\'>
class Component extends DCLogic {
  renderVals() {
    const active = this.props.active ?? 'Dashboard';
    const G = ''' + json.dumps(PSIDEBAR_GROUPS, ensure_ascii=False) + ''';
    const groups = G.map(([title, items]) => ({ title, items: items.map(([label, file, badge]) => ({
      label, href: file + '.dc.html', badge: badge || '',
      badgeStyle: 'background:#EF4444;color:#FFFFFF;font-size:11px;font-weight:700;border-radius:999px;padding:1px 7px',
      style: 'display:flex;align-items:center;justify-content:space-between;min-height:34px;padding:0 12px;border-radius:8px;text-decoration:none;font-size:13px;font-weight:500;' + (label === active ? 'background:#1E293B;color:#FFFFFF' : 'color:#94A3B8')
    })) }));
    return { groups };
  }
}
</script>
</body>
</html>
'''
open(os.path.join(OUT, 'PlatformSidebar.dc.html'), 'w').write(PSIDEBAR); BUILT.append('PlatformSidebar.dc.html')

# ── helpers ──────────────────────────────────────────────────────────────────
def pw(fname, title, data, w=1440, h=1100):
    d2 = dict(data)
    d2.setdefault('psidebar', True)
    d2.setdefault('active', title)
    web(fname, title, d2, w, h)

def B(t, s=''): return {'t': t, 's': s, 'b': True}
def C(t, tone): return {'t': t, 'tone': tone}

# ── Dashboard ────────────────────────────────────────────────────────────────
pw('PlatformHome.dc.html', 'Dashboard', {
  'title': 'Good afternoon, Bhavesh',
  'sub': 'UdyamOS platform · Fri 20 Nov 2026 · SSO session · hardware key verified',
  'actions': ['Export weekly report', '*+ Add pilot business'],
  'kpis': [
    ['Businesses total', '18', '12 pilot · 6 paid'],
    ['Daily active', '14 of 18', '78% · target \u2265 70%', 'ok'],
    ['Bills / shop / day', '23', 'Target \u2265 20', 'ok'],
    ['ARR', '\u20b971,994', '6 \u00d7 Business plan'],
    ['Sync success (1st try)', '99.62%', 'Target \u2265 99.5%', 'ok'],
    ['Open incidents', '1', 'P2 \u00b7 Godown sync', 'warn'],
  ],
  'chips': ['Needs attention', 'All businesses', 'Pilots', 'Renewals due'],
  'search': 'Business, GSTIN, city, owner phone\u2026',
  'table': {
    'cols': '1.6fr 0.9fr 0.7fr 0.9fr 1fr 1.3fr',
    'minW': 980,
    'heads': ['Business', 'Plan', 'Devices', 'Bills today', 'Last sync', 'Health'],
    'rows': [
      [B('Shree Krishna Textiles', 'Bhavnagar \u00b7 Business \u00b7 Jan 2026'), 'Business', '6 / 8', '54', '1 min ago', C('1 device stuck 2 d', 'warn')],
      [B('Navkar Textiles', 'Ahmedabad \u00b7 Business'), 'Business', '4 / 8', '41', '3 min ago', C('Healthy', 'ok')],
      [B('Mahavir Cloth Store', 'Mahuva \u00b7 Pilot day 34'), 'Pilot', '2 / 2', '8', '5 h ago', C('Low use \u00b7 3 bills/day', 'warn')],
      [B('Raghuvir Traders', 'Amreli \u00b7 Pilot day 22'), 'Pilot', '3 / 3', '19', '12 min ago', C('Renewal decision in 9 d', 'info')],
      [B('Jay Ambe Garments', 'Bhavnagar \u00b7 Pilot day 10'), 'Pilot', '1 / 2', '11', '2 min ago', C('Good start', 'ok')],
    ]
  },
  'aside': {
    'title': 'Go / no-go (PRD \u00a70.6)',
    'sub': 'Pilot cohort \u00b7 day 30 check',
    'items': [
      ['Daily use \u2265 70%', '78%', 'ok'],
      ['Bills/shop/day \u2265 20', '23', 'ok'],
      ['Lost transactions', '0', 'ok'],
      ['Paid conversion \u2265 60%', '50% so far', 'warn'],
      ['Referrals \u2265 1 per 3 shops', '4', 'ok'],
      ['P0 bugs open', '0', 'ok'],
    ],
    'foot': 'Open businesses \u2192'
  }
}, h=1200)

# ── Analytics ────────────────────────────────────────────────────────────────
pw('PlatformAnalytics.dc.html', 'Analytics', {
  'title': 'Platform analytics',
  'sub': 'Aggregate metrics only. No customer bills, parties or amounts are shown here.',
  'actions': ['Download CSV', 'Set date range'],
  'chips': ['Last 30 days', 'Last 90 days', 'By plan', 'By city'],
  'kpis': [
    ['Total bills processed', '48,210', '30-day window \u00b7 all businesses'],
    ['Avg bills/shop/day', '23.4', '\u25b2 3.1 vs prev 30 d', 'ok'],
    ['Sync events processed', '2,14,870', '99.62% first-try success', 'ok'],
    ['Offline-to-online conflicts', '3', '0 lost transactions', 'ok'],
    ['App crashes (Android)', '0.4%', 'Target < 1%', 'ok'],
    ['API p95 latency', '184 ms', 'Target < 250 ms', 'ok'],
  ],
  'table': {
    'cols': '1.4fr 0.9fr 1fr 1fr 1fr 1fr',
    'minW': 900,
    'heads': ['Business', 'Plan', 'Bills (30 d)', 'Bills/shop/day', 'Sync ok %', 'App ver'],
    'rows': [
      [B('Shree Krishna Textiles'), 'Business', '1,612', '54', '99.8%', '1.0.4'],
      [B('Navkar Textiles'), 'Business', '1,230', '41', '99.9%', '1.0.4'],
      [B('Mahavir Cloth Store'), 'Pilot', '240', '8', '98.1%', '1.0.3'],
      [B('Raghuvir Traders'), 'Pilot', '570', '19', '99.5%', '1.0.4'],
      [B('Jay Ambe Garments'), 'Pilot', '330', '11', '99.2%', '1.0.4'],
    ]
  },
  'note': 'Metrics are computed from sync event counts, not bill contents. Customer data is never aggregated here.'
})

# ── Funnel & leads ────────────────────────────────────────────────────────────
pw('PlatformFunnel.dc.html', 'Funnel & leads', {
  'title': 'Funnel & leads',
  'sub': 'Referrals, demos, pilots and conversions. Every lead must have a consent note.',
  'actions': ['Export', '*+ New lead'],
  'chips': ['All', 'New (< 7 d)', 'Demo scheduled', 'Pilot active', 'Converted', 'Lost'],
  'kpis': [
    ['Leads this month', '11', '7 referrals \u00b7 4 direct'],
    ['Demos done', '6', '55% \u2192 pilot', 'ok'],
    ['Pilots active', '12', 'Day 1\u201345'],
    ['Paid conversion (all time)', '50%', '6 of 12 completed pilots', 'warn'],
    ['Avg days lead \u2192 pilot', '5.2 d', ''],
    ['Avg days pilot \u2192 paid', '28 d', 'Target \u2264 30 d', 'ok'],
  ],
  'table': {
    'cols': '1.5fr 1fr 0.8fr 1fr 1.2fr',
    'minW': 860,
    'heads': ['Lead / business', 'Source', 'Stage', 'Owner', 'Next action'],
    'rows': [
      [B('Shiv Fabrics', 'Palitana'), 'Referral (Rameshbhai)', 'Pilot day 8', 'Prachi', C('Call day 15 check-in', 'info')],
      [B('Ashok Traders', 'Rajkot'), 'WhatsApp ad', 'Demo scheduled', 'Prachi', C('Demo Mon 10 am', 'info')],
      [B('Hetal Synthetics', 'Surat'), 'Referral (Navkar)', 'New lead', 'Nirav', C('Send intro deck', 'warn')],
      [B('Laxmi Fabrics', 'Vadodara'), 'Direct call', 'Lost', '\u2014', C('No decision \u00b7 revive Q1', 'mute')],
    ]
  },
  'aside': {
    'title': 'This month',
    'sub': 'Nov 2026',
    'items': [
      ['New leads', '11'],
      ['Demos', '6'],
      ['Pilots started', '3'],
      ['Paid conversions', '1'],
      ['Referral bonus paid', '\u20b91,200'],
    ],
    'foot': 'Partners & CAs \u2192'
  }
})

# ── Businesses (tenants) ──────────────────────────────────────────────────────
pw('PlatformTenants.dc.html', 'Businesses', {
  'title': 'Businesses (tenants)',
  'sub': 'Account, plan and health only. Business data needs the owner\u2019s grant.',
  'actions': ['Export', '*+ New pilot'],
  'chips': ['All', 'Pilot', 'Paid', 'Suspended', 'Cancelled (export only)'],
  'search': 'Name, GSTIN, owner phone\u2026',
  'table': {
    'cols': '1.5fr 1.1fr 0.9fr 0.8fr 1fr 1fr',
    'minW': 960,
    'heads': ['Business', 'GSTIN', 'Plan', 'Devices', 'Renews / ends', 'State'],
    'rows': [
      [B('Shree Krishna Textiles', 'Rameshbhai Patel'), '24AAAPK1234L1Z9', 'Business', '6 / 8', '31 Mar 2027', C('Active', 'ok')],
      [B('Navkar Textiles', 'Owner: Mehta'), '24CDEFG2345H1Z1', 'Business', '4 / 8', '31 Mar 2027', C('Active', 'ok')],
      [B('Mahavir Cloth Store', 'Owner: Shah'), '24FGHIJ5678K1Z2', 'Pilot', '2 / 2', '15 Dec 2026', C('Pilot \u00b7 day 34', 'info')],
      [B('Raghuvir Traders', 'Owner: Joshi'), '24RAGHU1122B1Z5', 'Pilot', '3 / 3', '12 Dec 2026', C('Pilot \u00b7 day 22', 'info')],
      [B('Jay Ambe Garments', 'Owner: Desai'), '24JAYAM1111A1Z7', 'Starter', '1 / 2', 'Ended 1 Nov', C('Cancelled \u00b7 export until 1 Nov 2027', 'mute')],
    ]
  },
  'note': 'Cancelled businesses keep read-only login and full export for 12 months (UOS-131). Suspending a business never deletes data.'
})

# ── Business detail ───────────────────────────────────────────────────────────
pw('PlatformTenant.dc.html', 'Businesses', {
  'back': 'PlatformTenants.dc.html', 'backT': 'Businesses',
  'title': 'Shree Krishna Textiles',
  'sub': 'Bhavnagar \u00b7 GSTIN 24AAAPK1234L1Z9 \u00b7 owner Rameshbhai Patel \u00b7 pilot Jan 2026, paid Apr 2026',
  'actions': ['Change plan', 'Suspend\u2026', '*Request support access'],
  'kpis': [
    ['Plan', 'Business', '6 of 8 devices'],
    ['Bills last 30 days', '1,612', '\u2248 54 / day', 'ok'],
    ['Sync health', '1 device stuck', 'Godown phone D04 \u00b7 14 events', 'warn'],
    ['Last backup restore test', '1 Nov', 'Passed', 'ok'],
    ['Support grants', '0 active', '1 in last 90 d'],
    ['Subscription', '\u20b911,999 / yr', 'Renews 31 Mar 2027'],
  ],
  'table': {
    'cols': '1.2fr 1fr 0.8fr 1fr 1fr',
    'minW': 820,
    'heads': ['Device', 'User', 'App version', 'Pending events', 'Last seen'],
    'rows': [
      ['Counter 1 \u00b7 D01', 'Kiran, Mehul', '1.0.4', '0', '1 min ago'],
      ['Counter 2 \u00b7 D02', 'Kiran, Mehul', '1.0.4', '0', '2 min ago'],
      ['Godown phone \u00b7 D04', 'Anil', '1.0.3', C('14', 'warn'), C('Tue 6:40 pm', 'warn')],
      ['Manager tablet \u00b7 D05', 'Divya', '1.0.4', '0', '6 min ago'],
    ]
  },
  'aside': {
    'title': 'What we can see',
    'sub': 'Without owner grant',
    'items': [
      ['Account, plan, our invoices', 'Yes', 'ok'],
      ['Device health, sync counts', 'Yes', 'ok'],
      ['Bills, parties, stock', 'No', 'bad'],
      ['Support grant', 'None active'],
    ],
    'foot': 'Request support access \u2192'
  }
})

# ── Subscriptions ─────────────────────────────────────────────────────────────
pw('PlatformSubscriptions.dc.html', 'Subscriptions', {
  'title': 'Subscriptions',
  'sub': 'Our plan subscriptions per business. Billing runs on our server; phones keep working through the grace period.',
  'actions': ['Export', 'Send renewal reminders'],
  'chips': ['All', 'Active', 'Pilot', 'Grace period', 'Cancelled'],
  'kpis': [
    ['ARR', '\u20b971,994', '6 paid plans'],
    ['MRR', '\u20b95,999', ''],
    ['Pilots \u2192 paid (all time)', '50%', '6 of 12', 'warn'],
    ['Avg pilot duration', '28 d', 'Target \u2264 30 d', 'ok'],
    ['Renewals next 30 d', '2', '\u20b923,998'],
    ['Failed payments', '0', '', 'ok'],
  ],
  'table': {
    'cols': '1.5fr 0.9fr 1fr 1fr 1fr 1fr',
    'minW': 920,
    'heads': ['Business', 'Plan', 'Price / yr', 'Started', 'Renews', 'State'],
    'rows': [
      [B('Shree Krishna Textiles'), 'Business', '\u20b911,999', '1 Apr 2026', '31 Mar 2027', C('Active', 'ok')],
      [B('Navkar Textiles'), 'Business', '\u20b911,999', '1 Jun 2026', '31 Mar 2027', C('Active', 'ok')],
      [B('Mahavir Cloth Store'), 'Pilot', '\u20b92,000 / 3 m', '17 Oct 2026', '15 Dec 2026', C('Pilot \u00b7 25 d left', 'info')],
      [B('Raghuvir Traders'), 'Pilot', '\u20b92,000 / 3 m', '29 Oct 2026', '28 Jan 2027', C('Pilot \u00b7 69 d left', 'info')],
      [B('Jay Ambe Garments'), 'Starter', '\u20b94,999', '1 May 2026', '\u2014', C('Cancelled 1 Nov', 'mute')],
    ]
  },
  'note': 'Pilot fee (\u20b92,000) is fully refundable within 30 days. Grace period is 7 days after expiry; app keeps working.'
})

# ── Renewals at risk ──────────────────────────────────────────────────────────
pw('PlatformRenewals.dc.html', 'Renewals at risk', {
  'title': 'Renewals at risk',
  'sub': 'Pilots ending in \u2264 45 days or low-usage paid plans. Act before the deadline.',
  'actions': ['Send WhatsApp reminders', '*Schedule calls'],
  'chips': ['Pilots (45 d window)', 'Paid (low use)', 'All renewals'],
  'kpis': [
    ['Pilots ending \u2264 45 d', '3', 'Need go/no-go decision'],
    ['Paid renewals \u2264 30 d', '2', '\u20b923,998', 'warn'],
    ['Low-use pilots (< 10 bills/d)', '1', 'Mahavir Cloth Store', 'warn'],
    ['Conversion target', '60%', '50% so far \u00b7 1 short', 'warn'],
  ],
  'table': {
    'cols': '1.5fr 0.8fr 1fr 1fr 1fr 1.2fr',
    'minW': 900,
    'heads': ['Business', 'Plan', 'Bills/day (30 d)', 'Renews / ends', 'Days left', 'Action needed'],
    'rows': [
      [B('Mahavir Cloth Store', 'Pilot day 34'), 'Pilot', C('8', 'warn'), '15 Dec 2026', '25 d', C('Low use \u00b7 call owner', 'warn')],
      [B('Raghuvir Traders', 'Pilot day 22'), 'Pilot', '19', '28 Jan 2027', '69 d', C('On track \u00b7 check day 30', 'info')],
      [B('Shiv Fabrics', 'Pilot day 8'), 'Pilot', '14', '20 Dec 2026', '30 d', C('Early \u00b7 call day 15', 'info')],
      [B('Navkar Textiles', 'Paid'), 'Business', '41', '31 Mar 2027', '131 d', C('Healthy', 'ok')],
    ]
  },
  'aside': {
    'title': 'Go / no-go checklist',
    'sub': 'Per pilot (\u00a70.6)',
    'items': [
      ['Daily use \u2265 70%', '78% avg'],
      ['Bills/shop/day \u2265 20', '23 avg', 'ok'],
      ['Paid conversion target', '60%', 'warn'],
      ['Referrals', '4 total', 'ok'],
    ],
    'foot': 'Full analytics \u2192'
  }
})

# ── Partners & CAs ────────────────────────────────────────────────────────────
pw('PlatformPartners.dc.html', 'Partners & CAs', {
  'title': 'Partners & CAs',
  'sub': 'CA referral partners get 18% of year-1 subscription for every business they bring. Payouts every quarter.',
  'actions': ['Add partner', '*Generate referral links'],
  'kpis': [
    ['CA partners', '4', '3 active referrers'],
    ['Referrals this year', '8', '6 converted to pilot'],
    ['Partner revenue share', '18%', 'Year 1 only'],
    ['Payouts due this quarter', '\u20b94,320', '2 CAs'],
    ['Avg businesses per CA', '2.1', ''],
    ['Top CA referrals', '3', 'Hitesh Shah (CA)'],
  ],
  'table': {
    'cols': '1.4fr 1fr 0.8fr 1fr 1fr 1fr',
    'minW': 880,
    'heads': ['Partner / CA', 'Type', 'Businesses referred', 'Converted', 'Commission due', 'Last payout'],
    'rows': [
      [B('Hitesh Shah', 'Bhavnagar CA'), 'CA', '3', '3', '\u20b92,160', '1 Oct 2026'],
      [B('Paresh Mehta', 'Ahmedabad CA'), 'CA', '2', '1', '\u20b9720', '1 Oct 2026'],
      [B('Ramila Patel', 'Reseller'), 'Reseller', '2', '1', '\u20b91,440', '\u2014'],
      [B('Suresh Vora', 'Surat CA'), 'CA', '1', '1', '\u2014', '1 Jul 2026'],
    ]
  },
  'note': '18% referral commission applies to year-1 subscription only. CAs never see the business owner\u2019s data.'
})

# ── Billing & invoices ────────────────────────────────────────────────────────
pw('PlatformBilling.dc.html', 'Billing & invoices', {
  'title': 'Billing & invoices',
  'sub': 'Our invoices to customers (GST on our fee). These are UdyamOS\u2019s own revenue documents.',
  'actions': ['Export GSTR-1', 'Send invoices', '*Record payment'],
  'chips': ['All', 'Paid', 'Unpaid', 'Draft'],
  'kpis': [
    ['ARR', '\u20b971,994', '6 paid plans'],
    ['Collected this month', '\u20b911,999', '1 renewal'],
    ['Pending collections', '\u20b923,998', '2 renewals in 30 d', 'warn'],
    ['GST payable (Nov)', '\u20b92,160', '18% on SaaS fee'],
    ['Failed payments', '0', '', 'ok'],
    ['CA payouts due', '\u20b94,320', '2 CAs \u00b7 Q3'],
  ],
  'table': {
    'cols': '1fr 1.5fr 0.9fr 1fr 1fr 0.9fr',
    'minW': 900,
    'heads': ['Invoice no.', 'Business', 'Amount', 'GST', 'Date', 'Status'],
    'rows': [
      ['UOS-INV-0024', B('Navkar Textiles'), '\u20b911,999', '\u20b92,160', '1 Nov 2026', C('Paid', 'ok')],
      ['UOS-INV-0023', B('Shree Krishna Textiles'), '\u20b911,999', '\u20b92,160', '1 Apr 2026', C('Paid', 'ok')],
      ['UOS-INV-0022', B('Mahavir Cloth Store'), '\u20b92,000', '\u20b9360', '17 Oct 2026', C('Pilot \u00b7 pending upgrade', 'info')],
      ['UOS-INV-0021', B('Jay Ambe Garments'), '\u20b94,999', '\u20b9900', '1 May 2026', C('Cancelled \u00b7 refund Nil', 'mute')],
    ]
  }
})

# ── Plans & pricing ───────────────────────────────────────────────────────────
pw('PlatformPlans.dc.html', 'Plans & pricing', {
  'title': 'Plans & pricing',
  'sub': 'Plan definitions and feature limits. Prices are hypotheses until validated (PRD \u00a70.5).',
  'actions': ['Edit plan', '*+ New plan variant'],
  'kpis': [
    ['Active plans', '4', 'Starter, Business, Pro, Pilot'],
    ['Businesses on Business plan', '6', '\u20b971,994 ARR'],
    ['Avg revenue per user', '\u20b911,999', 'Business plan'],
    ['Planned Pro upsell', 'Q2 2027', '15+ devices'],
  ],
  'table': {
    'cols': '1fr 1fr 1.8fr 0.8fr 1fr',
    'minW': 860,
    'heads': ['Plan', 'Price / year', 'Includes', 'Businesses', 'Notes'],
    'rows': [
      [B('Starter'), '\u20b94,999', '1 owner + 2 devices \u00b7 billing, stock, dues \u00b7 full export', '0', 'No lots/challans'],
      [B('Business'), '\u20b911,999', '8 devices \u00b7 lots, challans, sync, Tally export \u00b7 all features', '6', 'Most popular'],
      [B('Pro'), '\u20b924,999', '15+ devices \u00b7 onboarding visit, data import, priority support', '0', 'Q2 2027'],
      [B('Pilot'), '\u20b92,000 / 3 months', 'Full Business features \u00b7 refundable within 30 days', '12', 'Converts to Business'],
    ]
  },
  'note': 'Plan limits are enforced server-side. Phones keep working through the 7-day grace period after expiry.'
})

# ── Payouts & commissions ─────────────────────────────────────────────────────
pw('PlatformPayouts.dc.html', 'Payouts & commissions', {
  'title': 'Payouts & commissions',
  'sub': 'CA and reseller commission payouts. 18% of year-1 subscription, paid quarterly.',
  'actions': ['Export', '*Mark as paid'],
  'kpis': [
    ['Payouts due this quarter', '\u20b94,320', '2 CAs'],
    ['Paid this year', '\u20b98,640', '6 payouts'],
    ['Pending approval', '\u20b94,320', '', 'warn'],
    ['Partners with active commissions', '3', ''],
  ],
  'table': {
    'cols': '1.4fr 1fr 1fr 0.8fr 1fr 1fr',
    'minW': 860,
    'heads': ['Partner', 'Business referred', 'Commission', 'Quarter', 'Status', 'Paid on'],
    'rows': [
      [B('Hitesh Shah (CA)'), 'Shree Krishna Textiles', '\u20b92,160', 'Q3 2026', C('Due', 'warn'), '\u2014'],
      [B('Hitesh Shah (CA)'), 'Navkar Textiles', '\u2014', 'Q4 2026', C('Not yet', 'mute'), '\u2014'],
      [B('Paresh Mehta (CA)'), 'Mahavir Cloth Store', '\u20b9720', 'Q3 2026', C('Due', 'warn'), '\u2014'],
      [B('Ramila Patel (Reseller)'), 'Raghuvir Traders', '\u20b91,440', 'Q3 2026', C('Paid', 'ok'), '1 Oct 2026'],
    ]
  }
})

# ── Support console ───────────────────────────────────────────────────────────
pw('PlatformSupport.dc.html', 'Support console', {
  'title': 'Support console',
  'sub': 'Tickets and access grants. We open a business only while the owner\u2019s grant is active. Every view is logged and shown to the owner.',
  'actions': ['*New ticket'],
  'chips': ['Open', 'My tickets', 'Waiting owner', 'Resolved (7 d)'],
  'kpis': [
    ['Open tickets', '5', '2 printer \u00b7 2 sync \u00b7 1 GST'],
    ['First reply SLA', '38 min', 'Target < 2 h', 'ok'],
    ['Active grants', '1', 'Ends in 21 h'],
    ['Grant requests waiting', '1', 'Owner hasn\u2019t responded', 'warn'],
    ['Resolved (7 d)', '12', 'Avg resolution 4.2 h', 'ok'],
    ['CSAT (7 d)', '4.6 / 5', '', 'ok'],
  ],
  'table': {
    'cols': '0.7fr 1.4fr 1.6fr 1fr 1fr 0.8fr',
    'minW': 960,
    'heads': ['Ticket', 'Business', 'Problem', 'Grant', 'Agent', 'SLA'],
    'rows': [
      [B('T-0231'), B('Shree Krishna Textiles', 'Godown phone'), '14 events stuck since Tuesday', C('Requested', 'warn'), 'Nirav', C('4 h left', 'warn')],
      [B('T-0229'), B('Navkar Textiles'), 'Gujarati prints as boxes on RPP02N', C('Not needed', 'mute'), 'Hetal', C('1 d left', 'ok')],
      [B('T-0227'), B('Mahavir Cloth Store'), 'How to bill from 2 challans', C('Active \u00b7 21 h left', 'info'), 'Nirav', C('Resolved', 'ok')],
      [B('T-0225'), B('Jay Ambe Garments'), 'Export data before cancel', C('Not needed', 'mute'), 'Hetal', C('Resolved', 'ok')],
    ]
  },
  'aside': {
    'title': 'Access rules',
    'items': [
      ['Default access to business data', 'None', 'ok'],
      ['Grant length', 'Owner chooses \u00b7 max 72 h'],
      ['Who can view', 'Support role only'],
      ['Edits by support', 'Never \u00b7 view only'],
      ['Log shown to owner', 'Every view'],
    ]
  }
})

# ── Active grants ─────────────────────────────────────────────────────────────
pw('PlatformGrants.dc.html', 'Active grants', {
  'title': 'Support access grants',
  'sub': 'Time-boxed grants from owners. Every screen opened under a grant is logged and visible to the owner.',
  'actions': ['View audit trail'],
  'kpis': [
    ['Active now', '1', 'Mahavir Cloth Store \u00b7 21 h left'],
    ['Requested / awaiting', '1', 'Shree Krishna Textiles', 'warn'],
    ['Grants in last 90 d', '4', ''],
    ['Avg grant duration used', '1.8 h', 'of max 72 h'],
  ],
  'table': {
    'cols': '1.4fr 1fr 1fr 0.9fr 1.2fr 1fr',
    'minW': 900,
    'heads': ['Business', 'Ticket', 'Granted by', 'Granted at', 'Expires', 'Status'],
    'rows': [
      [B('Mahavir Cloth Store'), 'T-0227', 'Shah (owner)', '20 Nov 10:00', '21 Nov 10:00', C('Active \u00b7 21 h left', 'info')],
      [B('Shree Krishna Textiles'), 'T-0231', 'Rameshbhai', '\u2014', '\u2014', C('Requested \u00b7 no response', 'warn')],
      [B('Navkar Textiles'), 'T-0218', 'Mehta (owner)', '10 Nov 14:00', '10 Nov 20:00', C('Expired', 'mute')],
    ]
  },
  'note': 'Grant log is immutable. Owner can revoke at any time. Revoked grants close the support session immediately.'
})

# ── Incidents ─────────────────────────────────────────────────────────────────
pw('PlatformIncidents.dc.html', 'Incidents', {
  'title': 'Incidents',
  'sub': 'P0\u2013P2 production incidents. Postmortems required for P0 and P1 within 72 h.',
  'actions': ['*New incident', 'Export'],
  'chips': ['Open', 'Resolved (30 d)', 'By severity'],
  'kpis': [
    ['Open incidents', '1', 'P2 \u00b7 Godown phone sync', 'warn'],
    ['P0/P1 this quarter', '0', '', 'ok'],
    ['Avg MTTR (30 d)', '42 min', 'Target < 2 h', 'ok'],
    ['Postmortems pending', '0', '', 'ok'],
  ],
  'table': {
    'cols': '0.6fr 0.7fr 1.4fr 1fr 1fr 1fr',
    'minW': 880,
    'heads': ['ID', 'Severity', 'Title', 'Opened', 'Owner', 'Status'],
    'rows': [
      ['INC-041', C('P2', 'warn'), 'Godown phone D04 stuck 14 events \u00b7 Shree Krishna', '18 Nov 06:40', 'Nirav', C('Open \u00b7 investigating', 'warn')],
      ['INC-040', C('P3', 'mute'), 'RPP02N Gujarati font issue \u00b7 Navkar', '15 Nov 11:20', 'Hetal', C('Resolved \u00b7 fix in 1.0.4', 'ok')],
      ['INC-039', C('P2', 'warn'), 'Sync queue backed up 200+ events \u00b7 3 businesses', '5 Nov 03:10', 'Bhavesh', C('Resolved \u00b7 postmortem done', 'ok')],
    ]
  }
})

# ── Devices & sync ────────────────────────────────────────────────────────────
pw('PlatformDevices.dc.html', 'Devices & sync', {
  'title': 'Devices & sync (all businesses)',
  'sub': 'Aggregate device health. Business data is not shown. Owners manage their own devices from the client app.',
  'actions': ['Export device list', 'Force sync nudge'],
  'chips': ['All', 'Stuck > 1 h', 'Offline > 1 d', 'Old app version'],
  'kpis': [
    ['Total devices', '28', 'across 18 businesses'],
    ['Synced < 10 min', '24', '86%', 'ok'],
    ['Stuck > 1 h', '1', 'D04 \u00b7 Shree Krishna', 'warn'],
    ['Offline > 1 day', '1', '14 events pending', 'warn'],
    ['Old app (< 1.0.4)', '2', '2 businesses', 'warn'],
    ['Sync success (1st try)', '99.62%', 'Target \u2265 99.5%', 'ok'],
  ],
  'table': {
    'cols': '1.2fr 1.4fr 0.8fr 0.9fr 1fr 1.2fr',
    'minW': 940,
    'heads': ['Device', 'Business', 'App ver', 'Pending events', 'Last seen', 'Health'],
    'rows': [
      ['Godown phone \u00b7 D04', B('Shree Krishna Textiles'), C('1.0.3', 'warn'), C('14', 'warn'), C('Tue 6:40 pm', 'warn'), C('Stuck 2 days', 'warn')],
      ['Counter 1 \u00b7 D01', B('Shree Krishna Textiles'), '1.0.4', '0', '1 min ago', C('OK', 'ok')],
      ['Counter 2 \u00b7 D02', B('Shree Krishna Textiles'), '1.0.4', '0', '2 min ago', C('OK', 'ok')],
      ['Phone A \u00b7 D11', B('Navkar Textiles'), '1.0.4', '0', '3 min ago', C('OK', 'ok')],
      ['Tablet \u00b7 D21', B('Mahavir Cloth Store'), C('1.0.3', 'warn'), '0', '5 h ago', C('Old version', 'warn')],
    ]
  },
  'note': 'Device names and counts are plan metadata. We never see what was billed on a device.'
})

# ── App releases ──────────────────────────────────────────────────────────────
pw('PlatformReleases.dc.html', 'App releases', {
  'title': 'App releases',
  'sub': 'Android APK / Play Store releases. Release gate: 0 duplicate-after-sync bugs and < 1% crash rate before full rollout.',
  'actions': ['Upload APK', '*Promote to stable'],
  'chips': ['All', 'Stable', 'Beta', 'Rollout', 'Archived'],
  'kpis': [
    ['Current stable', '1.0.4', 'Released 10 Nov'],
    ['Beta / staged', '1.0.5-beta', '3 test devices'],
    ['Crash rate (stable)', '0.4%', 'Target < 1%', 'ok'],
    ['Duplicate-after-sync bugs', '0', 'Release gate: 0', 'ok'],
    ['Businesses on latest', '16 / 18', '', 'ok'],
    ['Force-update threshold', '1.0.2', '0 devices below'],
  ],
  'table': {
    'cols': '0.8fr 0.8fr 1.2fr 0.8fr 1fr 1fr',
    'minW': 860,
    'heads': ['Version', 'Track', 'What\'s new', 'Released', 'Crash rate', 'Status'],
    'rows': [
      ['1.0.5-beta', 'Beta', 'Gujarati font fix v2 \u00b7 offline challan speed', '\u2014', '0.1%', C('Staged \u00b7 3 devices', 'info')],
      ['1.0.4', 'Stable', 'RPP02N Gujarati font \u00b7 sync retry backoff', '10 Nov', '0.4%', C('Current stable', 'ok')],
      ['1.0.3', 'Stable', 'Lots + challans \u00b7 offline approve', '22 Oct', '0.6%', C('Superseded', 'mute')],
      ['1.0.2', 'Stable', 'Payments, credit notes, collections', '5 Oct', '0.8%', C('Force-upgrade from here', 'warn')],
    ]
  },
  'note': 'Release gate: zero duplicate-after-sync events in 48-h soak on 3 test devices before promoting to stable.'
})

# ── Feature flags ─────────────────────────────────────────────────────────────
pw('PlatformFlags.dc.html', 'Feature flags', {
  'title': 'Feature flags',
  'sub': 'Server-side feature toggles. Flags apply per business, per plan, or globally. Changes take effect on next app sync.',
  'actions': ['*New flag', 'Export'],
  'chips': ['All', 'Enabled', 'Disabled', 'Per-business', 'By plan'],
  'kpis': [
    ['Total flags', '14', ''],
    ['Globally enabled', '8', ''],
    ['Per-business overrides', '3', ''],
    ['Flags tied to plan', '4', ''],
  ],
  'table': {
    'cols': '1.4fr 1fr 1fr 1.2fr 1fr',
    'minW': 860,
    'heads': ['Flag key', 'Default', 'Overrides', 'Affects', 'Description'],
    'rows': [
      ['challan_flow', C('ON', 'ok'), '0', 'Business + Pilot', 'Delivery challans module'],
      ['lots_tracking', C('ON', 'ok'), '0', 'Business + Pilot', 'Lot-based stock tracking'],
      ['tally_export', C('ON', 'ok'), '0', 'Business', 'Tally XML export button'],
      ['broker_commission', C('OFF', 'mute'), '0', 'All', 'PRD \u00a7Later \u00b7 not in MVP'],
      ['upi_matching', C('OFF', 'mute'), '0', 'All', 'PRD \u00a7Later \u00b7 not in MVP'],
      ['whatsapp_send', C('ON', 'ok'), '2', '2 businesses (beta)', 'WhatsApp bill sharing'],
      ['offline_approve', C('ON', 'ok'), '0', 'Business + Pilot', 'Manager offline approval cap'],
    ]
  },
  'note': 'Flags are read by the app on each sync. A flag change reaches all devices within 1 sync cycle (usually < 10 min).'
})

# ── Backups & DR ──────────────────────────────────────────────────────────────
pw('PlatformBackups.dc.html', 'Backups & DR', {
  'title': 'Backups & disaster recovery',
  'sub': 'Per-business encrypted backups. RPO \u2264 1 h, RTO \u2264 4 h. Restore tests run monthly.',
  'actions': ['Trigger restore test', 'Download backup manifest'],
  'kpis': [
    ['Businesses with backups', '18 / 18', '', 'ok'],
    ['Last backup (most recent)', '20 min ago', 'All businesses', 'ok'],
    ['RPO target', '\u2264 1 h', 'Met', 'ok'],
    ['RTO target', '\u2264 4 h', 'Met', 'ok'],
    ['Restore tests this month', '3', 'All passed', 'ok'],
    ['Storage used', '14.2 GB', '12-month retention'],
  ],
  'table': {
    'cols': '1.5fr 0.9fr 1fr 1fr 1fr',
    'minW': 820,
    'heads': ['Business', 'Backup size', 'Last backup', 'Last restore test', 'Result'],
    'rows': [
      [B('Shree Krishna Textiles'), '3.1 GB', '18 min ago', '1 Nov 2026', C('Passed', 'ok')],
      [B('Navkar Textiles'), '2.4 GB', '20 min ago', '1 Nov 2026', C('Passed', 'ok')],
      [B('Mahavir Cloth Store'), '0.8 GB', '5 h ago', '1 Nov 2026', C('Passed', 'ok')],
      [B('Raghuvir Traders'), '1.2 GB', '14 min ago', '1 Nov 2026', C('Passed', 'ok')],
    ]
  },
  'note': 'Backups are AES-256 encrypted. Keys are held separately from data. Owner can request a full export at any time (UOS-131).'
})

# ── Messaging & push ──────────────────────────────────────────────────────────
pw('PlatformMessaging.dc.html', 'Messaging & push', {
  'title': 'Messaging & push notifications',
  'sub': 'Platform-level messages to owners and staff. Not the customer\u2019s WhatsApp bills.',
  'actions': ['Send announcement', '*New push campaign'],
  'chips': ['All', 'Push', 'WhatsApp', 'SMS', 'Email', 'Scheduled'],
  'kpis': [
    ['Sent last 30 d', '342', ''],
    ['Push delivery rate', '94%', 'Target \u2265 90%', 'ok'],
    ['WhatsApp delivery', '98%', '', 'ok'],
    ['Opt-outs this month', '0', '', 'ok'],
    ['Scheduled messages', '3', 'Next: renewal reminder'],
  ],
  'table': {
    'cols': '0.9fr 1fr 1.2fr 0.8fr 0.8fr 1fr',
    'minW': 880,
    'heads': ['Type', 'Audience', 'Message', 'Sent', 'Delivered', 'Status'],
    'rows': [
      ['Push', 'All owners', 'v1.0.4 is available. Update now for Gujarati font fix.', '10 Nov', '17 / 18', C('Done', 'ok')],
      ['WhatsApp', 'Pilot owners', 'Your pilot ends in 15 days. Book a call to continue.', '5 Nov', '12 / 12', C('Done', 'ok')],
      ['Push', 'Stuck devices', 'Your Godown phone has 14 unsynced events. Connect to Wi-Fi.', '18 Nov', '1 / 1', C('Sent', 'info')],
      ['Email', 'All owners', 'Monthly platform update \u00b7 Nov 2026', '1 Nov', '18 / 18', C('Done', 'ok')],
    ]
  }
})

# ── Masters: GST rates & HSN ──────────────────────────────────────────────────
pw('PlatformGst.dc.html', 'GST rates & HSN', {
  'title': 'GST rates & HSN codes',
  'sub': 'Master GST rate table used by all businesses. Changes take effect on next app sync. Last updated: 1 Oct 2026.',
  'actions': ['Export', '*Import from GSTN notification', 'Edit rate'],
  'chips': ['All', '0%', '5%', '12%', '18%', '28%', 'Textiles'],
  'kpis': [
    ['Total HSN entries', '1,842', 'Textile-specific: 312'],
    ['Last GST council update', '1 Oct 2026', 'No rate changes'],
    ['Rates in use by businesses', '6 unique rates', ''],
    ['Custom overrides by business', '0', 'Platform rate is source of truth'],
  ],
  'table': {
    'cols': '0.8fr 1.5fr 0.6fr 0.8fr 1fr',
    'minW': 820,
    'heads': ['HSN code', 'Description', 'GST %', 'IGST %', 'Common in'],
    'rows': [
      ['5007', 'Woven fabrics of silk or silk waste', '5%', '5%', 'Textiles'],
      ['5208', 'Woven fabrics of cotton \u2264 85%', '5%', '5%', 'Textiles'],
      ['5407', 'Woven fabrics of synthetic filament', '12%', '12%', 'Synthetic fabrics'],
      ['6301', 'Blankets and travelling rugs', '12%', '12%', 'Home textiles'],
      ['6302', 'Bed linen, table linen, etc.', '12%', '12%', 'Home textiles'],
      ['6309', 'Worn clothing and other worn articles', '0%', '0%', 'Old stock'],
    ]
  },
  'note': 'HSN codes pre-loaded at business setup. Owners can override descriptions but not rates (GST compliance).'
})

# ── Masters: Units ────────────────────────────────────────────────────────────
pw('PlatformUnits.dc.html', 'Units & conversions', {
  'title': 'Units & conversions',
  'sub': 'Master unit list and conversion rules used across all businesses. Textile-focused.',
  'actions': ['Export', '*Add unit'],
  'kpis': [
    ['Total units', '24', ''],
    ['Textile units', '12', 'Metres, kg, roll, lot, pcs\u2026'],
    ['Active in businesses', '8', 'Most common: metres, pcs, kg'],
    ['Pending unit requests', '1', 'Mahavir: \u201cthaan\u201d request', 'info'],
  ],
  'table': {
    'cols': '0.8fr 1fr 1fr 1.5fr',
    'minW': 760,
    'heads': ['Code', 'Name', 'Base unit', 'Conversions'],
    'rows': [
      ['MTR', 'Metres', 'Metres', '1 roll = 50 m \u00b7 1 bolt = 100 m'],
      ['KG', 'Kilograms', 'Kilograms', '1 bag = 50 kg'],
      ['PCS', 'Pieces', 'Pieces', '\u2014'],
      ['ROLL', 'Roll', 'Metres', '1 roll = 50 m (default; editable per item)'],
      ['THAAN', 'Thaan', 'Metres', '1 thaan = 9 m (Gujarati textile)'],
      ['LOT', 'Lot', 'Custom', 'Lot = set of rolls (defined per item)'],
    ]
  }
})

# ── Masters: Print templates ──────────────────────────────────────────────────
pw('PlatformTemplates.dc.html', 'Print templates', {
  'title': 'Print templates',
  'sub': 'Default bill, challan and receipt templates for all businesses. Businesses can customise their header.',
  'actions': ['Preview', 'Export', '*Upload template'],
  'chips': ['All', 'Bill', 'Challan', 'Receipt', 'Credit note', 'Quotation'],
  'kpis': [
    ['Total templates', '8', ''],
    ['Printer models tested', '6', 'RPP02N, POS80, BT80, thermal 58mm\u2026'],
    ['Custom headers by business', '4', ''],
    ['Last updated', '10 Nov 2026', '1.0.4 \u00b7 Gujarati font fix'],
  ],
  'table': {
    'cols': '1.2fr 0.9fr 1.2fr 0.9fr 1fr',
    'minW': 820,
    'heads': ['Template', 'Type', 'Supported printers', 'Gujarati', 'Status'],
    'rows': [
      [B('Tax invoice (A5)'), 'Bill', 'RPP02N \u00b7 BT80 \u00b7 PDF', C('Yes \u00b7 v1.0.4', 'ok'), C('Active', 'ok')],
      [B('Delivery challan'), 'Challan', 'RPP02N \u00b7 thermal 80mm', C('Yes', 'ok'), C('Active', 'ok')],
      [B('Receipt (58mm)'), 'Receipt', '58mm thermal', C('Partial', 'warn'), C('Active', 'ok')],
      [B('Credit note (A5)'), 'Credit note', 'RPP02N \u00b7 PDF', C('Yes', 'ok'), C('Active', 'ok')],
      [B('Quotation (A4)'), 'Quotation', 'PDF only', C('Yes', 'ok'), C('Active', 'ok')],
    ]
  }
})

# ── Masters: Languages ────────────────────────────────────────────────────────
pw('PlatformLanguages.dc.html', 'Languages', {
  'title': 'Languages & localisation',
  'sub': 'UI languages and string bundles. Gujarati and English are supported; Hindi is planned.',
  'actions': ['Export strings', '*Add language'],
  'kpis': [
    ['Supported languages', '2', 'English \u00b7 Gujarati'],
    ['Gujarati coverage', '98%', '12 strings missing', 'ok'],
    ['Businesses using Gujarati', '14', '78%'],
    ['Hindi planned', 'Q2 2027', ''],
  ],
  'table': {
    'cols': '1fr 0.8fr 1fr 0.8fr 1fr',
    'minW': 760,
    'heads': ['Language', 'Code', 'Coverage', 'Default for new biz', 'Status'],
    'rows': [
      ['English', 'en', '100%', 'No (opt-in)', C('Active', 'ok')],
      ['Gujarati (\u0a97\u0ac1\u0a9c)', 'gu', '98%', 'Yes (Bhavnagar / Surat area)', C('Active', 'ok')],
      ['Hindi (\u0939\u093f\u0928\u094d\u0926\u0940)', 'hi', '0%', 'No', C('Planned Q2 2027', 'mute')],
    ]
  },
  'note': 'Language is set per user, not per business. Owner can switch at any time. Print templates are always bilingual (Gujarati + English).'
})

# ── Masters: Plan definitions ─────────────────────────────────────────────────
pw('PlatformPlanDefs.dc.html', 'Plan definitions', {
  'title': 'Plan definitions (master)',
  'sub': 'Canonical plan config read by the server to enforce limits. Changes here affect all businesses immediately.',
  'actions': ['Export', 'Edit plan'],
  'kpis': [
    ['Plans defined', '4', 'Starter \u00b7 Business \u00b7 Pro \u00b7 Pilot'],
    ['Feature flags tied to plan', '4', ''],
    ['Last changed', '1 Apr 2026', 'Pro added'],
  ],
  'table': {
    'cols': '1fr 0.8fr 0.8fr 1fr 1.8fr',
    'minW': 860,
    'heads': ['Plan', 'Price / yr', 'Max devices', 'Key features', 'Notes'],
    'rows': [
      ['Starter', '\u20b94,999', '2', 'Billing, stock, dues, full export', 'No lots/challans; for single-counter shops'],
      ['Business', '\u20b911,999', '8', '+ Lots, challans, Tally export, multi-godown', 'Most popular; referral target'],
      ['Pro', '\u20b924,999', 'Unlimited', '+ Onboarding visit, data import, priority SLA', 'Q2 2027; large textile houses'],
      ['Pilot', '\u20b92,000 / 3 m', '8', 'Full Business features; refundable \u2264 30 d', 'Converts to Business; counts in ARR when paid'],
    ]
  }
})

# ── Audit log ─────────────────────────────────────────────────────────────────
pw('PlatformAudit.dc.html', 'Audit log', {
  'title': 'Platform audit log',
  'sub': 'Every action by UdyamOS staff on the platform, including support grant views. Immutable. Retained 7 years.',
  'actions': ['Export', 'Filter by staff', 'Filter by business'],
  'chips': ['All', 'Support grants', 'Plan changes', 'Staff actions', 'Security events'],
  'kpis': [
    ['Log entries (30 d)', '1,842', ''],
    ['Support grant views', '14', '4 businesses'],
    ['Plan changes', '2', '1 upgrade \u00b7 1 cancel'],
    ['Security events', '0', '', 'ok'],
    ['Retention', '7 years', 'Immutable'],
  ],
  'table': {
    'cols': '1fr 0.8fr 1.5fr 1fr 1fr',
    'minW': 880,
    'heads': ['Timestamp', 'Staff', 'Action', 'Business', 'Result'],
    'rows': [
      ['20 Nov 10:14', 'Nirav', 'Support grant: viewed device sync screen', 'Mahavir Cloth Store', C('OK \u00b7 grant active', 'ok')],
      ['20 Nov 09:30', 'Bhavesh', 'Platform login (SSO + hardware key)', '\u2014', C('Success', 'ok')],
      ['18 Nov 14:00', 'Prachi', 'Plan change: Starter \u2192 Pilot (Raghuvir Traders)', 'Raghuvir Traders', C('Applied', 'ok')],
      ['10 Nov 11:00', 'Hetal', 'Support grant: viewed GST summary', 'Navkar Textiles', C('OK \u00b7 grant expired', 'mute')],
      ['1 Nov 09:00', 'Prachi', 'Subscription cancelled on owner request', 'Jay Ambe Garments', C('Cancelled \u00b7 export preserved', 'mute')],
    ]
  },
  'note': 'Audit log is append-only. No staff member, including super admin, can delete or modify entries.'
})

# ── System logs ───────────────────────────────────────────────────────────────
pw('PlatformLogs.dc.html', 'System logs', {
  'title': 'System logs',
  'sub': 'Server-side error, warning and info logs. No customer bill or party data appears here.',
  'actions': ['Search logs', 'Export', 'Set log level'],
  'chips': ['All', 'Errors', 'Warnings', 'Sync events', 'API', 'Auth'],
  'kpis': [
    ['Errors (1 h)', '2', '1 sync retry \u00b7 1 auth', 'warn'],
    ['Warnings (1 h)', '7', ''],
    ['API p95 (1 h)', '184 ms', 'Target < 250 ms', 'ok'],
    ['Sync queue depth', '14', 'D04 \u00b7 stuck', 'warn'],
    ['Auth failures (24 h)', '0', '', 'ok'],
  ],
  'table': {
    'cols': '1fr 0.6fr 1fr 2fr',
    'minW': 860,
    'heads': ['Timestamp', 'Level', 'Component', 'Message'],
    'rows': [
      ['20 Nov 11:52:04', C('WARN', 'warn'), 'sync-worker', 'D04 retry #8 \u00b7 business b001 \u00b7 14 events queued'],
      ['20 Nov 11:50:12', C('INFO', 'mute'), 'api', 'POST /sync/push 200 \u00b7 b004 \u00b7 23 events \u00b7 141 ms'],
      ['20 Nov 11:47:33', C('WARN', 'warn'), 'backup', 'b007 backup delayed 22 min \u00b7 retry in 5 min'],
      ['20 Nov 11:30:00', C('INFO', 'mute'), 'scheduler', 'Renewal reminder sent \u00b7 2 businesses \u00b7 WhatsApp'],
      ['20 Nov 10:14:08', C('INFO', 'mute'), 'grant', 'Support grant view: staff=nirav biz=b007 screen=devices'],
    ]
  },
  'note': 'Logs are sanitised: business IDs, device IDs and event counts only. No transaction amounts or party names in logs.'
})

# ── Privacy requests ──────────────────────────────────────────────────────────
pw('PlatformPrivacy.dc.html', 'Privacy requests', {
  'title': 'Privacy requests',
  'sub': 'DPDPA requests: data export, correction and erasure. Erasure never deletes business data without legal process.',
  'actions': ['Export log', '*New request'],
  'chips': ['All', 'Open', 'Completed', 'Disputed'],
  'kpis': [
    ['Open requests', '1', 'Export \u00b7 Jay Ambe Garments'],
    ['Completed (12 m)', '3', '2 export \u00b7 1 correction'],
    ['Erasure requests', '0', ''],
    ['SLA (respond \u2264 30 d)', '100%', '', 'ok'],
    ['Legal holds active', '0', ''],
  ],
  'table': {
    'cols': '1.2fr 1fr 0.9fr 1fr 1fr 1fr',
    'minW': 900,
    'heads': ['Business / person', 'Type', 'Received', 'Due', 'Status', 'Handler'],
    'rows': [
      [B('Jay Ambe Garments', 'Desai'), 'Full data export', '2 Nov 2026', '2 Dec 2026', C('In progress', 'info'), 'Prachi'],
      [B('Shree Krishna Textiles', 'Staff Kiran'), 'Profile correction', '15 Oct 2026', '14 Nov 2026', C('Completed', 'ok'), 'Hetal'],
      [B('Navkar Textiles', 'Owner Mehta'), 'Data export', '1 Aug 2026', '31 Aug 2026', C('Completed', 'ok'), 'Prachi'],
    ]
  },
  'note': 'Erasure of a business is a legal-process-only operation. The UI never provides a delete button.'
})

# ── Integrations ──────────────────────────────────────────────────────────────
pw('PlatformIntegrations.dc.html', 'Integrations', {
  'title': 'Integrations',
  'sub': 'Third-party integrations used by the platform (not by individual businesses).',
  'actions': ['Test connection', '*Add integration'],
  'kpis': [
    ['Active integrations', '5', ''],
    ['Failed in last 24 h', '0', '', 'ok'],
    ['API keys rotated', '1 Nov 2026', '90-day rotation'],
  ],
  'table': {
    'cols': '1.2fr 1fr 1fr 1fr 1fr',
    'minW': 820,
    'heads': ['Integration', 'Purpose', 'Status', 'Last call', 'Notes'],
    'rows': [
      ['Firebase FCM', 'Android push notifications', C('Active', 'ok'), '2 min ago', 'All app versions'],
      ['Twilio / WhatsApp', 'Owner notifications', C('Active', 'ok'), '30 min ago', 'India DLT registered'],
      ['Razorpay', 'Subscription billing', C('Active', 'ok'), '1 Nov', 'Webhook: payment.captured'],
      ['AWS S3', 'Encrypted backups', C('Active', 'ok'), '20 min ago', 'ap-south-1 \u00b7 AES-256'],
      ['GSTN sandbox', 'HSN code validation', C('Active', 'ok'), '1 Oct', 'Rate master sync'],
    ]
  }
})

# ── Team & roles ──────────────────────────────────────────────────────────────
pw('PlatformStaff.dc.html', 'Team & roles', {
  'title': 'UdyamOS team & roles',
  'sub': 'Our own staff. Separate from customer users. SSO + hardware security key for everyone. No shared passwords.',
  'actions': ['Export', '*Invite team member'],
  'kpis': [
    ['Team members', '4', 'All keys active', 'ok'],
    ['Active sessions', '2', 'Bhavesh \u00b7 Nirav'],
    ['SSO provider', 'Google Workspace', ''],
    ['Hardware keys issued', '4 / 4', '', 'ok'],
    ['Last access review', '1 Nov 2026', ''],
  ],
  'table': {
    'cols': '1.5fr 0.8fr 0.6fr 0.6fr 0.6fr 0.6fr 0.6fr',
    'minW': 960,
    'heads': ['Permission', 'Super admin', 'Support', 'Billing', 'Onboarding', 'Analyst', 'Read-only'],
    'rows': [
      ['See businesses, plans, device health', '\u2713', '\u2713', '\u2713', '\u2713', '\u2713', '\u2713'],
      ['Open business data (owner grant)', '\u2014', '\u2713 view', '\u2014', '\u2713 view', '\u2014', '\u2014'],
      ['Change plan, refund, suspend', '\u2713 + 2nd', '\u2014', '\u2713', '\u2014', '\u2014', '\u2014'],
      ['Create pilot, import data', '\u2014', '\u2014', '\u2014', '\u2713 (grant)', '\u2014', '\u2014'],
      ['Platform metrics (no cust. data)', '\u2713', '\u2014', '\u2713', '\u2014', '\u2713', '\u2713'],
      ['Manage staff & roles', '\u2713', '\u2014', '\u2014', '\u2014', '\u2014', '\u2014'],
      ['Delete business data', 'Legal process only', '\u2014', '\u2014', '\u2014', '\u2014', '\u2014'],
    ]
  },
  'aside': {
    'title': 'Team',
    'sub': 'SSO + hardware key',
    'items': [
      ['Bhavesh \u00b7 Super admin', 'Key \u2713 \u00b7 Active now'],
      ['Nirav \u00b7 Support', 'Key \u2713 \u00b7 Active now'],
      ['Hetal \u00b7 Support', 'Key \u2713 \u00b7 Last: 1 h ago'],
      ['Prachi \u00b7 Billing + Onboarding', 'Key \u2713 \u00b7 Last: 2 h ago'],
    ],
    'foot': 'Platform audit log \u2192'
  }
})

# ── Platform settings ─────────────────────────────────────────────────────────
pw('PlatformSettings.dc.html', 'Platform settings', {
  'title': 'Platform settings',
  'sub': 'Global platform configuration. Changes affect all businesses. Super admin only.',
  'forms': [
    {
      'title': 'Billing & plans',
      'desc': 'Grace period and renewal reminder settings.',
      'fields': [
        {'l': 'Grace period after expiry', 'k': 'select', 'v': '7 days', 'ph': ''},
        {'l': 'Renewal reminder: first notice', 'k': 'select', 'v': '30 days before'},
        {'l': 'Renewal reminder: final notice', 'k': 'select', 'v': '7 days before'},
        {'l': 'Force-update from version', 'v': '1.0.2', 'ph': 'e.g. 1.0.2'},
      ]
    },
    {
      'title': 'Security',
      'desc': 'Session and access controls for platform staff.',
      'fields': [
        {'l': 'Platform session timeout', 'k': 'select', 'v': '8 hours'},
        {'l': 'API key rotation period', 'k': 'select', 'v': '90 days'},
        {'l': 'Require hardware key for support grants', 'k': 'toggle', 'on': True},
        {'l': 'Notify owner on every grant view', 'k': 'toggle', 'on': True},
      ]
    },
    {
      'title': 'Data & compliance',
      'desc': 'Retention and privacy settings.',
      'fields': [
        {'l': 'Audit log retention', 'k': 'select', 'v': '7 years'},
        {'l': 'Cancelled business data export window', 'k': 'select', 'v': '12 months'},
        {'l': 'Privacy request SLA', 'k': 'select', 'v': '30 days'},
      ]
    }
  ],
  'formButtons': [['*Save settings', '#'], ['Cancel', '#']],
  'note': 'All settings changes are logged in the platform audit log with the staff member\'s name and timestamp.'
})

# ── Client role dashboards ────────────────────────────────────────────────────
web('AccountantHome.dc.html', 'Accountant home', {
  'active': 'Dashboard', 'title': 'Good morning, Hitesh (CA)',
  'sub': 'Read-only \u00b7 Shree Krishna Textiles \u00b7 access until 15 Dec. Switch client at the top right.',
  'actions': ['Switch client', '*Download CA pack'],
  'kpis': [
    ['Month', 'November 2026', 'Open'],
    ['Bills not synced', '1', 'Godown phone', 'warn'],
    ['Open sync conflicts', '2', 'Owner must resolve', 'warn'],
    ['Credit notes', '4 \u00b7 \u20b961,200', ''],
  ],
  'table': {
    'cols': '1.6fr 1.6fr 1fr', 'minW': 760,
    'heads': ['CA pack item', 'What it is', 'Status'],
    'rows': [
      [B('Tally XML'), 'Sales, purchases, receipts, credit notes', C('Ready', 'ok')],
      [{'t': 'GST summary (GSTR-1 view)', 'b': True, 'h': 'GstSummary.dc.html'}, 'B2B, B2C, HSN', C('Ready', 'ok')],
      [{'t': 'Receivables ageing', 'b': True, 'h': 'Collections.dc.html'}, 'By party, 0\u201330 / 31\u201360 / 61\u201390 / 90+', C('Ready', 'ok')],
      [{'t': 'Sales register', 'b': True, 'h': 'SalesRegister.dc.html'}, 'All bills with tax split', C('Ready', 'ok')],
    ]
  },
  'aside': {
    'title': 'Your clients', 'sub': 'One login, many businesses',
    'items': [
      ['Shree Krishna Textiles', 'Open'],
      ['Navkar Textiles', 'Pack ready'],
      ['Mahavir Cloth Store', '1 unsynced', 'warn'],
    ],
    'foot': 'Share with CA \u2192'
  }
})

mob('MobileManagerHome.dc.html', 'Manager home', {
  'title': 'Divya \u00b7 Manager', 'sub': 'Counter 1 & 2 \u00b7 today', 'dark': True, 'menuBtn': True,
  'hero': {'l': 'Today\'s sales (my counters)', 'v': '\u20b91,24,300', 's': '18 bills \u00b7 2 waiting to sync', 'dark': True},
  'listTitle': 'Needs you',
  'items': [
    ['Over-limit approvals', '1 waiting \u00b7 Patel Sarees \u20b917,252', '', 'Approve', 'warn', None, 'MobileApprovals.dc.html'],
    ['Held bills', '2 on Counter 2', '', 'Open', 'info', None, 'MobileHeld.dc.html'],
    ['Cash at counter', '\u20b938,200 expected', '', 'Close day', 'mute', None, 'MobileCloseDay.dc.html'],
    ['Low stock', '7 items below reorder', '', 'View', 'warn', None, 'MobileLowStock.dc.html'],
    ['Offline approvals left today', '\u20b925,000 cap \u00b7 \u20b97,748 left', '', 'Info', 'mute'],
  ],
  'nav': 'Home'
})

mob('MobileGodownHome.dc.html', 'Godown home', {
  'title': 'Anil \u00b7 Godown', 'sub': 'Godown 1 \u00b7 cannot see prices or profit', 'dark': True, 'menuBtn': True,
  'hero': {'l': 'To dispatch today', 'v': '4 challans', 's': '96 m + 20 pc packed \u00b7 2 waiting', 'dark': True},
  'listTitle': 'Today',
  'items': [
    ['DC-D04-0091 \u00b7 Patel Sarees', 'RL-2292 \u00b7 R8, R9 \u00b7 96 m', '', 'Dispatch', 'info', None, 'MobileDispatch.dc.html'],
    ['Receive purchase', 'Surat Rayon House \u00b7 6 rolls', '', 'Receive', 'warn', None, 'MobilePurchase.dc.html'],
    ['Stock count due', 'Rayon rack A \u00b7 12 rolls', '', 'Count', 'mute', None, 'MobileStockCount.dc.html'],
    ['Transfer request', '10 rolls \u2192 Counter godown', '', 'Move', 'mute', None, 'MobileTransfer.dc.html'],
    ['Sync', '14 events waiting \u00b7 connect Wi-Fi', '', 'Fix', 'bad', None, 'MobileSync.dc.html'],
  ],
  'note': ['Godown role: challans, receiving, counts and transfers. No bills, prices or profit (security spec \u00a73.2).', 'mute'],
  'buttons': [['Check stock', 'MobileStock.dc.html'], ['*New challan', 'MobileChallan.dc.html']]
})
