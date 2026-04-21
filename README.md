# Carrier · Product Safety & Quality Intelligence

Art-of-the-possible prototype for Carrier. Detects emerging product risk earlier by unifying warranty, product, dealer, alarm, parts, and service data into a single quality intelligence layer.

## What it shows

- **Executive Risk Command Center** — $63.31M Year-1 value story, warranty exposure funnel, product risk heatmap
- **Data Foundation** — how fragmented quality signals connect into one intelligence model
- **Product Populations** — which product/model/serial cohorts are elevating risk
- **Failure Patterns** — alarm sequences correlated to likely failure categories
- **Root Cause Investigation** — RCA-501: VRF control board reset escalation, 91% confidence
- **Field Exposure & Action** — monitored populations, escalation queue, campaign prevention candidates
- **Alerts** — prioritized operational alerts (AL-801 critical, VRF Q3 2021 cohort)

## Stack

Static HTML + React 18 via CDN + Recharts + Tailwind + Babel standalone. No build step. Split-file layout: one file per screen under `js/`.

## Local preview

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

## Deploy

Managed via Cowork's `project-ship` skill — double-click `ship.command` after editing.
