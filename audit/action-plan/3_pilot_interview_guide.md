# Pilot interview guide (textile & wholesale traders, Gujarat)

**Goal:** settle the open questions that only customers can answer, and collect **5 paid pilot deposits** (PRD §0.6: kill or rethink if fewer than 3).

**Length:** 30–40 minutes, at the shop, in Gujarati. **Who:** the owner, plus 5 minutes with one counter staff member.

**Show:** the prototype on a phone, through the **MVP screens only**. Start with Counter home (Gujarati), then New bill, then Manager PIN, then Bill saved. Do not show the AI, voice or OCR screens. We are testing whether the core alone is worth paying for.

## A. Their business today (do not pitch yet)
1. How many people make bills? On phones, a PC or paper?
2. What software do you use now? What does it cost per year? What annoys you about it?
3. How much money is owed to you right now? How much of it is older than 90 days?
4. In the last month, did a customer take goods beyond what you wanted to give them on credit? Who allowed it?
5. When the internet is down, what happens at the counter?
6. Do you send cloth to processors (job work)? How many challans a week? How do you track them? *(This decides UOS-164: job-work in the MVP.)*
7. Has stock ever said a roll was there when it wasn't? What did it cost you?
8. Who is your CA? Do they use Tally? What do they ask you for every month?

## B. Show the prototype
9. Let the counter staff make the bill on the phone. Note where they hesitate.
10. Show the over-limit approval. Ask: "Would this have stopped the problem in question 4?"
11. Show the Gujarati screen. Ask: "Would your staff use it in Gujarati or English?"
12. Ask: "Should staff be able to sell a roll the system says is finished?" *(This decides ADR-010.)*

## C. Price (Van Westendorp, PRD §0.5)
For their number of staff, ask:
13. At what yearly price is this **too cheap** to trust?
14. At what price is it a **bargain**?
15. At what price is it **getting expensive**, but you would still consider it?
16. At what price is it **too expensive**?

## D. Commitment (the real test)
17. "We start pilots in [month]: 3 months for ₹2,000, refundable in 30 days if it doesn't work for you. Can I take the deposit today?"
   - **Yes, with deposit:** a real pilot commitment.
   - **"Call me later":** counts as no.
18. "Can you introduce us to your CA?" *(This tests the CA channel.)*

## Record after each interview
| Field | Value |
|---|---|
| Shop, city, staff count, turnover band | |
| Current software + yearly cost | |
| Overdue > 90 days (₹) | |
| Job-work challans per week | |
| Negative stock: allow / block | |
| Van Westendorp: 4 prices | |
| Deposit paid (Y/N, ₹) | |
| CA introduction (Y/N) | |
| Top 3 quotes, in their words | |

After 10 interviews:
- Update PRD §0.1 (the wedge), UOS-164 (job-work) and ADR-010 (negative stock).
- Update the pricing in PRD §0.5.
