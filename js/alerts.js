/* =========================================================================
   Alerts
   ========================================================================= */

(function () {
  window.SQ_SCREENS = window.SQ_SCREENS || {};
  const { useState } = React;
  const D = window.SQ_DATA;
  const H = window.SQ_HELPERS;
  const { Card, SectionHeader, SeverityPill, StatusPill, Confidence, Icon, Th, Td } = window.SQ_UI;

  function Alerts({ onNav }) {
    const [selectedId, setSelectedId] = useState('AL-801');
    const selected = D.alerts.find(a => a.id === selectedId) || D.alerts[0];

    const counts = D.alerts.reduce((acc, a) => {
      acc[a.severity] = (acc[a.severity] || 0) + 1;
      return acc;
    }, {});

    return (
      <div className="space-y-6">
        <SectionHeader
          eyebrow="Alerts"
          title="Not analytics — earlier response."
          lead="Emerging quality and safety patterns surface here as prioritized operational alerts. Each alert carries an owner, a confidence score, and a concrete next action."
        />

        {/* ---------- SEVERITY SUMMARY ---------- */}
        <div className="grid grid-cols-4 gap-3">
          {['Critical', 'High', 'Medium', 'Low'].map(sev => (
            <div key={sev} className="bg-white rounded-xl ring-1 ring-slate-200 p-4">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">{sev}</span>
                <SeverityPill severity={sev} />
              </div>
              <div className="mt-2 text-[26px] font-semibold tabular text-slate-900 leading-none">{counts[sev] || 0}</div>
              <div className="text-[11px] text-slate-500 mt-1">active alerts</div>
            </div>
          ))}
        </div>

        {/* ---------- QUEUE + DETAIL DRAWER ---------- */}
        <div className="grid grid-cols-12 gap-6">
          <Card className="col-span-7" title="Active alert queue" subtitle={`${D.alerts.length} open alerts · sorted by severity + confidence`}>
            <div className="overflow-hidden rounded-lg ring-1 ring-slate-200">
              <table className="w-full">
                <thead className="bg-slate-50 hairline">
                  <tr>
                    <Th></Th>
                    <Th>Alert</Th>
                    <Th>Region</Th>
                    <Th align="right">Conf</Th>
                    <Th>Owner</Th>
                    <Th>Next</Th>
                  </tr>
                </thead>
                <tbody>
                  {D.alerts.map((a, i) => {
                    const active = a.id === selectedId;
                    return (
                      <tr key={a.id} className={`${active ? 'row-active' : 'row-hover'} ${i < D.alerts.length - 1 ? 'border-b border-slate-100' : ''}`} onClick={() => setSelectedId(a.id)}>
                        <Td><SeverityPill severity={a.severity} /></Td>
                        <Td>
                          <div className="text-[12px] font-medium text-slate-900 leading-snug">{a.type}</div>
                          <div className="text-[11px] text-slate-500 mt-0.5">{a.cohort}</div>
                        </Td>
                        <Td className="text-slate-500">{a.region}</Td>
                        <Td align="right"><Confidence value={a.confidence} /></Td>
                        <Td className="text-slate-500 text-[11px]">{a.owner}</Td>
                        <Td className="text-slate-700 text-[11px]">{a.nextAction}</Td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Card>

          <div className="col-span-5 space-y-6">
            <Card title={`Alert detail · ${selected.id}`} subtitle={selected.type}>
              <div className="flex items-start gap-3">
                <div className={`shrink-0 w-10 h-10 rounded-lg grid place-items-center ${selected.severity === 'Critical' ? 'bg-red-50 ring-1 ring-red-200 text-red-600' : 'bg-amber-50 ring-1 ring-amber-200 text-amber-600'}`}>
                  <Icon.alert />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <SeverityPill severity={selected.severity} />
                    <StatusPill status={selected.status} />
                  </div>
                  <div className="mt-1 text-[13px] font-semibold text-slate-900">{selected.cohort}</div>
                  <div className="text-[11px] text-slate-500">{selected.region} · {selected.created}</div>
                </div>
              </div>

              <div className="mt-4 space-y-2.5">
                <Dkv label="Confidence"    value={`${(selected.confidence * 100).toFixed(0)}%`} strong />
                <Dkv label="Owner"         value={selected.owner} />
                <Dkv label="Status"        value={selected.status} />
                <Dkv label="Created"       value={selected.created} />
                <Dkv label="Next action"   value={selected.nextAction} strong />
                {selected.linkedRCA && <Dkv label="Linked RCA"   value={selected.linkedRCA} />}
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100">
                <div className="text-[11px] uppercase tracking-wider text-slate-500 mb-1.5">Why it fired</div>
                <div className="text-[12px] text-slate-700 leading-relaxed">{selected.evidence}</div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap gap-2">
                {selected.linkedRCA && (
                  <button onClick={() => onNav('rca')} className="text-[11px] font-medium px-3 py-1.5 rounded-lg bg-carrier-navy text-white hover:bg-carrier-blue">
                    Open {selected.linkedRCA} →
                  </button>
                )}
                <button onClick={() => onNav('field')} className="text-[11px] font-medium px-3 py-1.5 rounded-lg ring-1 ring-slate-200 text-slate-700 hover:bg-slate-50">
                  Field queue
                </button>
                <button onClick={() => onNav('patterns')} className="text-[11px] font-medium px-3 py-1.5 rounded-lg ring-1 ring-slate-200 text-slate-700 hover:bg-slate-50">
                  See patterns
                </button>
              </div>
            </Card>

            <Card title="Routing & escalation" subtitle="How this alert moves through the org">
              <ol className="space-y-2.5">
                <Route step="1" label="Pattern detector" tone="blue"  detail="Alarm anomaly + claim density crossed emergent-pattern threshold" />
                <Route step="2" label="Owner assignment"  tone="blue"  detail={`Routed to ${selected.owner}`} />
                <Route step="3" label="RCA investigation" tone={selected.linkedRCA ? 'blue' : 'slate'} detail={selected.linkedRCA ? `Promoted to ${selected.linkedRCA}` : 'Awaiting promotion decision'} />
                <Route step="4" label="Field response"    tone="slate" detail="Recommended field action drafted — pending owner review" />
                <Route step="5" label="Campaign review"   tone="slate" detail="Eligible if escalation holds through next refresh" />
              </ol>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  function Dkv({ label, value, strong }) {
    return (
      <div className="flex items-center justify-between">
        <span className="text-[11px] text-slate-500">{label}</span>
        <span className={`text-[12px] tabular ${strong ? 'font-semibold text-slate-900' : 'text-slate-700'}`}>{value}</span>
      </div>
    );
  }

  function Route({ step, label, detail, tone = 'slate' }) {
    const tones = {
      blue:  'bg-carrier-blue text-white',
      slate: 'bg-slate-100 text-slate-500',
    };
    return (
      <li className="flex items-start gap-3">
        <span className={`shrink-0 w-6 h-6 rounded-full grid place-items-center text-[11px] font-semibold ${tones[tone]}`}>{step}</span>
        <div>
          <div className="text-[12px] font-medium text-slate-900">{label}</div>
          <div className="text-[11px] text-slate-500">{detail}</div>
        </div>
      </li>
    );
  }

  window.SQ_SCREENS.Alerts = Alerts;
})();
