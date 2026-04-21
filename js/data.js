/* =========================================================================
   Carrier · Product Safety & Quality Intelligence
   Sample data pack
   All values exposed on window.SQ_DATA
   ========================================================================= */

window.SQ_DATA = {
  /* -------------------- Executive KPIs -------------------- */
  kpi: {
    totalRevenueBase:    21_750_000_000,   // $21.75B
    annualWarrantyPool:        435_000_000,   // $435M
    fieldEscapeExposure:        65_250_000,   // $65.25M
    nonApiGap: 0.70,                          // 70%
    directPnLSaving:            43_500_000,   // $43.5M
    recallLiabilityShield:      16_312_500,   // $16.3125M
    qualityLaborReclaim:         3_500_000,   // $3.5M
    totalValueProtected:        63_312_500,   // $63.3125M
    fieldFailuresAvoided30d:          4_820,   // 30-day projection (Field Exposure summary)
  },

  assumptions: {
    defectReductionTarget: 0.50,
    warrantyNetSaving:     0.10,
    campaignPrevention:    0.25,
    rootCauseAutomation:   0.40,
    qualityEngineers:      70,
    loadedCostPerEngineer: 125_000,
  },

  /* -------------------- Product families + families list -------------------- */
  productFamilies: [
    'Packaged Rooftop Units',
    'Variable Refrigerant Flow Systems',
    'Commercial Chillers',
    'Infinity Residential Split Systems',
    'Performance Heat Pumps',
    'Air Handlers',
  ],

  failureCategories: [
    'Compressor Degradation',
    'Board Control Fault',
    'Refrigerant Leak Pattern',
    'Condenser Fan Wear',
    'Sensor Drift',
    'Expansion Valve Instability',
    'Blower Motor Wear',
    'Power / Contactor Instability',
  ],

  /* -------------------- Product populations -------------------- */
  populations: [
    {
      id: 'PP-102',
      family: 'Variable Refrigerant Flow Systems',
      models: 'VRF-72M / VRF-96M',
      productionPeriod: '2019–2022',
      unitsInMarket: 96_400,
      telemetryCoverage: 0.44,
      highRiskUnits: 4_110,
      warrantyClaimRate: 0.041,
      alarmAnomalyScore: 83,
      safetyRiskScore: 78,
      likelyFailureCategory: 'Board Control Fault',
      escalationProbability: 0.58,
      recommendedAction: 'Open investigation',
      escalationStatus: 'Escalated',
      trend: [46, 48, 52, 55, 61, 68, 74, 79, 83],
    },
    {
      id: 'PP-101',
      family: 'Packaged Rooftop Units',
      models: 'RTU-48P / RTU-60P',
      productionPeriod: '2018–2021',
      unitsInMarket: 182_000,
      telemetryCoverage: 0.38,
      highRiskUnits: 9_420,
      warrantyClaimRate: 0.048,
      alarmAnomalyScore: 79,
      safetyRiskScore: 74,
      likelyFailureCategory: 'Condenser Fan Wear',
      escalationProbability: 0.61,
      recommendedAction: 'Pre-stage parts + service guidance',
      escalationStatus: 'Escalated',
      trend: [44, 47, 51, 55, 60, 66, 71, 76, 79],
    },
    {
      id: 'PP-103',
      family: 'Commercial Chillers',
      models: 'CH-95Z / CH-120X',
      productionPeriod: '2017–2020',
      unitsInMarket: 41_800,
      telemetryCoverage: 0.51,
      highRiskUnits: 2_020,
      warrantyClaimRate: 0.053,
      alarmAnomalyScore: 76,
      safetyRiskScore: 72,
      likelyFailureCategory: 'Refrigerant Leak Pattern',
      escalationProbability: 0.55,
      recommendedAction: 'Leak-check protocol + warranty review',
      escalationStatus: 'Under review',
      trend: [48, 50, 54, 58, 62, 65, 69, 73, 76],
    },
    {
      id: 'PP-104',
      family: 'Infinity Residential Split Systems',
      models: 'INF-24A / INF-36A',
      productionPeriod: '2020–2023',
      unitsInMarket: 264_000,
      telemetryCoverage: 0.29,
      highRiskUnits: 7_980,
      warrantyClaimRate: 0.026,
      alarmAnomalyScore: 62,
      safetyRiskScore: 49,
      likelyFailureCategory: 'Sensor Drift',
      escalationProbability: 0.38,
      recommendedAction: 'Continue monitoring + software review',
      escalationStatus: 'Monitoring',
      trend: [55, 56, 58, 59, 60, 61, 61, 62, 62],
    },
    {
      id: 'PP-105',
      family: 'Performance Heat Pumps',
      models: 'HP-36-SEER2 / HP-48-SEER2',
      productionPeriod: '2019–2023',
      unitsInMarket: 211_500,
      telemetryCoverage: 0.31,
      highRiskUnits: 6_340,
      warrantyClaimRate: 0.032,
      alarmAnomalyScore: 68,
      safetyRiskScore: 56,
      likelyFailureCategory: 'Power / Contactor Instability',
      escalationProbability: 0.42,
      recommendedAction: 'Dealer guidance + parts stocking',
      escalationStatus: 'Monitoring',
      trend: [52, 54, 56, 58, 60, 63, 65, 67, 68],
    },
    {
      id: 'PP-106',
      family: 'Air Handlers',
      models: 'AHU-22C / AHU-30C',
      productionPeriod: '2018–2022',
      unitsInMarket: 133_700,
      telemetryCoverage: 0.35,
      highRiskUnits: 3_860,
      warrantyClaimRate: 0.029,
      alarmAnomalyScore: 58,
      safetyRiskScore: 45,
      likelyFailureCategory: 'Blower Motor Wear',
      escalationProbability: 0.34,
      recommendedAction: 'Continue monitoring',
      escalationStatus: 'Monitoring',
      trend: [50, 51, 52, 54, 55, 56, 57, 58, 58],
    },
  ],

  /* -------------------- Regions -------------------- */
  regions: [
    { id: 'R-201', name: 'Southern California',    unitsMonitored: 148_200, highRiskUnits: 6_840, claimDensity: 'High',   dealerSignalQuality: 'Medium', priority: 1 },
    { id: 'R-202', name: 'Texas Gulf / DFW',       unitsMonitored: 173_900, highRiskUnits: 7_120, claimDensity: 'High',   dealerSignalQuality: 'Medium', priority: 2 },
    { id: 'R-203', name: 'Southeast',              unitsMonitored: 160_400, highRiskUnits: 6_310, claimDensity: 'Medium', dealerSignalQuality: 'Medium', priority: 3 },
    { id: 'R-204', name: 'Northeast Corridor',     unitsMonitored: 121_600, highRiskUnits: 4_980, claimDensity: 'High',   dealerSignalQuality: 'High',   priority: 4 },
    { id: 'R-205', name: 'Midwest',                unitsMonitored: 110_800, highRiskUnits: 3_760, claimDensity: 'Medium', dealerSignalQuality: 'Medium', priority: 5 },
    { id: 'R-206', name: 'Southwest',              unitsMonitored:  94_500, highRiskUnits: 3_210, claimDensity: 'Medium', dealerSignalQuality: 'Low',    priority: 6 },
  ],

  /* -------------------- Dealers -------------------- */
  dealers: [
    { id: 'DQ-301', name: 'Pacific HVAC Alliance',      region: 'Southern California',   unitsServed: 31_400, qualitySignalDensity: 76, escalatedEvents: 14, fieldIssueDensity: 'High',   actionPriority: 1 },
    { id: 'DQ-302', name: 'Lone Star Climate Services', region: 'Texas Gulf / DFW',      unitsServed: 28_600, qualitySignalDensity: 71, escalatedEvents: 12, fieldIssueDensity: 'High',   actionPriority: 2 },
    { id: 'DQ-303', name: 'SunState Field Solutions',   region: 'Southeast',             unitsServed: 26_800, qualitySignalDensity: 68, escalatedEvents: 11, fieldIssueDensity: 'Medium', actionPriority: 3 },
    { id: 'DQ-304', name: 'Northeast Mechanical Group', region: 'Northeast Corridor',    unitsServed: 24_500, qualitySignalDensity: 79, escalatedEvents:  9, fieldIssueDensity: 'Medium', actionPriority: 4 },
    { id: 'DQ-305', name: 'Great Lakes ServiceWorks',   region: 'Midwest',               unitsServed: 19_300, qualitySignalDensity: 63, escalatedEvents:  6, fieldIssueDensity: 'Low',    actionPriority: 5 },
    { id: 'DQ-306', name: 'Desert Air Network',         region: 'Southwest',             unitsServed: 17_600, qualitySignalDensity: 57, escalatedEvents:  5, fieldIssueDensity: 'Low',    actionPriority: 6 },
  ],

  /* -------------------- Alarm sequence patterns -------------------- */
  alarmPatterns: [
    {
      id: 'AP-402',
      sequence: 'Control reset loop → communication loss → emergency shutdown',
      productFamily: 'Variable Refrigerant Flow Systems',
      modelGroup: 'VRF-72M / VRF-96M',
      frequency: 96,
      avgTimeToFailureDays: 17,
      linkedFailureCategory: 'Board Control Fault',
      confidence: 0.91,
      trend: 'Rising',
      regions: ['Southern California', 'Southeast'],
      severity: 'Critical',
      hero: true,
    },
    {
      id: 'AP-401',
      sequence: 'High discharge temp → fan current fluctuation → cooling degradation',
      productFamily: 'Packaged Rooftop Units',
      modelGroup: 'RTU-48P / RTU-60P',
      frequency: 184,
      avgTimeToFailureDays: 21,
      linkedFailureCategory: 'Condenser Fan Wear',
      confidence: 0.87,
      trend: 'Rising',
      regions: ['Texas Gulf / DFW', 'Southwest', 'Southern California'],
      severity: 'High',
    },
    {
      id: 'AP-403',
      sequence: 'Pressure imbalance → efficiency drop → repeated service event',
      productFamily: 'Commercial Chillers',
      modelGroup: 'CH-95Z / CH-120X',
      frequency: 61,
      avgTimeToFailureDays: 25,
      linkedFailureCategory: 'Refrigerant Leak Pattern',
      confidence: 0.82,
      trend: 'Rising',
      regions: ['Northeast Corridor', 'Southwest'],
      severity: 'High',
    },
    {
      id: 'AP-404',
      sequence: 'Sensor deviation → false operating range → performance complaint',
      productFamily: 'Infinity Residential Split Systems',
      modelGroup: 'INF-24A / INF-36A',
      frequency: 212,
      avgTimeToFailureDays: 34,
      linkedFailureCategory: 'Sensor Drift',
      confidence: 0.74,
      trend: 'Stable',
      regions: ['Midwest', 'Southeast'],
      severity: 'Medium',
    },
    {
      id: 'AP-405',
      sequence: 'Voltage irregularity → relay wear → restart issue',
      productFamily: 'Performance Heat Pumps',
      modelGroup: 'HP-36-SEER2 / HP-48-SEER2',
      frequency: 145,
      avgTimeToFailureDays: 28,
      linkedFailureCategory: 'Power / Contactor Instability',
      confidence: 0.77,
      trend: 'Rising',
      regions: ['Texas Gulf / DFW', 'Southwest'],
      severity: 'Medium',
    },
  ],

  /* -------------------- Failure category ranking -------------------- */
  failureCategoryRanking: [
    { category: 'Board Control Fault',           families: ['VRF Systems'],             unitsImpacted: 4_110, severity: 'High',   engineeringPriority: 1, trend: 'Rising' },
    { category: 'Condenser Fan Wear',            families: ['Packaged Rooftop Units'],  unitsImpacted: 9_420, severity: 'High',   engineeringPriority: 2, trend: 'Rising' },
    { category: 'Refrigerant Leak Pattern',      families: ['Commercial Chillers'],     unitsImpacted: 2_020, severity: 'High',   engineeringPriority: 3, trend: 'Rising' },
    { category: 'Sensor Drift',                  families: ['Infinity Split Systems'],  unitsImpacted: 7_980, severity: 'Medium', engineeringPriority: 4, trend: 'Stable' },
    { category: 'Power / Contactor Instability', families: ['Performance Heat Pumps'],  unitsImpacted: 6_340, severity: 'Medium', engineeringPriority: 5, trend: 'Rising' },
    { category: 'Blower Motor Wear',             families: ['Air Handlers'],            unitsImpacted: 3_860, severity: 'Medium', engineeringPriority: 6, trend: 'Stable' },
  ],

  /* -------------------- RCA cases -------------------- */
  rcaCases: [
    {
      id: 'RCA-501',
      title: 'VRF Control Board Reset Escalation',
      productFamily: 'Variable Refrigerant Flow Systems',
      likelyFailureCategory: 'Board Control Fault',
      severity: 'Critical',
      firstDetected: '2026-02-28',
      confidence: 0.91,
      unitsImpacted: 1_140,
      warrantyExposureAtRisk: 8_600_000,
      status: 'Open',
      hero: true,
      drivers: [
        { driver: 'Control board revision CB-7.3',      correlation: 0.82, evidenceType: 'Parts / configuration',     confidence: 0.89, investigate: 'Yes' },
        { driver: 'Firmware revision 3.8.14',           correlation: 0.78, evidenceType: 'Product software mapping',  confidence: 0.84, investigate: 'Yes' },
        { driver: 'High ambient operating profile',     correlation: 0.63, evidenceType: 'Telemetry',                 confidence: 0.71, investigate: 'Yes' },
        { driver: 'Dealer reset frequency above baseline', correlation: 0.51, evidenceType: 'Service records',        confidence: 0.66, investigate: 'Yes' },
        { driver: 'Supplier lot S-1184',                correlation: 0.69, evidenceType: 'Parts traceability',        confidence: 0.79, investigate: 'Yes' },
        { driver: 'Install window Q3 2021',             correlation: 0.47, evidenceType: 'Cohort analysis',           confidence: 0.61, investigate: 'Optional' },
      ],
      timeline: [
        { date: '2025-10-12', type: 'Alarm anomaly',      detail: 'reset loop pattern begins appearing above baseline' },
        { date: '2025-11-08', type: 'Warranty event',     detail: 'control-related claim rate rises in one VRF cohort' },
        { date: '2025-12-03', type: 'Service note',       detail: 'dealer notes repeated communication loss after reset' },
        { date: '2026-01-14', type: 'Parts signal',       detail: 'board replacements begin clustering in same model group' },
        { date: '2026-02-28', type: 'Quality escalation', detail: 'issue promoted to active investigation' },
        { date: '2026-04-11', type: 'Correlation update', detail: 'firmware + board revision link confidence exceeds threshold' },
      ],
      affected: {
        families: ['Variable Refrigerant Flow Systems'],
        serialCohorts: ['VRF-96M Q3 2021', 'VRF-72M Q3 2021'],
        regions: ['Southern California', 'Southeast'],
        dealers: ['Pacific HVAC Alliance', 'SunState Field Solutions'],
        failureGrowthRate30d: 0.18,
      },
    },
    {
      id: 'RCA-502',
      title: 'RTU Fan Wear Pattern in Southern and Western Regions',
      productFamily: 'Packaged Rooftop Units',
      likelyFailureCategory: 'Condenser Fan Wear',
      severity: 'High',
      firstDetected: '2026-03-10',
      confidence: 0.87,
      unitsImpacted: 2_340,
      warrantyExposureAtRisk: 10_200_000,
      status: 'Open',
    },
    {
      id: 'RCA-503',
      title: 'Chiller Refrigerant Loss Correlation',
      productFamily: 'Commercial Chillers',
      likelyFailureCategory: 'Refrigerant Leak Pattern',
      severity: 'High',
      firstDetected: '2026-03-21',
      confidence: 0.82,
      unitsImpacted: 620,
      warrantyExposureAtRisk: 5_400_000,
      status: 'Investigating',
    },
    {
      id: 'RCA-504',
      title: 'Split System Sensor Drift Misclassification',
      productFamily: 'Infinity Residential Split Systems',
      likelyFailureCategory: 'Sensor Drift',
      severity: 'Medium',
      firstDetected: '2026-04-02',
      confidence: 0.74,
      unitsImpacted: 1_880,
      warrantyExposureAtRisk: 3_100_000,
      status: 'Monitoring',
    },
  ],

  /* -------------------- Alerts -------------------- */
  alerts: [
    {
      id: 'AL-801',
      type: 'Emerging quality pattern detected',
      cohort: 'VRF-72M / VRF-96M Q3 2021 cohort',
      region: 'Southeast + Southern California',
      severity: 'Critical',
      confidence: 0.91,
      owner: 'VP Product Quality',
      created: '2026-04-18 07:40',
      status: 'Open',
      nextAction: 'open RCA case',
      hero: true,
      evidence: 'Alarm pattern AP-402 firing 17d ahead of failure. 1,140 impacted units. Board revision CB-7.3 + firmware 3.8.14 correlation above threshold.',
      linkedRCA: 'RCA-501',
    },
    {
      id: 'AL-802',
      type: 'Campaign prevention candidate',
      cohort: 'RTU-48P / RTU-60P 2019–2020 batch',
      region: 'Texas + Southwest',
      severity: 'High',
      confidence: 0.87,
      owner: 'Field Quality Lead',
      created: '2026-04-18 08:05',
      status: 'Open',
      nextAction: 'issue targeted field guidance',
      evidence: 'Fan-wear pattern AP-401 concentrated in two regions. Claim density 2.4× baseline across 2,340 units.',
    },
    {
      id: 'AL-803',
      type: 'Rapid increase in warranty claims',
      cohort: 'CH-95Z serial range 44K–52K',
      region: 'Northeast Corridor',
      severity: 'High',
      confidence: 0.82,
      owner: 'Warranty Ops',
      created: '2026-04-18 08:34',
      status: 'Open',
      nextAction: 'review affected cohort',
      evidence: 'Refrigerant-loss claims up 38% over trailing 30 days in serial range 44K–52K.',
    },
    {
      id: 'AL-804',
      type: 'Elevated safety risk cohort',
      cohort: 'VRF-96M board rev CB-7.3',
      region: 'Southern California',
      severity: 'Critical',
      confidence: 0.89,
      owner: 'Engineering Director',
      created: '2026-04-18 08:58',
      status: 'Open',
      nextAction: 'expand monitored population',
      evidence: 'Safety risk score 78 on CB-7.3 board revision across Q3 2021 install window. Correlated with high-ambient duty profile.',
    },
    {
      id: 'AL-805',
      type: 'Dealer field issue cluster',
      cohort: 'Pacific HVAC Alliance',
      region: 'Southern California',
      severity: 'Medium',
      confidence: 0.76,
      owner: 'Regional Quality Manager',
      created: '2026-04-18 09:12',
      status: 'Open',
      nextAction: 'review field issue density',
      evidence: '14 escalated events in trailing 60d. Issue density 1.8× regional baseline.',
    },
    {
      id: 'AL-806',
      type: 'Alarm sequence associated with known failure mode',
      cohort: 'AP-401 RTU fan wear pattern',
      region: 'Multi-region',
      severity: 'High',
      confidence: 0.87,
      owner: 'Product Reliability Lead',
      created: '2026-04-18 09:41',
      status: 'Open',
      nextAction: 'validate service bulletin threshold',
      evidence: 'AP-401 firing in 3 regions. Time-to-failure 21d — inside SB-candidate window.',
    },
  ],

  /* -------------------- Field exposure queue -------------------- */
  fieldQueue: [
    {
      population: 'VRF-72M / VRF-96M control board cohort',
      regions: ['Southeast', 'Southern California'],
      highRiskUnits: 1_140,
      issueTrend: 'Rising',
      recommendedAction: 'targeted dealer inspection + firmware review',
      escalationLevel: 'Critical',
      owner: 'Engineering',
    },
    {
      population: 'RTU-48P / RTU-60P fan wear cohort',
      regions: ['Texas Gulf / DFW', 'Southwest', 'Southern California'],
      highRiskUnits: 2_340,
      issueTrend: 'Rising',
      recommendedAction: 'pre-stage parts + service guidance',
      escalationLevel: 'High',
      owner: 'Service Ops',
    },
    {
      population: 'CH-95Z / CH-120X refrigerant risk cohort',
      regions: ['Northeast Corridor', 'Southwest'],
      highRiskUnits: 620,
      issueTrend: 'Rising',
      recommendedAction: 'leak-check protocol + warranty review',
      escalationLevel: 'High',
      owner: 'Field Quality',
    },
    {
      population: 'INF-24A / INF-36A sensor cohort',
      regions: ['Midwest', 'Southeast'],
      highRiskUnits: 1_880,
      issueTrend: 'Stable',
      recommendedAction: 'monitoring + software logic review',
      escalationLevel: 'Medium',
      owner: 'Product Support',
    },
    {
      population: 'HP-36-SEER2 / HP-48-SEER2 contactor cohort',
      regions: ['Texas Gulf / DFW', 'Southwest'],
      highRiskUnits: 1_420,
      issueTrend: 'Rising',
      recommendedAction: 'dealer guidance + relay stocking',
      escalationLevel: 'Medium',
      owner: 'Service Ops',
    },
  ],

  campaignPreventionCandidates: [
    { cohort: 'VRF-96M board revision cohort',     exposure: 8_600_000, units: 1_140, likelihood: 'High'   },
    { cohort: 'RTU-60P condenser fan wear batch',  exposure: 6_900_000, units: 2_340, likelihood: 'High'   },
    { cohort: 'CH-120X refrigerant loss cluster',  exposure: 4_100_000, units:   620, likelihood: 'Medium' },
  ],

  /* -------------------- Data foundation -------------------- */
  sourceSystems: [
    { type: 'Warranty Claims',                 coverage: 'Enterprise-wide', refresh: 'Daily',               notes: 'primary financial quality signal' },
    { type: 'Product Master / Configuration',  coverage: 'Enterprise-wide', refresh: 'Weekly',              notes: 'product hierarchy and component mapping' },
    { type: 'Alarm History / Telemetry',       coverage: 'Partial',         refresh: 'Daily / near-real-time', notes: '30% API-enabled, significant coverage gaps' },
    { type: 'Dealer / Service Records',        coverage: 'Broad',           refresh: 'Daily',               notes: 'operational field intelligence' },
    { type: 'Parts Performance Data',          coverage: 'Broad',           refresh: 'Weekly',              notes: 'component reliability signal' },
    { type: 'Maintenance History',             coverage: 'Broad',           refresh: 'Daily',               notes: 'historical repair context' },
    { type: 'Dealer Notes / Comments',         coverage: 'Partial',         refresh: 'Daily',               notes: 'semi-structured signal extraction' },
  ],

  telemetryCoverage: {
    apiEnabled: 0.30,
    nonApiEnabled: 0.70,
    manualRetrieval: 'High',
    delayedSignalRisk: 'Material',
  },

  signalExample: {
    rawSignals: [
      { label: 'Alarm sequence', value: 'control reset loop + communication drop' },
      { label: 'Warranty claim', value: 'repeated board replacement in same model cohort' },
      { label: 'Dealer note',    value: '"unit restarts temporarily, issue returns under load"' },
      { label: 'Parts trend',    value: 'board revision CB-7.3 replacements above baseline' },
    ],
    normalized: {
      productFamily: 'Variable Refrigerant Flow Systems',
      modelGroup: 'VRF-96M',
      cohort: 'Q3 2021 production',
      likelyFailureCategory: 'Board Control Fault',
      safetyRiskScore: 78,
      escalationProbability: 0.58,
      recommendedAction: 'Open active investigation',
    },
  },

  /* -------------------- Region cluster concentration -------------------- */
  regionClusters: [
    { region: 'Southern California',   dealer: 'Pacific HVAC Alliance',      family: 'VRF Systems',              issueDensity: 84, patternConcentration: 79, action: 'expand monitored population' },
    { region: 'Texas Gulf / DFW',      dealer: 'Lone Star Climate Services', family: 'Packaged Rooftop Units',   issueDensity: 78, patternConcentration: 74, action: 'field guidance + parts review' },
    { region: 'Southeast',             dealer: 'SunState Field Solutions',   family: 'VRF Systems',              issueDensity: 72, patternConcentration: 76, action: 'targeted inspection program' },
    { region: 'Northeast Corridor',    dealer: 'Northeast Mechanical Group', family: 'Commercial Chillers',      issueDensity: 69, patternConcentration: 66, action: 'warranty + leak review' },
    { region: 'Midwest',               dealer: 'Great Lakes ServiceWorks',   family: 'Infinity Split Systems',   issueDensity: 58, patternConcentration: 54, action: 'continue monitoring' },
  ],

  /* -------------------- Component correlation (for patterns page) -------------------- */
  componentCorrelation: [
    { component: 'Control Board CB-7.3',  alarm: 'Reset loop',           claims: 312, serviceEvents: 198, environment: 'High ambient', strength: 0.88 },
    { component: 'Condenser Fan Motor',   alarm: 'Fan current drift',    claims: 421, serviceEvents: 267, environment: 'High duty',    strength: 0.81 },
    { component: 'Refrigerant Valve',     alarm: 'Pressure imbalance',   claims: 189, serviceEvents: 124, environment: 'Coastal',      strength: 0.76 },
    { component: 'Thermistor Sensor',     alarm: 'Sensor deviation',     claims: 298, serviceEvents: 145, environment: 'Mixed',        strength: 0.68 },
    { component: 'Contactor Relay',       alarm: 'Voltage irregularity', claims: 244, serviceEvents: 163, environment: 'Hot climate',  strength: 0.72 },
  ],

  /* -------------------- Trend series for executive page -------------------- */
  warrantyFunnel: [
    { label: 'Annual Warranty Pool',      value: 435,      color: '#1a3d7a' },
    { label: 'Field Escape Exposure',     value: 65.25,    color: '#b45309' },
    { label: 'Year 1 Protected',          value: 63.3125,  color: '#047857' },
  ],

  emergingIssueTrend30d: [
    { day: 'd-30', score: 54 },
    { day: 'd-27', score: 57 },
    { day: 'd-24', score: 59 },
    { day: 'd-21', score: 62 },
    { day: 'd-18', score: 66 },
    { day: 'd-15', score: 71 },
    { day: 'd-12', score: 74 },
    { day:  'd-9', score: 77 },
    { day:  'd-6', score: 82 },
    { day:  'd-3', score: 86 },
    { day:   'd0', score: 91 },
  ],

  highRiskByFamily: [
    { family: 'VRF Systems',          highRisk: 4110 },
    { family: 'Commercial Chillers',  highRisk: 2020 },
    { family: 'RTU',                  highRisk: 9420 },
    { family: 'Split Systems',        highRisk: 7980 },
    { family: 'Heat Pumps',           highRisk: 6340 },
    { family: 'Air Handlers',         highRisk: 3860 },
  ],

  apiCoverageByFamily: [
    { family: 'VRF Systems',          api: 44, manual: 56 },
    { family: 'Commercial Chillers',  api: 51, manual: 49 },
    { family: 'RTU',                  api: 38, manual: 62 },
    { family: 'Split Systems',        api: 29, manual: 71 },
    { family: 'Heat Pumps',           api: 31, manual: 69 },
    { family: 'Air Handlers',         api: 35, manual: 65 },
  ],
};

