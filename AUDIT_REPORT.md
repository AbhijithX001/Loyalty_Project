# 8. DEMO DATA AUDIT

Audit date: 2026-10-20. Source: a fresh evaluation of `SEED_DATA` from `js/mock-data.js`.

## A. Counts

- Customers: 8.
- Menu items: 12 total — Meals 5, Snacks 3, Drinks 4.
- Rewards: 5.
- Bills: 25.
- Ledger entries: earned 25, adjust 1, held 1, referral 1, returned 0.
- Redemptions: pending 1, approved 1, rejected 1, fulfilled 1.
- Referrals: pending 2, rewarded 1.
- Bills: oldest 2026-09-02, newest 2026-10-20.
- Bill totals: minimum ₹60, maximum ₹540, average ₹206.40.
- Bills per month: September 2026 — 15; October 2026 — 10.

## B. First-load view check

### Customer

- Home: populated and meaningful. Shows a 366-point balance, a six-point spending chart, and four recent bills. The chart has zero values for four of the six months because seeded bills exist only in September and October.
- Insights: populated but sparse. Shows six bars, three stat cards, and a comparison row; four bars are zero.
- Bills: populated. Customer 9000000001 has four paid bills.
- Points history: populated. The customer has six ledger entries: four earned, one adjust, and one held.
- Redeem: populated. Shows five rewards and one pending request. Four rewards are affordable at 366 points.
- Refer: populated but small. Shows one pending referred friend.

### Seller

- Overview: populated. Shows eight customers, 25 bills, latest bills, and one pending redemption. The sales-today value is populated from the bill generated on 2026-10-20.
- Billing: populated. Shows 12 menu items across Meals, Snacks, and Drinks.
- Customers: populated. Shows eight customers.
- Menu: populated. Shows 12 menu items.
- Loyalty: populated. Shows the 10% rule, 50 referral points, and five rewards.
- Redemptions — Pending: populated with 1 request.
- Redemptions — Approved: populated with 1 request.
- Redemptions — Rejected: populated with 1 request.
- Redemptions — Fulfilled: populated with 1 request.
- Referrals: populated with 3 referrals, 1 converted, and 50 points given.
- Reports: populated for the 30-day range with 16 bills. The sales chart has September and October activity and four zero earlier-month bars. Top items contain 4 sold item names, not 5, because only four distinct menu items occur in the seeded bills. Top customers contain 5 entries. Points, customer, and referral summaries are populated.

## C. Realism

- Dates are generated relative to today by `daysAgo()`. They are not hard-coded; the newest seeded bill is always generated for the current date.
- Customer names look realistic for a Kerala restaurant: Rahul Menon, Priya Nair, Arjun Kumar, Meera Joseph, Nikhil Das, Anjali Varma, Vivek Pillai, and Sara Thomas.
- Menu names and prices are restaurant-like: Kerala Meals ₹180, Fish Curry Meals ₹260, Chicken Biriyani ₹220, Parotta ₹25, Beef Roast ₹210, Pazhampori ₹60, Fresh Lime ₹70, Sulaimani Tea ₹35, and Mango Lassi ₹90.
- No seed names such as `Test User`, `Item 1`, or generic placeholder names were found.
- Bill totals are not fully realistic against the item lines. Examples: MB-1002 totals ₹85 for two Parottas at ₹25 each; MB-1004 totals ₹140 for one Sulaimani Tea at ₹35; MB-1008 totals ₹175 for two Sulaimani Teas at ₹35 each.
- Charts show date variation and different spend levels, but not a reliable weekend pattern or growth trend. The six-month charts are sparse because all 25 seeded bills fall in September and October.
- There is a mix of customer activity: Rahul Menon has 4 bills, Priya Nair has 4, Arjun Kumar has 4, Meera Joseph has 3, Nikhil Das has 3, Anjali Varma has 3, Vivek Pillai has 2, and Sara Thomas has 2. No customer is truly new in the seed because all joined dates are at least 26 days old.

## D. Consistency

- Customer balances equal the sum of each customer's ledger entries. Seed balances are: Rahul Menon 366, Priya Nair 25, Arjun Kumar 113, Meera Joseph 52, Nikhil Das 108, Anjali Varma 25, Vivek Pillai 63, and Sara Thomas 52.
- Bill totals equal the sum of their item lines for 7 of 25 bills. They do not match for 18 bills.
- Bill points match the current 10% points rule for all 25 bills. This is true even where the bill total does not match its item lines, because points are calculated from the stored bill total.
- Referrals match `referredBy` for 1 of 3 referrals. `referral_2` and `referral_3` have friends whose `referredBy` is null.
- Rewarded referral consistency fails: `referral_2` is rewarded but has no matching referral ledger entry. The only referral ledger entry points to `referral_1`, which is still pending.
- Redemption ledger consistency is incomplete. `redemption_1` has a held ledger entry of -120. The approved, rejected, and fulfilled seed redemptions have no corresponding held or returned ledger entries. Returned ledger entries total 0.

## E. Demo story

- Customer 9000000001 has a complete first-login story: 366 points, four bills, six history rows, one pending redemption, one pending referral, and four affordable rewards. No requested customer-story element is missing.
- Seller 9000000000 has immediate work: one pending redemption to approve, 25 recent bills, five rewards, and customer activity. The pending redemption is actionable.

## 10 biggest data gaps, ordered by demo impact

1. 18 of 25 bill totals do not equal their itemized line totals.
2. The rewarded referral has no matching referral ledger entry, while the only referral ledger entry belongs to a pending referral.
3. Two of three referral records do not match the referred customers' `referredBy` values.
4. Approved, rejected, and fulfilled redemptions lack matching held or returned ledger entries.
5. Four of six spending-chart months are zero, making the customer Insights chart sparse.
6. Reports contain only four distinct sold items, so the requested top-five-items view cannot show five items.
7. All seeded bills fall in only two months, limiting the reports' time-series story.
8. No seeded customer is new on first load; all joined dates are at least 26 days old.
9. The seeded bill totals use synthetic adjustments that are not explained by tax, service charge, or additional line items.
10. Seeded referral conversion is only 1 of 3, so the referral story has limited converted-history depth.
