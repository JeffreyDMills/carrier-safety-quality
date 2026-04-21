/* =========================================================================
   Failure Pattern & Correlation
   ========================================================================= */

(function () {
  window.SQ_SCREENS = window.SQ_SCREENS || {};
  const { useState } = React;
  const R = Recharts;
  const D = window.SQ_DATA;
  const H = window.SQ_HELPERS;
  const { Card, SectionHeader, SeverityPill, TrendChip, Confidence, Icon, Th, Td } = window.SQ_UI;

  function Patterns({ onNav }) {
    const [selectedId, setSelectedId] = useState('AP-402');
    const selected = D.alarmPatterns.find(p => p.id === selectedId) || D.alarmPatterns[0];

    return (
      <div className="space-y-6">
        <SectionHeader
          eyebrow="Failure Patterns"
          title="Alarm sequences correlated to likely failure categories."
          lead="Repeated alarm behavior, claim clustering, and parts signals tell us whether we have noise or a real emerging failure mode. Click a pattern to see the evidence."
        />

        <div className="grid grid-cols-12 gap-6">
          {/* LEFT: pattern explorer */}
          <div className="col-span-7 space-y-6">
            <Card title="Alarm sequence patterns" subtitle={`${D.alarmPatterns.length} patterns under watch`}>
              <div className="overflow-hidden rounded-lg ring-1 ring-slate-200">
                <table className="w-full">
                  <thead className="bg-slate-50 hairline">
                    <tr>
                      <Th>ID</Th>
                      <Th>Sequence</Th>
                      <Th align="right">Freq</Th>
                      <Th align="right">Avg TTF</Th>
                      <Th align="right">Confidence</Th>
                      <Th>Trend</Th>
                    </tr>
                  </thead>
                  <tbody>
                    {D.alarmPatterns.map((p, i) => {
                      const active = p.id === selectedId;
                      return (
                        <tr
                          key={p.id}
                          className={`${active ? 'row-active' : 'row-hover'} ${i < D.alarmPatterns.length - 1 ? 'border-b border-slate-100' : ''}`}
                          onClick={() => setSelectedId(p.id)}
                        >
                          <Td className="font-mono !text-slate-500 text-[11px]">{p.id}</Td>
                          <Td>
                            <div className="font-medium text-slate-900 text-[12px] leading-snug">{p.sequence}</div>
                            <div className="text-[11px] text-slate-500 mt-0.5">{p.modelGroup} · {p.linkedFailureCategory}</div>
                          </Td>
                          <Td align="right" className="tabular">{p.frequency}</Td>
                          <Td align="right" className="tabular">{p.avgTimeToFailureDays}d</Td>
                          <Td align="right"><Confidence value={p.confidence} /></Td>
                          <Td><TrendChip trend={p.trend} /></Td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </Card>

            <Card title="Failure category ranking" subtitle="Engineering priority across the portfolio">
              <div className="overflow-hidden rounded-lg ring-1 ring-slate-200">
                <table className="w-full">
                  <thead className="bg-slate-50 hairline">
                    <tr>
                      <Th>#</Th>
                      <Th>Failure category</Th>
                      <Th>Families impacted</Th>
                      <Th align="right">Units</Th>
                      <Th>Severity</Th>
                      <Th>Trend</Th>
                    </tr>
                  </thead>
                  <tbody>
                    {D.failureCategoryRanking.map((c, i) => (
                      <tr key={c.category} className={i < D.failureCategoryRanking.length - 1 ? 'border-b border-slate-100' : ''}>
                        <Td className="font-mono !text-slate-400 text-[11px]">{c.engineeringPriority}</Td>
                        <Td className="font-medium !text-slate-900">{c.category}</Td>
                        <Td className="text-slate-500">{c.families.join(', ')}</Td>
                        <Td align="right" className="tabular">{H.fmtNum(c.unitsImpacted)}</Td>
                        <Td><SeverityPill severity={c.severity} /></Td>
                        <Td><TrendChip trend={c.trend} /></Td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>

            <Card title="Component correlation map" subtitle="How components, alarms, claims, and environments correlate">
              <div className="overflow-hidden rounded-lg ring-1 ring-slate-200">
                <table className="w-full">
                  <thead className="bg-slate-50 hairline">
                    <tr>
                      <Th>Component</Th>
                      <Th>Linked alarm</Th>
                      <Th align="right">Claims</Th>
                      <Th align="right">Service events</Th>
                      <Th>Environment</Th>
                      <Th align="right">Strength</Th>
                    </tr>
                  </thead>
                  <tbody>
                    {D.componentCorrelation.map((c, i) => (
                      <tr key={c.component} className={i < D.componentCorrelation.length - 1 ? 'border-b border-slate-100' : ''}>
                        <Td className="font-medium !text-slate-900">{c.component}</Td>
                        <Td className="text-slate-500">{c.alarm}</Td>
                        <Td align="right" className="tabular">{c.claims}</Td>
                        <Td align="right" className="tabular">{c.serviceEvents}</Td>
                        <Td className="text-slate-500">{c.environment}</Td>
                        <Td align="right" className="tabular font-medium">{c.strength.toFixed(2)}</Td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>

          {/* RIGHT: selected pattern detail */}
          <div className="col-span-5 space-y-6">
            <Card title={`Pattern detail · ${selected.id}`} subtitle={selected.productFamily}>
              <div className="p-3 rounded-lg bg-slate-50 ring-1 ring-slate-200">
                <div className="text-[11px] uppercase tracking-wider text-slate-500 mb-1">Sequence</div>
                <div className="text-[13px] font-medium text-slate-900 leading-snug">{selected.sequence}</div>
              </div>

              <div className="mt-4 space-y-2.5">
                <Dkv label="Product family"          value={selected.productFamily} />
                <Dkv label="Model group"             value={selected.modelGroup} />
                <Dkv label="Frequency"               value={`${selected.frequency} occurrences`} />
                <Dkv label="Avg time to failure"     value={`${selected.avgTimeToFailureDays} days`} />
                <Dkv label="Linked failure category" value={selected.linkedFailureCategory} strong />
                <Dkv label="Severity"                value={<SeverityPill severity={selected.severity} />} isNode />
                <Dkv label="Trend"                   value={<TrendChip trend={selected.trend} />} isNode />
                <Dkv label="Regions"                 value={selected.regions.join(', ')} />
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[11px] uppercase tracking-wider text-slate-500">Confidence</span>
                  <span className="text-[14px] font-semibold tabular text-slate-900">{(selected.confidence * 100).toFixed(0)}%</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-carrier-blue" style={{ width: `${selected.confidence * 100}%` }}></div>
                </div>
              </div>
            </Card>

            <Card title="Geographic / dealer clustering" subtitle="Where this pattern is most concentrated">
              <div className="space-y-2">
                {D.regionClusters.slice(0, 5).map((c, i) => (
                  <div key={c.region} className="p-2.5 rounded-lg ring-1 ring-slate-200">
                    <div className="flex items-center justify-between">
                      <div className="text-[12px] font-medium text-slate-900">{c.region}</div>
                      <div className="text-[11px] text-slate-500 tabular">density {c.issueDensity}</div>
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5">{c.dealer} · {c.family}</div>
                    <div className="mt-1.5 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-carrier-gold" style={{ width: `${c.patternConcentration}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card title="Supporting evidence" subtitle="Why this pattern looks real, not noise">
              <ul className="space-y-2 text-[12px] text-slate-700">
                <Evidence label="Alarm behavior"       value={`${selected.frequency} occurrences, clustered within ${selected.avgTimeToFailureDays}d of field failure`} />
                <Evidence label="Warranty events"      value={`Claim density above baseline for ${selected.modelGroup}`} />
                <Evidence label="Parts performance"    value="Replacement volume rising on linked components" />
                <Evidence label="Service notes"        value="Dealer repeat-visit language aligns with sequence" />
                <Evidence label="Historical comparison" value="Signature matches prior field-observed failure mode" />
              </ul>
              <div className="mt-4 pt-3 border-t border-slate-100 flex gap-2">
                <button onClick={() => onNav('rca')} className="text-[11px] font-medium px-3 py-1.5 rounded-lg bg-carrier-navy text-white hover:bg-carrier-blue">
                  Open root cause →
                </button>
                <button onClick={() => onNav('field')} className="text-[11px] font-medium px-3 py-1.5 rounded-lg ring-1 ring-slate-200 text-slate-700 hover:bg-slate-50">
                  Field queue
                </button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  function Dkv({ label, value, strong, isNode }) {
    return (
      <div className="flex items-center justify-between">
        <span className="text-[11px] text-slate-500">{label}</span>
        {isNode
          ? value
          : <span className={`text-[12px] tabular ${strong ? 'font-semibold text-slate-900' : 'text-slate-800'}`}>{value}</span>}
      </div>
    );
  }

  function Evidence({ label, value }) {
    return (
      <li className="flex items-start gap-2">
        <span className="mt-1 w-1.5 h-1.5 rounded-full bg-carrier-blue shrink-0"></span>
        <span><span className="font-medium text-slate-900">{label}:</span> {value}</span>
      </li>
    );
  }

  window.SQ_SCREENS.Patterns = Patterns;
})();
