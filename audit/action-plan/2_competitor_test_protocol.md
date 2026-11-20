# Competitor hands-on test protocol

**Purpose:** fill PRD §0.4 with real, dated results instead of "?" or "claimed".

**Who:** one product person plus one tester who acts as counter staff. **Time:** about 2 days per product. **Budget:** buy the cheapest paid plan that unlocks multi-user, then cancel within the refund window where one exists.

**Products:**
1. Vyapar
2. myBillBook
3. TallyPrime (rental, 1 month)
4. BUSY
5. One niche textile package from IndiaMART

**Setup (same for every product):** use two Android phones and one PC, with the same test data:
- 20 parties, 3 of them over their credit limit
- 30 items, 10 sold by the metre from rolls
- 2 godowns

## Test script

Record **pass / partial / fail**, the time taken and a screenshot for every step.

| # | Test | What "pass" means for our wedge |
|---|---|---|
| 1 | Sign up and make the first bill | Under 15 min; the time is recorded |
| 2 | Import parties and items from Excel | No retyping; errors are shown before import |
| 3 | **Phone A and Phone B both offline; each makes 5 bills; reconnect** | All 10 bills arrive, with no duplicate or clashing numbers |
| 4 | Bill a party that is over its credit limit | Billing is blocked, or needs approval, and the approval is logged |
| 5 | Sell 12.5 m from a 40 m roll, then check the roll's stock | Shows 27.5 m on the same lot |
| 6 | Delivery challan → invoice later | Stock moves once, not twice |
| 7 | Job-work: send a lot to a processor and receive it back | Possible without workarounds |
| 8 | Bluetooth 80 mm printer, Gujarati item names | Prints correctly in Gujarati script |
| 9 | Export a month and import it into TallyPrime | No manual fixes |
| 10 | Staff deletes or edits a bill | The owner can see who did it and when |
| 11 | Switch the app language to Gujarati | All counter screens are in Gujarati, not only receipts |
| 12 | Total yearly price for 1 owner, 4 staff phones and 1 PC | Write the ₹ figure, with the plan name and date |
| 13 | Support: ask one question by WhatsApp or phone | Reply time and whether Gujarati is offered |

## How to use the results
- Update PRD §0.4: change "claimed" to "yes" or "no", with the date tested.
- Update audit §13 and §20: competitor scores can then be marked verified.
- If a competitor passes tests 3, 4 **and** 11, our positioning in PRD §0.1 needs rethinking before we build.
