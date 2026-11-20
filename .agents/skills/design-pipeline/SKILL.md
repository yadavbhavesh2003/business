---
name: design-pipeline
description: 194-screen canvas build & export runbook.
---
# Design Pipeline — Canvas & Prototype Runbook

## Protocol
1. Templated screens reside in design/pages_*.py.
2. Bespoke screens reside in design/bespoke/.
3. Rebuild command: python3 gen.py out/project && cp bespoke/*.dc.html out/project/ && python3 layout.py out/project && python3 export.py
4. Verification: python3 verify_pipeline.py ensures 194 boards and 0 broken links.