/* helpers */
window.SQ_HELPERS = {
  fmtUSD: (n, { short = true } = {}) => {
    if (n == null) return '—';
    const abs = Math.abs(n);
    if (short) {
      if (abs >= 1e9)  return `$${(n / 1e9).toFixed(2)}B`;
      if (abs >= 1e6)  return `$${(n / 1e6).toFixed(abs >= 1e7 ? 1 : 2)}M`;
      if (abs >= 1e3)  return `$${(n / 1e3).toFixed(1)}K`;
    }
    return `$${n.toLocaleString()}`;
  },
  fmtNum: (n) => (n == null ? '—' : n.toLocaleString()),
  fmtPct: (n, digits = 0) => (n == null ? '—' : `${(n * 100).toFixed(digits)}%`),
  severityToTone: (sev) => ({
    Critical: { bg: 'bg-red-50',    text: 'text-red-700',    ring: 'ring-red-200',    dot: 'bg-red-500'    },
    High:     { bg: 'bg-amber-50',  text: 'text-amber-800',  ring: 'ring-amber-200',  dot: 'bg-amber-500'  },
    Medium:   { bg: 'bg-yellow-50', text: 'text-yellow-800', ring: 'ring-yellow-200', dot: 'bg-yellow-500' },
    Low:      { bg: 'bg-emerald-50',text: 'text-emerald-800',ring: 'ring-emerald-200',dot: 'bg-emerald-500'},
  }[sev] || { bg: 'bg-slate-50', text: 'text-slate-700', ring: 'ring-slate-200', dot: 'bg-slate-400' }),
};
