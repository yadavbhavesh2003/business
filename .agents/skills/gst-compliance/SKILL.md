---
name: gst-compliance
description: Indian GST calculations, tax splits, HSN codes, and Section 170 rounding.
---
# GST Compliance — Section 170 CGST & Tax Math

## Legal Invariants
1. Intra-state sales (Gujarat 24): 50/50 equal split into CGST + SGST.
2. Inter-state sales: 100% IGST.
3. Section 170 CGST Act: Invoice totals rounded to nearest rupee (< 0.50 down, >= 0.50 up).
4. Table 4 (B2B), Table 8 (B2C Large/Small), Table 12 (HSN summary) matching.
