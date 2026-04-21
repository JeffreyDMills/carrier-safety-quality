/* =========================================================================
   Field Exposure & Action Center
   ========================================================================= */

window.SQ_REGISTER('FieldExposure', function () {
  const D = window.SQ_DATA;
  const H = window.SQ_HELPERS;
  const { Card, SectionHeader, SeverityPill, StatusPill, Icon, Th, Td, TrendChip } = window.SQ_UI;

  const DEALERS_VISIBLE = 6;

  function FieldExposure({ onNav }) {
    const monitored = D.populations.reduce((s, p) => s + p.unitsInMarket, 0);
    const highRisk = D.populations.reduce((s, p) => s + p.highRiskUnits, 0);
    const escalated = D.populations.filter(p => p.escalationStatus === 'Escalated').length;

    return (
      <div className="space-y-6">
        <SectionHeader
          eyebrow="Field Exposure & Action"
          title="Act before a pattern becomes a campaign."
          lead="Monitored populations surface here when emerging risk warrants a concrete field move — dealer guidance, parts pre-positioning, service bulletin, or campaign review. Owner and priority are attached to every row."
        />

        {/* ---------- SUMMARY STRIP ---------- */}
        <div className="grid grid-cols-5 gap-3">
          <Chip label="Units monitored"        value={H.fmtNum(monitored)}                  sub="across 6 families"   tone="blue"  />
          <Chip label="High-risk units"        value={H.fmtNum(highRisk)}                   sub="rolled up"           tone="amber" />
          <Chip label="Populations escalated"  value={escalated}                            sub={`of ${D.populations.length}`} tone="red"   />
          <Chip label="Field failures avoided" value={H.fmtNum(D.kpi.fieldFailuresAvoided30d)} sub="30-day projection"   tone="green" />
          <Chip label="Campaign prevention opp" value={H.fmtUSD(D.kpi.recallLiabilityShield)} sub={`${D.campaignPreventionCandidates.length} candidates`} tone="gold" />
        </div>

        {/* ---------- MONITORED QUEUE ---------- */}
        <Card title="Monitored populations queue" subtitle="Every row has an owner and a next action">
          <div className="overflow-hidden rounded-lg ring-1 ring-slate-200">
            <table className="w-full">
              <thead className="bg-slate-50 hairline">
                <tr>
                  <Th>Population</Th>
                  <Th>Regions</Th>
                  <Th align="right">High-risk units</Th>
                  <Th>Trend</Th>
                  <Th>Recommended field action</Th>
                  <Th>Escalation</Th>
                  <Th>Owner</Th>
                </tr>
              </thead>
              <tbody>
                {D.fieldQueue.map((q, i) => (
                  <tr key={q.population} className={i < D.fieldQueue.length - 1 ? 'border-b border-slate-100' : ''}>
                    <Td className="font-medium !text-slate-900 max-w-[280px]">{q.population}</Td>
                    <Td className="text-slate-500">{q.regions.join(', ')}</Td>
                    <Td align="right" className="tabular font-medium">{H.fmtNum(q.highRiskUnits)}</Td>
                    <Td><TrendChip trend={q.issueTrend} /></Td>
                    <Td className="text-slate-700">{q.recommendedAction}</Td>
                    <Td><SeverityPill severity={q.escalationLevel} /></Td>
                    <Td className="text-slate-500">{q.owner}</Td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* ---------- CAMPAIGN PREVENTION + DEALER PRIORITY ---------- */}
        <div className="grid grid-cols-12 gap-6">
          <Card
            className="col-span-7"
            title="Campaign prevention candidates"
            subtitle="Where early action prevents broader field events — and where the recall liability shield dollars come from"
          >
            <div className="space-y-3">
              {D.campaignPreventionCandidates.map(c => (
                <div key={c.cohort} className="p-4 rounded-xl ring-1 ring-slate-200 bg-gradient-to-br from-carrier-gold/5 to-transparent">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <div className="text-[13px] font-semibold text-slate-900">{c.cohort}</div>
                      <div className="text-[11px] text-slate-500 mt-0.5">{H.fmtNum(c.units)} units · prevention likelihood {c.likelihood}</div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-[16px] font-semibold text-slate-900 tabular">{H.fmtUSD(c.exposure)}</div>
                      <div className="text-[10px] text-slate-400 uppercase tracking-wider">exposure shield</div>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center justify-between text-[11px]">
                    <span className="text-slate-500">Recommended: staged field notice + service bulletin draft</span>
                    <button className="text-carrier-blue font-medium hover:underline inline-flex items-center gap-1">
                      Prepare campaign review <Icon.arrowRight />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="col-span-5" title="Dealer / field prioritization" subtitle="Where to push field response first">
            <div className="space-y-2">
              {D.dealers.slice(0, DEALERS_VISIBLE).map(d => (
                <div key={d.id} className="flex items-center justify-between p-2.5 rounded-lg ring-1 ring-slate-200">
                  <div className="min-w-0">
                    <div className="text-[12px] font-medium text-slate-900 truncate">{d.name}</div>
                    <div className="text-[11px] text-slate-500 truncate">{d.region} · {H.fmtNum(d.unitsServed)} units</div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <div className="text-right">
                      <div className="text-[11px] text-slate-400 uppercase tracking-wider">events</div>
                      <div className="text-[13px] font-semibold tabular text-slate-900">{d.escalatedEvents}</div>
                    </div>
                    <SeverityPill severity={d.fieldIssueDensity === 'High' ? 'High' : d.fieldIssueDensity === 'Medium' ? 'Medium' : 'Low'} />
                  </div>
                </div>
              ))}
              {D.dealers.length > DEALERS_VISIBLE && (
                <div className="text-[11px] text-slate-500 pt-1">
                  +{D.dealers.length - DEALERS_VISIBLE} more dealers not shown
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* ---------- ACTION RECOMMENDATIONS ---------- */}
        <Card title="Field action recommendations" subtitle="Concrete operational moves tied to current queue">
          <div className="grid grid-cols-3 gap-4">
            {[
              { title: 'Targeted dealer inspection',  desc: 'Pacific HVAC Alliance + SunState VRF cohort · verify firmware and board revision on install date window Q3 2021.', cta: 'Prepare checklist' },
              { title: 'Service bulletin draft',      desc: 'AP-401 fan wear pattern — 21-day TTF inside SB-candidate window. Draft bulletin for RTU-48P / RTU-60P.', cta: 'Open draft' },
              { title: 'Parts stocking recommendation', desc: 'Pre-position condenser fan motors in Texas Gulf + Southwest distribution nodes to reduce time-to-repair.', cta: 'Send to ops' },
              { title: 'Expanded telemetry retrieval', desc: 'Pull additional alarm logs from 1,140 VRF units under escalation, especially non-API-enabled manual retrieval.', cta: 'Queue retrieval' },
              { title: 'Focused warranty review',     desc: 'CH-95Z serial range 44K–52K — refrigerant-loss claims up 38% in 30d. Review for coverage gate.', cta: 'Open review' },
              { title: 'Engineering escalation',      desc: 'RCA-501 ready for campaign review board. Confidence 91%, exposure $8.6M.', cta: 'Schedule review' },
            ].map((a, i) => (
              <div key={i} className="p-4 rounded-xl ring-1 ring-slate-200 bg-white">
                <div className="text-[12px] font-semibold text-slate-900">{a.title}</div>
                <div className="text-[11px] text-slate-600 mt-1.5 leading-relaxed">{a.desc}</div>
                <button className="mt-3 text-[11px] font-medium text-carrier-blue hover:underline inline-flex items-center gap-1">
                  {a.cta} <Icon.arrowRight />
                </button>
              </div>
            ))}
          </div>
        </Card>
      </div>
    );
  }

  function Chip({ label, value, sub, tone = 'blue' }) {
    const tones = {
      blue:  'before:bg-carrier-blue',
      amber: 'before:bg-amber-500',
      red:   'before:bg-red-500',
      green: 'before:bg-emerald-500',
      gold:  'before:bg-carrier-gold',
    };
    return (
      <div className={`relative bg-white rounded-xl ring-1 ring-slate-200 p-4 pl-5 before:absolute before:left-0 before:top-3 before:bottom-3 before:w-[3px] before:rounded-full ${tones[tone]}`}>
        <div className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">{label}</div>
        <div className="text-[20px] font-semibold text-slate-900 tabular mt-1 leading-none">{value}</div>
        {sub && <div className="text-[11px] text-slate-500 mt-1.5">{sub}</div>}
      </div>
    );
  }

  return FieldExposure;
});
