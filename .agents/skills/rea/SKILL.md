---
name: rea
description: Reason-Execute-Audit engineering methodology.
---
# REA — Reason-Execute-Audit Engineering

## Protocol
1. **Reason**: Read source files before modifying. State constraints and acceptance criteria upfront.
2. **Execute**: Make surgical, batched edits. Avoid collateral modifications or diff churn.
3. **Audit**: Immediately run verification commands and verify test diffs before completion.
