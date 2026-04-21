/* =========================================================================
   Shared UI building blocks
   Exposed on window.SQ_UI
   ========================================================================= */

(function () {
  const { useState, useMemo } = React;
  const H = window.SQ_HELPERS;

  /* ---------- ICONS (inline svg) ---------- */
  const Icon = {
    dashboard: (p) => (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.7" {...p}>
        <rect x="3" y="3"  width="8" height="10" rx="1.5"/>
        <rect x="13" y="3" width="8" height="6"  rx="1.5"/>
        <rect x="13" y="11" width="8" height="10" rx="1.5"/>
        <rect x="3" y="15" width="8" height="6"  rx="1.5"/>
      </svg>
    ),
    grid: (p) => (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.7" {...p}>
        <rect x="3" y="3"  width="7" height="7" rx="1"/>
        <rect x="14" y="3" width="7" height="7" rx="1"/>
        <rect x="3" y="14" width="7" height="7" rx="1"/>
        <rect x="14" y="14" width="7" height="7" rx="1"/>
      </svg>
    ),
    pulse: (p) => (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.7" {...p}>
        <path d="M3 12h4l2-7 4 14 2-7h6"/>
      </svg>
    ),
    search: (p) => (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.7" {...p}>
        <circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>
      </svg>
    ),
    alert: (p) => (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.7" {...p}>
        <path d="M12 3 2 21h20L12 3z"/><path d="M12 10v5"/><path d="M12 18h.01"/>
      </svg>
    ),
    flow: (p) => (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.7" {...p}>
        <circle cx="6" cy="6" r="3"/><circle cx="18" cy="18" r="3"/><path d="M9 6h6a3 3 0 0 1 3 3v6"/>
      </svg>
    ),
    target: (p) => (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.7" {...p}>
        <circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5"/>
      </svg>
    ),
    map: (p) => (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.7" {...p}>
        <path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3z"/><path d="M9 3v15"/><path d="M15 6v15"/>
      </svg>
    ),
    settings: (p) => (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.7" {...p}>
        <circle cx="12" cy="12" r="3"/>
        <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/>
      </svg>
    ),
    arrowUp: (p) => (<svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" {...p}><path d="M7 14l5-5 5 5"/></svg>),
    arrowDown: (p) => (<svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" {...p}><path d="M7 10l5 5 5-5"/></svg>),
    arrowRight: (p) => (<svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" {...p}><path d="M5 12h14M13 6l6 6-6 6"/></svg>),
    chevron: (p) => (<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" {...p}><path d="m9 6 6 6-6 6"/></svg>),
    check: (p) => (<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.2" {...p}><path d="m5 12 5 5L20 7"/></svg>),
    sparkle: (p) => (<svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" {...p}><path d="M12 2 13.6 8.4 20 10l-6.4 1.6L12 18l-1.6-6.4L4 10l6.4-1.6z"/></svg>),
    close: (p) => (<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" {...p}><path d="M6 6l12 12M18 6 6 18"/></svg>),
  };

  /* ---------- PILLS / CHIPS ---------- */
  const SeverityPill = ({ severity, withDot = true, size = 'sm' }) => {
    const tone = H.severityToTone(severity);
    const sizing = size === 'lg' ? 'text-xs px-2.5 py-1' : 'text-[11px] px-2 py-0.5';
    return (
      <span className={`inline-flex items-center gap-1.5 rounded-full ring-1 font-medium ${tone.bg} ${tone.text} ${tone.ring} ${sizing}`}>
        {withDot && <span className={`w-1.5 h-1.5 rounded-full ${tone.dot}`} />}
        {severity}
      </span>
    );
  };

  const StatusPill = ({ status }) => {
    const map = {
      'Open':         { bg: 'bg-blue-50',    text: 'text-blue-700',    ring: 'ring-blue-200' },
      'Investigating':{ bg: 'bg-violet-50',  text: 'text-violet-700',  ring: 'ring-violet-200' },
      'Monitoring':   { bg: 'bg-slate-50',   text: 'text-slate-600',   ring: 'ring-slate-200' },
      'Closed':       { bg: 'bg-emerald-50', text: 'text-emerald-700', ring: 'ring-emerald-200' },
      'Escalated':    { bg: 'bg-red-50',     text: 'text-red-700',     ring: 'ring-red-200' },
      'Under review': { bg: 'bg-amber-50',   text: 'text-amber-700',   ring: 'ring-amber-200' },
    };
    const t = map[status] || { bg: 'bg-slate-50', text: 'text-slate-700', ring: 'ring-slate-200' };
    return <span className={`inline-flex items-center rounded-full ring-1 text-[11px] px-2 py-0.5 font-medium ${t.bg} ${t.text} ${t.ring}`}>{status}</span>;
  };

  const TrendChip = ({ trend }) => {
    if (trend === 'Rising')    return <span className="inline-flex items-center gap-1 text-[11px] font-medium text-red-700"><Icon.arrowUp /> Rising</span>;
    if (trend === 'Stable')    return <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-500">— Stable</span>;
    if (trend === 'Improving') return <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-700"><Icon.arrowDown /> Improving</span>;
    return <span className="text-[11px] text-slate-500">{trend}</span>;
  };

  const Confidence = ({ value }) => {
    const pct = Math.round(value * 100);
    const tone = pct >= 85 ? 'bg-carrier-blue' : pct >= 70 ? 'bg-amber-500' : 'bg-slate-400';
    return (
      <div className="flex items-center gap-2 min-w-[100px]">
        <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
          <div className={`h-full ${tone}`} style={{ width: `${pct}%` }} />
        </div>
        <span className="text-[11px] tabular text-slate-700 font-medium w-8 text-right">{pct}%</span>
      </div>
    );
  };

  /* ---------- LAYOUT PRIMITIVES ---------- */
  const Card = ({ title, subtitle, right, children, className = '' }) => (
    <div className={`bg-white rounded-xl ring-1 ring-slate-200 ${className}`}>
      {(title || right) && (
        <div className="flex items-start justify-between gap-3 px-5 pt-4 pb-3">
          <div>
            {title && <div className="text-[13px] font-semibold text-slate-900">{title}</div>}
            {subtitle && <div className="text-[11px] text-slate-500 mt-0.5">{subtitle}</div>}
          </div>
          {right}
        </div>
      )}
      <div className={title ? 'px-5 pb-5' : 'p-5'}>{children}</div>
    </div>
  );

  const SectionHeader = ({ eyebrow, title, lead, right }) => (
    <div className="flex items-end justify-between gap-6 mb-4">
      <div>
        {eyebrow && <div className="text-[11px] font-semibold tracking-[0.18em] text-carrier-gold uppercase mb-1.5">{eyebrow}</div>}
        <h1 className="text-[22px] font-semibold text-slate-900 leading-tight">{title}</h1>
        {lead && <p className="text-[13px] text-slate-600 mt-1.5 max-w-3xl">{lead}</p>}
      </div>
      {right}
    </div>
  );

  /* ---------- KPI CARD ---------- */
  const KPICard = ({ label, value, sub, accent = 'navy', delta, deltaTone }) => {
    const accents = {
      navy:   'before:bg-carrier-blue',
      gold:   'before:bg-carrier-gold',
      red:    'before:bg-red-500',
      amber:  'before:bg-amber-500',
      green:  'before:bg-emerald-500',
    };
    return (
      <div className={`relative bg-white rounded-xl ring-1 ring-slate-200 p-4 pl-5 before:absolute before:left-0 before:top-3 before:bottom-3 before:w-[3px] before:rounded-full ${accents[accent] || accents.navy}`}>
        <div className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">{label}</div>
        <div className="mt-1.5 flex items-baseline gap-2">
          <div className="text-[22px] font-semibold text-slate-900 tabular leading-none">{value}</div>
          {delta && (
            <span className={`text-[11px] font-medium tabular ${deltaTone === 'up' ? 'text-red-700' : deltaTone === 'down' ? 'text-emerald-700' : 'text-slate-500'}`}>
              {delta}
            </span>
          )}
        </div>
        {sub && <div className="text-[11px] text-slate-500 mt-1.5">{sub}</div>}
      </div>
    );
  };

  /* ---------- SPARKLINE ---------- */
  const Sparkline = ({ data, height = 24, width = 90, color = '#1a3d7a', fill = 'rgba(26,61,122,0.08)' }) => {
    if (!data || data.length < 2) return null;
    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min || 1;
    const stepX = width / (data.length - 1);
    const points = data.map((v, i) => `${i * stepX},${height - ((v - min) / range) * (height - 2) - 1}`).join(' ');
    const area = `0,${height} ${points} ${width},${height}`;
    return (
      <svg width={width} height={height} className="overflow-visible">
        <polygon points={area} fill={fill} />
        <polyline points={points} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  };

  /* ---------- HEAT BAR (for risk scores) ---------- */
  const HeatBar = ({ value, max = 100 }) => {
    const pct = Math.min(100, (value / max) * 100);
    const tone = value >= 75 ? 'bg-red-500' : value >= 60 ? 'bg-amber-500' : value >= 45 ? 'bg-yellow-400' : 'bg-emerald-500';
    return (
      <div className="flex items-center gap-2 min-w-[110px]">
        <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
          <div className={`h-full ${tone}`} style={{ width: `${pct}%` }} />
        </div>
        <span className="text-[11px] tabular text-slate-700 font-medium w-7 text-right">{value}</span>
      </div>
    );
  };

  /* ---------- PROGRESS BAR (generic, color/height pickable) ----------
     One canonical bar so populations / patterns / rca don't each redo width math. */
  const ProgressBar = ({
    value,
    max = 100,
    color = 'bg-carrier-blue',
    height = 'h-2',
    className = '',
  }) => {
    const pct = Math.max(0, Math.min(100, (Number(value) / Number(max)) * 100));
    return (
      <div className={`${height} bg-slate-100 rounded-full overflow-hidden ${className}`}>
        <div className={`h-full ${color}`} style={{ width: `${pct}%` }} />
      </div>
    );
  };

  /* ---------- KEY/VALUE ROW ----------
     Replaces the four near-identical Dkv components that lived inside
     populations / patterns / alerts. Auto-detects React-node values so callers
     don't need an isNode flag. */
  const KeyValue = ({ label, value, strong = false, tone = 'default' }) => {
    const toneCls = {
      default: 'text-slate-800',
      strong:  'text-slate-900',
      red:     'text-red-700',
      amber:   'text-amber-700',
      navy:    'text-carrier-blue',
    }[tone] || 'text-slate-800';
    const isNode = React.isValidElement(value);
    return (
      <div className="flex items-center justify-between">
        <span className="text-[11px] text-slate-500">{label}</span>
        {isNode
          ? value
          : (
            <span className={`text-[12px] tabular ${strong ? 'font-semibold text-slate-900' : `font-medium ${toneCls}`}`}>
              {value}
            </span>
          )}
      </div>
    );
  };

  /* ---------- CLICKABLE TABLE ROW ----------
     Adds keyboard activation + visible focus ring to onClick rows, so the
     drill-in interaction isn't mouse-only. */
  const ClickableRow = ({ onActivate, className = '', children, ...rest }) => {
    const handleKey = (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onActivate && onActivate(e);
      }
    };
    return (
      <tr
        tabIndex={0}
        onClick={onActivate}
        onKeyDown={handleKey}
        className={`cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-carrier-blue ${className}`}
        {...rest}
      >
        {children}
      </tr>
    );
  };

  /* ---------- LEFT NAV ---------- */
  const NAV = [
    { id: 'exec',        label: 'Risk Command',         icon: Icon.dashboard, group: 1 },
    { id: 'foundation',  label: 'Data Foundation',      icon: Icon.flow,      group: 1 },
    { id: 'populations', label: 'Product Populations',  icon: Icon.grid,      group: 2 },
    { id: 'patterns',    label: 'Failure Patterns',     icon: Icon.pulse,     group: 2 },
    { id: 'rca',         label: 'Root Cause',           icon: Icon.target,    group: 2 },
    { id: 'field',       label: 'Field Exposure',       icon: Icon.map,       group: 3 },
    { id: 'alerts',      label: 'Alerts',               icon: Icon.alert,     group: 3 },
  ];

  const SideNav = ({ current, onNav }) => (
    <aside className="w-60 shrink-0 bg-carrier-navy text-slate-200 flex flex-col">
      <div className="px-5 py-5 border-b border-white/5">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-md bg-carrier-blue/30 ring-1 ring-white/10 grid place-items-center">
            <span className="font-serif italic text-white text-[15px]">C</span>
          </div>
          <div className="leading-tight">
            <div className="text-[12px] font-semibold text-white tracking-wide">CARRIER</div>
            <div className="text-[10px] uppercase tracking-[0.18em] text-carrier-gold">Quality Intel</div>
          </div>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto py-3 scrollbar-thin">
        {[1, 2, 3].map((g, gi) => (
          <div key={g} className={gi > 0 ? 'mt-2 pt-2 border-t border-white/5' : ''}>
            {NAV.filter(n => n.group === g).map(n => {
              const active = current === n.id;
              return (
                <button
                  key={n.id}
                  onClick={() => onNav(n.id)}
                  className={`w-full flex items-center gap-3 px-5 py-2 text-[13px] transition-colors ${
                    active ? 'bg-carrier-blue/30 text-white border-l-2 border-carrier-gold' : 'text-slate-300 hover:bg-white/5 hover:text-white border-l-2 border-transparent'
                  }`}
                >
                  <n.icon />
                  <span className="font-medium">{n.label}</span>
                </button>
              );
            })}
          </div>
        ))}
      </nav>

      <div className="px-5 py-4 border-t border-white/5 text-[11px] text-slate-400">
        <div className="flex items-center gap-2">
          <Icon.settings />
          <span>Settings</span>
        </div>
      </div>
    </aside>
  );

  /* ---------- TOP HEADER ---------- */
  const TopHeader = ({ filters, setFilters }) => {
    const filterOptions = ['Product Family', 'Region', 'Risk Level', 'Failure Category', 'Telemetry Coverage', 'Warranty Status'];
    return (
      <header className="bg-white hairline">
        <div className="px-7 pt-5 pb-3">
          <div className="flex items-start justify-between gap-6">
            <div>
              <h1 className="text-[18px] font-semibold text-slate-900 leading-tight">
                Carrier <span className="font-serif italic text-carrier-blue">Product Safety & Quality Intelligence</span>
              </h1>
              <p className="text-[12px] text-slate-500 mt-0.5">Early Warning · Root Cause Intelligence · Field Risk Reduction</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative w-[340px]">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"><Icon.search /></span>
                <input
                  className="w-full pl-9 pr-3 py-2 text-[12px] bg-slate-50 ring-1 ring-slate-200 rounded-lg focus:outline-none focus:ring-carrier-blue"
                  placeholder="Search model, serial range, component, dealer, family"
                />
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-carrier-blue text-white grid place-items-center text-[12px] font-semibold">JM</div>
                <div className="leading-tight">
                  <div className="text-[12px] font-semibold text-slate-800">Jeff Mills</div>
                  <div className="text-[10px] text-slate-500">VP Product Quality</div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 mt-3">
            {filterOptions.map(f => (
              <button
                key={f}
                className="text-[11px] px-2.5 py-1 rounded-full bg-slate-50 text-slate-600 ring-1 ring-slate-200 hover:bg-slate-100 hover:text-slate-800"
              >
                {f} <span className="text-slate-400">·</span> All
              </button>
            ))}
            <span className="text-[11px] text-slate-400 ml-2">Last refreshed 4 min ago</span>
          </div>
        </div>
      </header>
    );
  };

  /* ---------- KPI STRIP ---------- */
  const KPIStrip = () => {
    const k = window.SQ_DATA.kpi;
    return (
      <div className="grid grid-cols-6 gap-3 px-7 py-4 bg-slate-50 hairline">
        <KPICard label="Annual warranty pool"    value={H.fmtUSD(k.annualWarrantyPool)}   sub="Carrier-wide"            accent="navy"  />
        <KPICard label="Field escape exposure"   value={H.fmtUSD(k.fieldEscapeExposure)}  sub="15% of warranty pool"    accent="red"   delta="↑" deltaTone="up" />
        <KPICard label="Populations under watch" value="6"                                sub="3 escalated · 3 monitor" accent="amber" />
        <KPICard label="Predicted high-risk units" value="33,730"                         sub="across 6 product families" accent="amber" />
        <KPICard label="Campaign prevention opp" value={H.fmtUSD(k.recallLiabilityShield)} sub="3 candidate cohorts"    accent="gold"  />
        <KPICard label="Year 1 value protected"  value={H.fmtUSD(k.totalValueProtected)}  sub="P&L + recall + labor"    accent="green" />
      </div>
    );
  };

  /* ---------- SIMPLE TABLE PRIMITIVE ---------- */
  const Th = ({ children, align = 'left', className = '' }) => (
    <th className={`text-[10px] uppercase tracking-wider font-medium text-slate-500 px-3 py-2 text-${align} ${className}`}>{children}</th>
  );
  const Td = ({ children, align = 'left', className = '' }) => (
    <td className={`px-3 py-2.5 text-[12px] text-slate-700 text-${align} ${className}`}>{children}</td>
  );

  /* ---------- export ---------- */
  window.SQ_UI = {
    Icon, SeverityPill, StatusPill, TrendChip, Confidence,
    Card, SectionHeader, KPICard, Sparkline, HeatBar, ProgressBar,
    KeyValue, ClickableRow,
    SideNav, TopHeader, KPIStrip,
    Th, Td, NAV,
  };
})();

/* =========================================================================
   SQ_REGISTER — screen-loading safety net
   Wraps each screen factory in try/catch so a broken dependency (the way
   Recharts silently failed without prop-types) renders a visible error card
   instead of taking the whole app down with React error #130.
   ========================================================================= */
(function () {
  function ErrorScreen(name, err) {
    return function ScreenLoadError() {
      return (
        <div className="p-6 rounded-xl bg-red-50 ring-1 ring-red-200">
          <div className="text-[12px] font-semibold tracking-[0.18em] uppercase text-red-700">
            Screen failed to load
          </div>
          <div className="text-[16px] font-semibold text-slate-900 mt-1">{name}</div>
          <pre className="mt-3 text-[11px] text-red-700 font-mono whitespace-pre-wrap leading-relaxed">
            {String((err && err.stack) || (err && err.message) || err)}
          </pre>
          <div className="text-[11px] text-slate-600 mt-3">
            Check the browser console for the full stack. Most common cause: a CDN dependency
            (Recharts, prop-types, React) didn't load before this screen's IIFE ran.
          </div>
        </div>
      );
    };
  }

  window.SQ_REGISTER = function (name, factory) {
    window.SQ_SCREENS = window.SQ_SCREENS || {};
    try {
      const Screen = factory();
      if (typeof Screen !== 'function') {
        throw new Error(`Factory for "${name}" did not return a component function.`);
      }
      window.SQ_SCREENS[name] = Screen;
    } catch (e) {
      console.error(`[SQ_SCREENS.${name}] failed to load:`, e);
      window.SQ_SCREENS[name] = ErrorScreen(name, e);
    }
  };
})();
