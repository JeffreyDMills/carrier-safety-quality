/* =========================================================================
   Root Cause Investigation Workspace
   Hero case: RCA-501 (VRF Control Board Reset Escalation)
   ========================================================================= */

(function () {
  window.SQ_SCREENS = window.SQ_SCREENS || {};
  const { useState } = React;
  const D = window.SQ_DATA;
  const H = window.SQ_HELPERS;
  const { Card, SectionHeader, SeverityPill, StatusPill, Confidence, Icon, Th, Td } = window.SQ_UI;

  function RootCause({ onNav }) {
    const [selectedId, setSelectedId] = useState('RCA-501');
    const selected = D.rcaCases.find(c => c.id === selectedId) || D.rcaCases[0];

    return (
      <div className="space-y-6">
        <SectionHeader
          eyebrow="Root Cause Investigation"
          title="Engineers don't start from scratch."
          lead="The intelligence layer ranks the most likely drivers, ties evidence to the timeline, and shows the impacted population. Teams open the case already 60% of the way through investigation."
        />

        {/* ---------- CASE STRIP ---------- */}
        <div className="grid grid-cols-12 gap-4">
          {D.rcaCases.map(c => (
            <button
              key={c.id}
              onClick={() => setSelectedId(c.id)}
              className={`col-span-3 text-left rounded-xl ring-1 px-4 py-3 transition-colors ${
                c.id === selectedId
                  ? 'ring-carrier-blue bg-carrier-blue/5'
                  : 'ring-slate-200 bg-white hover:ring-slate-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono text-slate-500">{c.id}</span>
                <SeverityPill severity={c.severity} />
              </div>
              <div className="mt-1.5 text-[12px] font-semibold text-slate-900 leading-snug line-clamp-2">{c.title}</div>
              <div className="mt-1 text-[11px] text-slate-500 truncate">{c.likelyFailureCategory}</div>
              <div className="mt-2 flex items-center justify-between text-[11px]">
                <span className="text-slate-500">conf {(c.confidence * 100).toFixed(0)}%</span>
                <span className="tabular font-medium text-slate-800">{H.fmtUSD(c.warrantyExposureAtRisk)}</span>
              </div>
            </button>
          ))}
        </div>

        {/* ---------- HERO RCA SECTION ---------- */}
        {selected.hero && selected.drivers ? (
          <HeroRCA rca={selected} onNav={onNav} />
        ) : (
          <Card title={selected.title} subtitle={`${selected.id} · ${selected.productFamily}`}>
            <div className="grid grid-cols-3 gap-6">
              <Stat label="Likely failure category" value={selected.likelyFailureCategory} />
              <Stat label="Severity"                value={<SeverityPill severity={selected.severity} />} />
              <Stat label="Status"                  value={<StatusPill status={selected.status} />} />
              <Stat label="First detected"          value={selected.firstDetected} />
              <Stat label="Confidence"              value={`${(selected.confidence * 100).toFixed(0)}%`} />
              <Stat label="Units impacted"          value={H.fmtNum(selected.unitsImpacted)} />
              <Stat label="Warranty exposure at risk" value={H.fmtUSD(selected.warrantyExposureAtRisk)} tone="red" wide />
            </div>
            <div className="mt-5 p-3 rounded-lg bg-slate-50 ring-1 ring-slate-200 text-[12px] text-slate-600">
              Hero investigation evidence is shown for RCA-501. Select that case above to see the full driver attribution, evidence timeline, and engineering workspace.
            </div>
          </Card>
        )}
      </div>
    );
  }

  function HeroRCA({ rca, onNav }) {
    return (
      <div className="space-y-6">
        {/* ISSUE SUMMARY */}
        <Card>
          <div className="flex items-start justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 text-[11px]">
                <span className="font-mono text-slate-500">{rca.id}</span>
                <SeverityPill severity={rca.severity} />
                <StatusPill status={rca.status} />
                <span className="text-slate-400">·</span>
                <span className="text-slate-500">first detected {rca.firstDetected}</span>
              </div>
              <h2 className="text-[20px] font-semibold text-slate-900 mt-1.5">{rca.title}</h2>
              <p className="text-[12px] text-slate-600 mt-1 max-w-3xl">
                Reset loop in VRF control firmware aligned with board revision <span className="font-medium">CB-7.3</span> and supplier lot <span className="font-medium">S-1184</span>.
                Pattern firing 17 days ahead of field communication-loss failures across two regions.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-4 shrink-0">
              <SmallStat label="Confidence"      value={`${(rca.confidence * 100).toFixed(0)}%`} tone="navy" />
              <SmallStat label="Units impacted"  value={H.fmtNum(rca.unitsImpacted)}              tone="amber" />
              <SmallStat label="Exposure at risk" value={H.fmtUSD(rca.warrantyExposureAtRisk)}    tone="red" />
            </div>
          </div>
        </Card>

        {/* DRIVERS + TIMELINE */}
        <div className="grid grid-cols-12 gap-6">
          <Card className="col-span-7" title="Suspected drivers" subtitle="Ranked by correlation strength × evidence quality">
            <div className="overflow-hidden rounded-lg ring-1 ring-slate-200">
              <table className="w-full">
                <thead className="bg-slate-50 hairline">
                  <tr>
                    <Th>Driver</Th>
                    <Th>Evidence type</Th>
                    <Th align="right">Correlation</Th>
                    <Th align="right">Confidence</Th>
                    <Th>Investigate</Th>
                  </tr>
                </thead>
                <tbody>
                  {rca.drivers.map((d, i) => (
                    <tr key={d.driver} className={i < rca.drivers.length - 1 ? 'border-b border-slate-100' : ''}>
                      <Td className="font-medium !text-slate-900">{d.driver}</Td>
                      <Td className="text-slate-500">{d.evidenceType}</Td>
                      <Td align="right">
                        <CorrelationBar value={d.correlation} />
                      </Td>
                      <Td align="right"><Confidence value={d.confidence} /></Td>
                      <Td>
                        <span className={`text-[11px] font-medium ${d.investigate === 'Yes' ? 'text-carrier-blue' : 'text-slate-500'}`}>{d.investigate}</span>
                      </Td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          <Card className="col-span-5" title="Evidence timeline" subtitle="Six months of accumulating signal">
            <ol className="relative pl-5 space-y-3">
              <span className="absolute left-1.5 top-1 bottom-1 w-px bg-slate-200"></span>
              {rca.timeline.map((t, i) => (
                <li key={i} className="relative">
                  <span className="absolute -left-[14px] top-1.5 w-2.5 h-2.5 rounded-full bg-carrier-blue ring-4 ring-white"></span>
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="text-[11px] font-mono text-slate-500">{t.date}</span>
                    <span className="text-[11px] font-medium text-carrier-blue">{t.type}</span>
                  </div>
                  <div className="text-[12px] text-slate-700 leading-snug mt-0.5">{t.detail}</div>
                </li>
              ))}
            </ol>
          </Card>
        </div>

        {/* AFFECTED POPULATIONS + ACTIONS */}
        <div className="grid grid-cols-12 gap-6">
          <Card className="col-span-7" title="Affected populations" subtitle="What is exposed and where it's growing">
            <div className="grid grid-cols-2 gap-4">
              <KvBlock label="Product families"  values={rca.affected.families} />
              <KvBlock label="Serial cohorts"    values={rca.affected.serialCohorts} />
              <KvBlock label="Regions"           values={rca.affected.regions} />
              <KvBlock label="Dealers"           values={rca.affected.dealers} />
            </div>
            <div className="mt-4 p-3 rounded-lg bg-red-50/50 ring-1 ring-red-100 flex items-center justify-between">
              <div>
                <div className="text-[11px] uppercase tracking-wider text-red-700">30-day failure growth rate</div>
                <div className="text-[18px] font-semibold tabular text-red-700 mt-0.5">+{(rca.affected.failureGrowthRate30d * 100).toFixed(0)}%</div>
              </div>
              <div className="text-right text-[11px] text-slate-600 max-w-[200px]">
                Growth rate is consistent with a configuration-driven cohort failure, not random field noise.
              </div>
            </div>
          </Card>

          <Card className="col-span-5" title="Engineering workspace" subtitle="Recommended next moves">
            <div className="space-y-2">
              {[
                { label: 'Assign investigation owner',          tone: 'primary' },
                { label: 'Request deeper Q3 2021 cohort analysis' },
                { label: 'Expand monitoring window to 60d' },
                { label: 'Issue preliminary field notice' },
                { label: 'Recommend parts review (CB-7.3 + lot S-1184)' },
                { label: 'Escalate to campaign review board' },
              ].map((a, i) => (
                <button key={i}
                  className={`w-full flex items-center justify-between text-left px-3 py-2.5 rounded-lg ring-1 transition-colors text-[12px] ${
                    a.tone === 'primary'
                      ? 'bg-carrier-navy text-white ring-carrier-navy hover:bg-carrier-blue'
                      : 'ring-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}>
                  <span className="font-medium">{a.label}</span>
                  <Icon.arrowRight />
                </button>
              ))}
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex gap-2">
              <button onClick={() => onNav('field')} className="text-[11px] font-medium px-3 py-1.5 rounded-lg ring-1 ring-slate-200 text-slate-700 hover:bg-slate-50">
                See field exposure
              </button>
              <button onClick={() => onNav('alerts')} className="text-[11px] font-medium px-3 py-1.5 rounded-lg ring-1 ring-slate-200 text-slate-700 hover:bg-slate-50">
                Linked alerts (1)
              </button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  function CorrelationBar({ value }) {
    const pct = Math.round(value * 100);
    const tone = value >= 0.75 ? 'bg-red-500' : value >= 0.6 ? 'bg-amber-500' : 'bg-slate-400';
    return (
      <div className="flex items-center gap-2 min-w-[120px]">
        <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
          <div className={`h-full ${tone}`} style={{ width: `${pct}%` }} />
        </div>
        <span className="text-[11px] tabular text-slate-700 font-medium w-10 text-right">{value.toFixed(2)}</span>
      </div>
    );
  }

  function Stat({ label, value, tone, wide }) {
    const cls = tone === 'red' ? 'text-red-700' : 'text-slate-900';
    return (
      <div className={wide ? 'col-span-3' : ''}>
        <div className="text-[11px] uppercase tracking-wider text-slate-500">{label}</div>
        <div className={`mt-1 text-[14px] font-semibold tabular ${cls}`}>{value}</div>
      </div>
    );
  }

  function SmallStat({ label, value, tone }) {
    const tones = {
      navy:  'text-carrier-navy',
      amber: 'text-amber-700',
      red:   'text-red-700',
    };
    return (
      <div className="text-right">
        <div className="text-[10px] uppercase tracking-wider text-slate-500">{label}</div>
        <div className={`text-[18px] font-semibold tabular leading-tight ${tones[tone] || 'text-slate-900'}`}>{value}</div>
      </div>
    );
  }

  function KvBlock({ label, values }) {
    return (
      <div>
        <div className="text-[11px] uppercase tracking-wider text-slate-500 mb-1.5">{label}</div>
        <div className="flex flex-wrap gap-1.5">
          {values.map(v => (
            <span key={v} className="text-[11px] px-2 py-0.5 rounded ring-1 ring-slate-200 bg-slate-50 text-slate-700">{v}</span>
          ))}
        </div>
      </div>
    );
  }

  window.SQ_SCREENS.RootCause = RootCause;
})();
