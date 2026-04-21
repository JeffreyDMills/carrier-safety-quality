/* =========================================================================
   Executive Risk Command Center (HERO)
   ========================================================================= */

window.SQ_REGISTER('Executive', function () {
  const { useState } = React;
  const R = Recharts;
  const D = window.SQ_DATA;
  const H = window.SQ_HELPERS;
  const { Card, SectionHeader, SeverityPill, TrendChip, StatusPill, HeatBar, ClickableRow, Icon, Th, Td } = window.SQ_UI;

  function Executive({ onNav }) {
    const k = D.kpi;

    return (
      <div className="space-y-6">
        {/* -------------------- HERO -------------------- */}
        <div className="relative overflow-hidden rounded-2xl hero-gradient text-white p-7">
          <div className="absolute -top-24 -right-16 w-[380px] h-[380px] rounded-full bg-carrier-blue/25 blur-3xl"></div>
          <div className="absolute -bottom-20 -left-16 w-[320px] h-[320px] rounded-full bg-carrier-gold/15 blur-3xl"></div>
          <div className="relative grid grid-cols-12 gap-8">
            <div className="col-span-7">
              <div className="text-[11px] font-semibold tracking-[0.22em] text-carrier-gold uppercase mb-2">
                Executive Risk Command Center
              </div>
              <h2 className="text-[30px] leading-tight font-semibold">
                Connect fragmented quality signals.<br />
                <span className="font-serif italic text-carrier-gold">Detect field risk before it spreads.</span>
              </h2>
              <p className="mt-3 text-[13px] text-slate-300 max-w-2xl">
                Warranty, product, alarm, dealer, and parts signals unified into a single intelligence layer.
                Predicts elevated-risk populations up to 30 days earlier and accelerates root-cause investigation.
              </p>

              <div className="mt-5 grid grid-cols-3 gap-3 max-w-xl">
                <MetricChip label="Direct P&L saving"     value={H.fmtUSD(k.directPnLSaving)}       tone="blue" />
                <MetricChip label="Recall liability shield" value={H.fmtUSD(k.recallLiabilityShield)} tone="gold" />
                <MetricChip label="Quality labor reclaim" value={H.fmtUSD(k.qualityLaborReclaim)}    tone="slate" />
              </div>
            </div>

            <div className="col-span-5 flex flex-col items-end justify-between">
              <div className="flex items-center gap-2 text-[11px] bg-white/5 ring-1 ring-white/10 rounded-full px-3 py-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 sq-pulse"></span>
                <span className="text-slate-200">Intelligence layer active · 6 populations under watch</span>
              </div>
              <div className="text-right">
                <div className="text-[11px] uppercase tracking-[0.18em] text-slate-400">Year 1 value protected</div>
                <div className="mt-1 text-[46px] font-semibold leading-none tabular text-white">{H.fmtUSD(k.totalValueProtected)}</div>
                <div className="mt-1 text-[12px] text-slate-300">
                  Against <span className="tabular">{H.fmtUSD(k.fieldEscapeExposure)}</span> annual field escape exposure
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* -------------------- ENTERPRISE CONTEXT + FUNNEL -------------------- */}
        <div className="grid grid-cols-12 gap-6">
          <Card className="col-span-4" title="Enterprise context" subtitle="Operating scale and exposure envelope">
            <dl className="divide-y divide-slate-100">
              <Row label="Total revenue base"         value={H.fmtUSD(k.totalRevenueBase)} />
              <Row label="Annual warranty pool"       value={H.fmtUSD(k.annualWarrantyPool)} />
              <Row label="Field escape exposure"      value={H.fmtUSD(k.fieldEscapeExposure)} tone="danger" />
              <Row label="Non-API enabled gap"        value={H.fmtPct(k.nonApiGap)} tone="warn" />
              <Row label="Quality engineers"          value={D.assumptions.qualityEngineers} />
              <Row label="Loaded cost / engineer"     value={H.fmtUSD(D.assumptions.loadedCostPerEngineer)} />
            </dl>
          </Card>

          <Card
            className="col-span-8"
            title="Warranty exposure → protected value"
            subtitle="Where the $63.3M Year 1 value comes from"
            right={<span className="text-[11px] text-slate-500">USD, millions</span>}
          >
            <WarrantyFunnel />
          </Card>
        </div>

        {/* -------------------- TREND + API COVERAGE -------------------- */}
        <div className="grid grid-cols-12 gap-6">
          <Card className="col-span-7" title="30-day emerging issue confidence" subtitle="Hero pattern AP-402 · VRF control board reset escalation">
            <EmergingIssueTrend />
            <div className="mt-3 flex items-center gap-3 text-[11px] text-slate-500">
              <span className="inline-flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-carrier-blue"></span> Issue confidence</span>
              <span>·</span>
              <span>Threshold for active investigation: 80%</span>
              <span>·</span>
              <span className="font-medium text-red-700">Crossed 2026-04-05</span>
            </div>
          </Card>

          <Card className="col-span-5" title="Signal coverage by product family" subtitle="API-enabled vs manual retrieval">
            <ApiCoverageBars />
          </Card>
        </div>

        {/* -------------------- PRODUCT RISK HEATMAP -------------------- */}
        <Card
          title="Product risk heatmap"
          subtitle="Where emerging quality and safety signals are concentrated"
          right={
            <button onClick={() => onNav('populations')} className="text-[11px] font-medium text-carrier-blue hover:underline inline-flex items-center gap-1">
              Open populations <Icon.arrowRight />
            </button>
          }
        >
          <div className="overflow-hidden rounded-lg ring-1 ring-slate-200">
            <table className="w-full">
              <thead className="bg-slate-50 hairline">
                <tr>
                  <Th>Product family</Th>
                  <Th>Models under watch</Th>
                  <Th align="right">Units in market</Th>
                  <Th align="right">High-risk units</Th>
                  <Th align="right">Claim rate</Th>
                  <Th align="right">Alarm anomaly</Th>
                  <Th align="right">Safety score</Th>
                  <Th>Likely failure category</Th>
                  <Th>Status</Th>
                </tr>
              </thead>
              <tbody>
                {D.populations.map((p, i) => (
                  <ClickableRow
                    key={p.id}
                    onActivate={() => onNav('populations')}
                    className={`row-hover ${i < D.populations.length - 1 ? 'border-b border-slate-100' : ''}`}
                    aria-label={`Open populations view · ${p.family} · ${p.models}`}
                  >
                    <Td className="font-medium !text-slate-900">{p.family}</Td>
                    <Td className="text-slate-500">{p.models}</Td>
                    <Td align="right" className="tabular">{H.fmtNum(p.unitsInMarket)}</Td>
                    <Td align="right" className="tabular font-medium">{H.fmtNum(p.highRiskUnits)}</Td>
                    <Td align="right" className="tabular">{(p.warrantyClaimRate * 100).toFixed(1)}%</Td>
                    <Td align="right"><HeatBar value={p.alarmAnomalyScore} /></Td>
                    <Td align="right"><HeatBar value={p.safetyRiskScore} /></Td>
                    <Td>{p.likelyFailureCategory}</Td>
                    <Td><StatusPill status={p.escalationStatus} /></Td>
                  </ClickableRow>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* -------------------- VALUE PROTECTION + CAMPAIGN PREVENTION -------------------- */}
        <div className="grid grid-cols-12 gap-6">
          <Card className="col-span-7" title="Where the value comes from" subtitle="Three levers composing $63.3M Year 1 protected value">
            <div className="grid grid-cols-3 gap-3">
              <ValueCard
                title="Direct P&L saving"
                amount={H.fmtUSD(k.directPnLSaving)}
                formula="10% of warranty pool"
                detail="Earlier detection reduces field-escape claim volume and repair severity across 6 product families."
                tone="blue"
                weight="69%"
              />
              <ValueCard
                title="Recall liability shield"
                amount={H.fmtUSD(k.recallLiabilityShield)}
                formula="25% × field escape exposure"
                detail="Campaign prevention on at-risk cohorts (VRF board rev, RTU fan batch, CH-120X refrigerant cluster)."
                tone="gold"
                weight="26%"
              />
              <ValueCard
                title="Quality labor reclaim"
                amount={H.fmtUSD(k.qualityLaborReclaim)}
                formula="40% automation × 70 engineers"
                detail="Automated correlation of alarm, product, and warranty signals cuts manual investigation time."
                tone="slate"
                weight="5%"
              />
            </div>
            <div className="mt-4 p-3 rounded-lg bg-slate-50 ring-1 ring-slate-200 text-[12px] text-slate-600 leading-relaxed">
              Assumption set: 50% defect reduction target · 10% net warranty saving · 25% campaign prevention rate · 40% root-cause automation ·
              {' '}70 quality engineers @ {H.fmtUSD(D.assumptions.loadedCostPerEngineer)} loaded cost.
            </div>
          </Card>

          <Card
            className="col-span-5"
            title="Campaign prevention candidates"
            subtitle="Cohorts where early action prevents broader field events"
            right={<button onClick={() => onNav('field')} className="text-[11px] font-medium text-carrier-blue hover:underline inline-flex items-center gap-1">Field queue <Icon.arrowRight /></button>}
          >
            <div className="space-y-2.5">
              {D.campaignPreventionCandidates.map(c => (
                <div key={c.cohort} className="flex items-center justify-between p-3 rounded-lg ring-1 ring-slate-200 bg-slate-50/50">
                  <div className="min-w-0">
                    <div className="text-[12px] font-medium text-slate-900 truncate">{c.cohort}</div>
                    <div className="text-[11px] text-slate-500 mt-0.5 flex items-center gap-2">
                      <span className="tabular">{H.fmtNum(c.units)} units</span>
                      <span>·</span>
                      <span>Likelihood: {c.likelihood}</span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-[13px] font-semibold text-slate-900 tabular">{H.fmtUSD(c.exposure)}</div>
                    <div className="text-[10px] text-slate-400 uppercase tracking-wider">exposure</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* -------------------- TOP ALERT FOOTER -------------------- */}
        <Card
          title="Top active alert"
          subtitle="Highest-confidence emerging risk across the portfolio"
          right={<button onClick={() => onNav('alerts')} className="text-[11px] font-medium text-carrier-blue hover:underline inline-flex items-center gap-1">All alerts <Icon.arrowRight /></button>}
        >
          {(() => {
            const hero = D.alerts.find(a => a.hero) || D.alerts[0];
            return (
              <div className="flex items-start gap-5 p-1">
                <div className="shrink-0 w-10 h-10 rounded-lg bg-red-50 ring-1 ring-red-200 grid place-items-center">
                  <span className="text-red-600"><Icon.alert /></span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <SeverityPill severity={hero.severity} />
                    <span className="text-[12px] font-mono text-slate-400">{hero.id}</span>
                    <span className="text-[12px] text-slate-400">·</span>
                    <span className="text-[12px] text-slate-600">{hero.type}</span>
                  </div>
                  <div className="mt-1 text-[14px] font-semibold text-slate-900">{hero.cohort}</div>
                  <div className="text-[12px] text-slate-600 mt-0.5">{hero.region} · confidence {(hero.confidence * 100).toFixed(0)}%</div>
                  <div className="text-[12px] text-slate-600 mt-2 max-w-3xl">{hero.evidence}</div>
                </div>
                <div className="shrink-0 flex flex-col items-end gap-2">
                  <button onClick={() => onNav('rca')} className="text-[11px] font-medium px-3 py-1.5 rounded-lg bg-carrier-navy text-white hover:bg-carrier-blue">
                    Open RCA-501 →
                  </button>
                  <span className="text-[10px] text-slate-400">Owner: {hero.owner}</span>
                </div>
              </div>
            );
          })()}
        </Card>
      </div>
    );
  }

  /* ---------- sub-components ---------- */
  function MetricChip({ label, value, tone = 'blue' }) {
    const tones = {
      blue:  'bg-carrier-blue/20 ring-carrier-blue/30 text-white',
      gold:  'bg-carrier-gold/15 ring-carrier-gold/30 text-carrier-gold',
      slate: 'bg-white/5 ring-white/10 text-slate-200',
    };
    return (
      <div className={`rounded-lg ring-1 px-3 py-2.5 ${tones[tone]}`}>
        <div className="text-[10px] uppercase tracking-wider opacity-80">{label}</div>
        <div className="text-[17px] font-semibold tabular mt-0.5">{value}</div>
      </div>
    );
  }

  function Row({ label, value, tone }) {
    const toneClass = tone === 'danger' ? 'text-red-700' : tone === 'warn' ? 'text-amber-700' : 'text-slate-900';
    return (
      <div className="flex items-center justify-between py-2.5">
        <dt className="text-[12px] text-slate-500">{label}</dt>
        <dd className={`text-[13px] font-semibold tabular ${toneClass}`}>{value}</dd>
      </div>
    );
  }

  function ValueCard({ title, amount, formula, detail, tone, weight }) {
    const tones = {
      blue:  { bar: 'bg-carrier-blue',   chip: 'bg-carrier-blue/10 text-carrier-blue' },
      gold:  { bar: 'bg-carrier-gold',   chip: 'bg-carrier-gold/10 text-carrier-goldDim' },
      slate: { bar: 'bg-slate-500',      chip: 'bg-slate-100 text-slate-600' },
    };
    const t = tones[tone];
    return (
      <div className="relative rounded-xl ring-1 ring-slate-200 p-4 overflow-hidden">
        <div className={`absolute left-0 top-0 bottom-0 w-[3px] ${t.bar}`}></div>
        <div className="flex items-start justify-between">
          <div className="text-[11px] font-semibold text-slate-600 uppercase tracking-wider">{title}</div>
          <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${t.chip}`}>{weight}</span>
        </div>
        <div className="mt-2 text-[22px] font-semibold text-slate-900 tabular leading-none">{amount}</div>
        <div className="mt-1 text-[11px] text-slate-500">{formula}</div>
        <div className="mt-2.5 text-[11px] text-slate-600 leading-relaxed">{detail}</div>
      </div>
    );
  }

  /* ---------- charts ---------- */
  function WarrantyFunnel() {
    const data = [
      { label: 'Annual warranty pool',   value: 435,      color: '#1a3d7a', desc: 'Carrier-wide warranty obligation envelope' },
      { label: 'Field escape exposure',  value: 65.25,    color: '#b45309', desc: '15% of warranty pool tied to field escapes' },
      { label: 'Year 1 value protected', value: 63.3125,  color: '#047857', desc: 'Protected via earlier detection + prevention' },
    ];
    const max = 500;
    return (
      <div className="space-y-4 pt-2">
        {data.map((d, i) => (
          <div key={d.label}>
            <div className="flex items-baseline justify-between mb-1.5">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full" style={{ background: d.color }}></span>
                <span className="text-[12px] text-slate-700">{d.label}</span>
              </div>
              <span className="text-[14px] font-semibold tabular text-slate-900">${d.value.toFixed(2)}M</span>
            </div>
            <div className="h-7 bg-slate-100 rounded overflow-hidden relative">
              <div
                className="h-full rounded transition-all duration-500"
                style={{ background: d.color, width: `${Math.max(3, (d.value / max) * 100)}%` }}
              />
              <div className="absolute inset-0 flex items-center px-3 text-[11px] text-white font-medium pointer-events-none">
                {d.value >= 50 && `${((d.value / data[0].value) * 100).toFixed(1)}% of pool`}
              </div>
            </div>
            <div className="text-[11px] text-slate-500 mt-1">{d.desc}</div>
          </div>
        ))}
      </div>
    );
  }

  function EmergingIssueTrend() {
    const data = D.emergingIssueTrend30d;
    return (
      <div style={{ height: 220 }}>
        <R.ResponsiveContainer width="100%" height="100%">
          <R.AreaChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="sqblue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#1a3d7a" stopOpacity={0.35} />
                <stop offset="100%" stopColor="#1a3d7a" stopOpacity={0} />
              </linearGradient>
            </defs>
            <R.CartesianGrid stroke="#eef2f7" vertical={false} />
            <R.XAxis dataKey="day" tick={{ fontSize: 10, fill: '#64748b' }} axisLine={false} tickLine={false} />
            <R.YAxis tick={{ fontSize: 10, fill: '#64748b' }} axisLine={false} tickLine={false} domain={[40, 100]} width={30} />
            <R.Tooltip formatter={v => [`${v}%`, 'Confidence']} />
            <R.ReferenceLine y={80} stroke="#b91c1c" strokeDasharray="3 3" />
            <R.Area type="monotone" dataKey="score" stroke="#1a3d7a" strokeWidth={2} fill="url(#sqblue)" />
          </R.AreaChart>
        </R.ResponsiveContainer>
      </div>
    );
  }

  function ApiCoverageBars() {
    const data = D.apiCoverageByFamily;
    return (
      <div style={{ height: 220 }}>
        <R.ResponsiveContainer width="100%" height="100%">
          <R.BarChart data={data} layout="vertical" margin={{ top: 4, right: 16, left: 0, bottom: 0 }}>
            <R.CartesianGrid stroke="#eef2f7" horizontal={false} />
            <R.XAxis type="number" domain={[0, 100]} tick={{ fontSize: 10, fill: '#64748b' }} axisLine={false} tickLine={false} />
            <R.YAxis type="category" dataKey="family" tick={{ fontSize: 11, fill: '#334155' }} axisLine={false} tickLine={false} width={130} />
            <R.Tooltip formatter={(v, n) => [`${v}%`, n === 'api' ? 'API-enabled' : 'Manual retrieval']} />
            <R.Bar dataKey="api"    stackId="a" fill="#1a3d7a" />
            <R.Bar dataKey="manual" stackId="a" fill="#e2e8f0" />
          </R.BarChart>
        </R.ResponsiveContainer>
      </div>
    );
  }

  return Executive;
});
