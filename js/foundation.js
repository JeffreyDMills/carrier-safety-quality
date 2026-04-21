/* =========================================================================
   Data Foundation / Signal Recovery
   ========================================================================= */

window.SQ_REGISTER('DataFoundation', function () {
  const R = Recharts;
  const D = window.SQ_DATA;
  const H = window.SQ_HELPERS;
  const { Card, SectionHeader, KeyValue, Icon, Th, Td } = window.SQ_UI;

  function DataFoundation() {
    const tele = D.telemetryCoverage;

    return (
      <div className="space-y-6">
        <SectionHeader
          eyebrow="Data Foundation"
          title="Fragmented quality signals, connected."
          lead="The problem is not absence of data — it is that warranty, product, alarm, dealer, parts, and service signals live in separate systems and are not joined early enough. This page shows how the intelligence layer ingests, resolves, correlates, and scores them."
        />

        {/* PIPELINE */}
        <Card title="Signal integration pipeline" subtitle="Ingest → resolve → normalize → correlate → model → surface">
          <Pipeline />
        </Card>

        {/* SOURCE SYSTEMS + TELEMETRY COVERAGE */}
        <div className="grid grid-cols-12 gap-6">
          <Card className="col-span-8" title="Source systems" subtitle="What feeds the intelligence layer">
            <div className="overflow-hidden rounded-lg ring-1 ring-slate-200">
              <table className="w-full">
                <thead className="bg-slate-50 hairline">
                  <tr>
                    <Th>Source</Th>
                    <Th>Coverage</Th>
                    <Th>Refresh</Th>
                    <Th>Notes</Th>
                  </tr>
                </thead>
                <tbody>
                  {D.sourceSystems.map((s, i) => (
                    <tr key={s.type} className={i < D.sourceSystems.length - 1 ? 'border-b border-slate-100' : ''}>
                      <Td className="font-medium !text-slate-900">{s.type}</Td>
                      <Td>
                        <CoverageChip coverage={s.coverage} />
                      </Td>
                      <Td className="text-slate-500">{s.refresh}</Td>
                      <Td className="text-slate-600">{s.notes}</Td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          <Card className="col-span-4" title="Telemetry coverage" subtitle="The non-API gap Carrier is working around">
            <div className="space-y-4">
              <div className="relative h-[160px] flex items-center justify-center">
                <R.ResponsiveContainer width="100%" height="100%">
                  <R.PieChart>
                    <R.Pie
                      data={[
                        { name: 'API-enabled',     value: tele.apiEnabled    * 100 },
                        { name: 'Manual retrieval', value: tele.nonApiEnabled * 100 },
                      ]}
                      innerRadius={48}
                      outerRadius={70}
                      paddingAngle={2}
                      dataKey="value"
                      startAngle={90}
                      endAngle={-270}
                    >
                      <R.Cell fill="#1a3d7a" />
                      <R.Cell fill="#e2e8f0" />
                    </R.Pie>
                  </R.PieChart>
                </R.ResponsiveContainer>
                <div className="absolute text-center">
                  <div className="text-[22px] font-semibold tabular text-slate-900">30%</div>
                  <div className="text-[10px] uppercase tracking-wider text-slate-500">API-enabled</div>
                </div>
              </div>
              <div className="space-y-2">
                <LegendRow color="#1a3d7a" label="API-enabled units" value="30%" />
                <LegendRow color="#e2e8f0" label="Manual retrieval"  value="70%" />
              </div>
              <div className="pt-2 border-t border-slate-100 space-y-1.5">
                <div className="flex justify-between text-[11px]"><span className="text-slate-500">Manual retrieval dependency</span><span className="font-medium text-amber-700">{tele.manualRetrieval}</span></div>
                <div className="flex justify-between text-[11px]"><span className="text-slate-500">Delayed signal risk</span><span className="font-medium text-red-700">{tele.delayedSignalRisk}</span></div>
              </div>
            </div>
          </Card>
        </div>

        {/* UNIFIED SEMANTIC LAYER */}
        <Card title="Unified semantic layer" subtitle="The connected product / serial / claim / alarm / service graph">
          <SemanticLayer />
        </Card>

        {/* SIGNAL TRANSFORMATION EXAMPLE */}
        <Card title="From raw signals to intelligence" subtitle="Worked example: how a VRF cohort becomes a risk score">
          <div className="grid grid-cols-12 gap-5">
            <div className="col-span-5">
              <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-2">Raw signals</div>
              <div className="space-y-2">
                {D.signalExample.rawSignals.map(s => (
                  <div key={s.label} className="p-3 rounded-lg ring-1 ring-slate-200 bg-slate-50">
                    <div className="text-[10px] uppercase tracking-wider text-slate-500">{s.label}</div>
                    <div className="text-[12px] text-slate-800 mt-0.5">{s.value}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-span-2 flex items-center justify-center">
              <div className="flex flex-col items-center text-carrier-blue">
                <Icon.arrowRight className="w-6 h-6" />
                <div className="text-[10px] uppercase tracking-wider mt-1 text-slate-500">Resolve · correlate · score</div>
              </div>
            </div>
            <div className="col-span-5">
              <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-2">Normalized intelligence</div>
              <div className="p-4 rounded-lg ring-1 ring-carrier-blue/30 bg-gradient-to-br from-carrier-blue/5 to-transparent space-y-1">
                <KeyValue label="Product family"           value={D.signalExample.normalized.productFamily} />
                <KeyValue label="Model group"              value={D.signalExample.normalized.modelGroup} />
                <KeyValue label="Cohort"                   value={D.signalExample.normalized.cohort} />
                <KeyValue label="Likely failure category"  value={D.signalExample.normalized.likelyFailureCategory} strong />
                <KeyValue label="Safety risk score"        value={D.signalExample.normalized.safetyRiskScore} />
                <KeyValue label="Escalation probability"   value={H.fmtPct(D.signalExample.normalized.escalationProbability)} />
                <div className="mt-3 pt-3 border-t border-slate-200">
                  <div className="text-[10px] uppercase tracking-wider text-slate-500">Recommended action</div>
                  <div className="text-[13px] font-semibold text-slate-900 mt-1">{D.signalExample.normalized.recommendedAction}</div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  function Pipeline() {
    const steps = [
      { title: 'Ingest',       desc: 'Warranty, product, alarm, dealer, parts, service',       icon: '01' },
      { title: 'Resolve',      desc: 'Entity / serial / unit ID matching',                     icon: '02' },
      { title: 'Normalize',    desc: 'Product + component hierarchy mapping',                  icon: '03' },
      { title: 'Correlate',    desc: 'Alarm ↔ warranty ↔ service signal joins',                icon: '04' },
      { title: 'Model',        desc: 'Risk score + likely failure category',                   icon: '05' },
      { title: 'Surface',      desc: 'Alerts, investigation views, field queue',               icon: '06' },
    ];
    return (
      <div className="relative">
        <div className="absolute left-0 right-0 top-[34px] h-[2px] bg-gradient-to-r from-carrier-blue via-carrier-blue to-carrier-gold opacity-20"></div>
        <div className="relative grid grid-cols-6 gap-3">
          {steps.map((s, i) => (
            <div key={s.title} className="flex flex-col items-center">
              <div className="w-[68px] h-[68px] rounded-full bg-white ring-2 ring-carrier-blue/20 grid place-items-center shadow-sm">
                <div className="text-center">
                  <div className="text-[10px] text-carrier-gold font-semibold">{s.icon}</div>
                  <div className="text-[11px] font-semibold text-slate-900 mt-0.5">{s.title}</div>
                </div>
              </div>
              <div className="text-[11px] text-slate-600 text-center mt-3 max-w-[140px] leading-snug">{s.desc}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  function SemanticLayer() {
    const nodes = [
      { id: 'product',  label: 'Product model',      x: 50,  y: 50,  color: '#1a3d7a' },
      { id: 'serial',   label: 'Serial / unit ID',   x: 50,  y: 170, color: '#1a3d7a' },
      { id: 'alarm',    label: 'Alarm history',      x: 280, y: 30,  color: '#c8a04f' },
      { id: 'warranty', label: 'Warranty claims',    x: 280, y: 110, color: '#c8a04f' },
      { id: 'service',  label: 'Dealer / service',   x: 280, y: 190, color: '#c8a04f' },
      { id: 'parts',    label: 'Parts performance',  x: 280, y: 270, color: '#c8a04f' },
      { id: 'risk',     label: 'Risk score + category', x: 520, y: 120, color: '#047857' },
      { id: 'action',   label: 'Recommended action', x: 520, y: 210, color: '#047857' },
    ];
    const edges = [
      ['product', 'alarm'], ['product', 'warranty'], ['serial', 'service'], ['serial', 'parts'],
      ['product', 'serial'],
      ['alarm', 'risk'], ['warranty', 'risk'], ['service', 'risk'], ['parts', 'risk'],
      ['risk', 'action'],
    ];
    const byId = Object.fromEntries(nodes.map(n => [n.id, n]));
    const nw = 150, nh = 36;
    return (
      <div className="overflow-x-auto">
        <svg width="700" height="320" className="mx-auto">
          {edges.map(([from, to]) => {
            const a = byId[from]; const b = byId[to];
            return (
              <line key={`${from}-${to}`}
                x1={a.x + nw} y1={a.y + nh/2}
                x2={b.x} y2={b.y + nh/2}
                stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="0"
              />
            );
          })}
          {nodes.map(n => (
            <g key={n.id}>
              <rect x={n.x} y={n.y} width={nw} height={nh} rx="6"
                fill="white" stroke={n.color} strokeWidth="1.5" />
              <text x={n.x + nw/2} y={n.y + nh/2 + 4} textAnchor="middle"
                fontSize="11" fontWeight="600" fill="#0f172a">
                {n.label}
              </text>
            </g>
          ))}
        </svg>
      </div>
    );
  }

  function CoverageChip({ coverage }) {
    const tone = {
      'Enterprise-wide': { bg: 'bg-emerald-50', text: 'text-emerald-700', ring: 'ring-emerald-200' },
      'Broad':           { bg: 'bg-blue-50',    text: 'text-blue-700',    ring: 'ring-blue-200' },
      'Partial':         { bg: 'bg-amber-50',   text: 'text-amber-700',   ring: 'ring-amber-200' },
    }[coverage] || { bg: 'bg-slate-50', text: 'text-slate-700', ring: 'ring-slate-200' };
    return <span className={`inline-flex items-center rounded-full ring-1 text-[11px] px-2 py-0.5 font-medium ${tone.bg} ${tone.text} ${tone.ring}`}>{coverage}</span>;
  }

  function LegendRow({ color, label, value }) {
    return (
      <div className="flex items-center justify-between text-[12px]">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-sm" style={{ background: color }}></span>
          <span className="text-slate-700">{label}</span>
        </div>
        <span className="tabular font-medium text-slate-900">{value}</span>
      </div>
    );
  }

  return DataFoundation;
});
