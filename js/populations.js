/* =========================================================================
   Product Population Risk
   ========================================================================= */

window.SQ_REGISTER('Populations', function () {
  const { useState } = React;
  const R = Recharts;
  const D = window.SQ_DATA;
  const H = window.SQ_HELPERS;
  const {
    Card, SectionHeader, SeverityPill, StatusPill,
    HeatBar, ProgressBar, Confidence, Sparkline,
    KeyValue, ClickableRow,
    Icon, Th, Td, TrendChip,
  } = window.SQ_UI;

  function Populations({ onNav }) {
    const [selectedId, setSelectedId] = useState('PP-102');
    const selected = D.populations.find(p => p.id === selectedId) || D.populations[0];

    return (
      <div className="space-y-6">
        <SectionHeader
          eyebrow="Product Populations"
          title="Which product cohorts are elevating risk?"
          lead="Every population is a model group × production window × region mix. Risk surfaces when warranty trend, alarm anomaly, and failure-category confidence move together. Click a row to drill in."
        />

        <div className="grid grid-cols-12 gap-6">
          {/* LEFT: population table */}
          <div className="col-span-7">
            <Card
              title="Population risk table"
              subtitle={`${D.populations.length} populations · ${D.populations.filter(p => p.escalationStatus === 'Escalated').length} escalated`}
            >
              <div className="overflow-hidden rounded-lg ring-1 ring-slate-200">
                <table className="w-full">
                  <thead className="bg-slate-50 hairline">
                    <tr>
                      <Th>ID</Th>
                      <Th>Family / models</Th>
                      <Th align="right">Units</Th>
                      <Th align="right">High-risk</Th>
                      <Th align="right">Claim rate</Th>
                      <Th align="right">Anomaly</Th>
                      <Th align="right">Safety</Th>
                      <Th align="right">Escalation</Th>
                      <Th>9-period trend</Th>
                      <Th></Th>
                    </tr>
                  </thead>
                  <tbody>
                    {D.populations.map((p, i) => {
                      const active = p.id === selectedId;
                      return (
                        <ClickableRow
                          key={p.id}
                          onActivate={() => setSelectedId(p.id)}
                          className={`${active ? 'row-active' : 'row-hover'} ${i < D.populations.length - 1 ? 'border-b border-slate-100' : ''}`}
                          aria-label={`Select population ${p.id} · ${p.family}`}
                        >
                          <Td className="font-mono !text-slate-500 text-[11px]">{p.id}</Td>
                          <Td>
                            <div className="font-medium text-slate-900 text-[12px]">{p.family}</div>
                            <div className="text-[11px] text-slate-500">{p.models} · {p.productionPeriod}</div>
                          </Td>
                          <Td align="right" className="tabular">{H.fmtNum(p.unitsInMarket)}</Td>
                          <Td align="right" className="tabular font-medium">{H.fmtNum(p.highRiskUnits)}</Td>
                          <Td align="right" className="tabular">{(p.warrantyClaimRate * 100).toFixed(1)}%</Td>
                          <Td align="right"><HeatBar value={p.alarmAnomalyScore} /></Td>
                          <Td align="right"><HeatBar value={p.safetyRiskScore} /></Td>
                          <Td align="right" className="tabular font-medium">{(p.escalationProbability * 100).toFixed(0)}%</Td>
                          <Td><Sparkline data={p.trend} width={72} height={22} /></Td>
                          <Td><StatusPill status={p.escalationStatus} /></Td>
                        </ClickableRow>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </Card>

            {/* failure categories for selected */}
            <Card className="mt-6" title={`Likely failure categories · ${selected.id}`} subtitle="Ranked probability given signal mix">
              <LikelyCategories population={selected} />
            </Card>
          </div>

          {/* RIGHT: selected detail */}
          <div className="col-span-5 space-y-6">
            <Card title="Population detail" subtitle={`${selected.id} · ${selected.models}`}>
              <div className="space-y-3">
                <KeyValue label="Product family"           value={selected.family} />
                <KeyValue label="Production period"        value={selected.productionPeriod} />
                <KeyValue label="Units in market"          value={H.fmtNum(selected.unitsInMarket)} />
                <KeyValue label="Telemetry coverage"       value={H.fmtPct(selected.telemetryCoverage)} />
                <KeyValue label="High-risk units"          value={H.fmtNum(selected.highRiskUnits)} tone="red" />
                <KeyValue label="Claim rate"               value={`${(selected.warrantyClaimRate * 100).toFixed(1)}%`} />
                <KeyValue label="Alarm anomaly score"      value={selected.alarmAnomalyScore} />
                <KeyValue label="Safety risk score"        value={selected.safetyRiskScore} />
                <KeyValue label="Likely failure category"  value={selected.likelyFailureCategory} strong />
                <KeyValue label="Escalation probability"   value={H.fmtPct(selected.escalationProbability)} tone="red" strong />
                <div className="pt-3 mt-1 border-t border-slate-100">
                  <div className="text-[11px] uppercase tracking-wider text-slate-500">Recommended action</div>
                  <div className="text-[13px] font-semibold text-slate-900 mt-1">{selected.recommendedAction}</div>
                </div>
              </div>
            </Card>

            <Card title="Anomaly trend · 9-period rolling" subtitle="Alarm anomaly score over operating quarters">
              <div style={{ height: 170 }}>
                <R.ResponsiveContainer width="100%" height="100%">
                  <R.AreaChart data={selected.trend.map((v, i) => ({ t: `Q-${8 - i}`, score: v }))} margin={{ top: 10, right: 8, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="pop-anom" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#b91c1c" stopOpacity={0.25} />
                        <stop offset="100%" stopColor="#b91c1c" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <R.CartesianGrid stroke="#eef2f7" vertical={false} />
                    <R.XAxis dataKey="t" tick={{ fontSize: 10, fill: '#64748b' }} axisLine={false} tickLine={false} />
                    <R.YAxis tick={{ fontSize: 10, fill: '#64748b' }} axisLine={false} tickLine={false} domain={[40, 100]} width={30} />
                    <R.Tooltip formatter={v => [v, 'Anomaly']} />
                    <R.Area type="monotone" dataKey="score" stroke="#b91c1c" strokeWidth={2} fill="url(#pop-anom)" />
                  </R.AreaChart>
                </R.ResponsiveContainer>
              </div>
            </Card>

            <Card title="Recommended next actions">
              <ul className="space-y-2">
                {getNextActions(selected).map((a, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-[12px]">
                    <span className="mt-0.5 w-4 h-4 rounded-full bg-carrier-blue/10 text-carrier-blue grid place-items-center text-[10px] font-semibold shrink-0">{i + 1}</span>
                    <span className="text-slate-700">{a}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 pt-3 border-t border-slate-100 flex gap-2">
                <button onClick={() => onNav('rca')} className="text-[11px] font-medium px-3 py-1.5 rounded-lg bg-carrier-navy text-white hover:bg-carrier-blue">
                  Open investigation →
                </button>
                <button onClick={() => onNav('patterns')} className="text-[11px] font-medium px-3 py-1.5 rounded-lg ring-1 ring-slate-200 text-slate-700 hover:bg-slate-50">
                  See failure patterns
                </button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  function LikelyCategories({ population }) {
    // synthesize likely failure category ranking for selected population
    const primary = population.likelyFailureCategory;
    const all = D.failureCategories;
    const ranked = [
      { cat: primary, p: 0.62 },
      ...all.filter(c => c !== primary).slice(0, 4).map((c, i) => ({ cat: c, p: [0.18, 0.09, 0.06, 0.03, 0.02][i] })),
    ];
    return (
      <div className="space-y-2.5">
        {ranked.map((r, i) => (
          <div key={r.cat} className="flex items-center gap-3">
            <div className="w-48 text-[12px] text-slate-700">{r.cat}</div>
            <div className="flex-1">
              <ProgressBar
                value={Math.round(r.p * 100)}
                color={i === 0 ? 'bg-carrier-blue' : 'bg-slate-300'}
              />
            </div>
            <div className="w-10 text-right tabular text-[12px] font-medium text-slate-800">{Math.round(r.p * 100)}%</div>
          </div>
        ))}
      </div>
    );
  }

  function getNextActions(p) {
    const base = ['Expand monitored cohort to full production window', 'Review dealer service notes for correlated patterns'];
    if (p.escalationStatus === 'Escalated') {
      return [
        `Open RCA on ${p.likelyFailureCategory.toLowerCase()} hypothesis`,
        ...base,
        'Stage field guidance + parts pre-positioning',
      ];
    }
    if (p.escalationStatus === 'Under review') {
      return [
        'Promote to active investigation if anomaly holds 7 more days',
        ...base,
        'Flag for campaign review board',
      ];
    }
    return [
      'Continue monitoring through next refresh cycle',
      ...base,
      'Revisit threshold if claim rate rises 15%+',
    ];
  }

  return Populations;
});
