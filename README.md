# BondOps — Corporate Actions for Tokenized Bonds

> A Solana-based prototype for preparing, announcing, and distributing coupon and redemption payments to tokenized bond holders.

Built for the **Superteam Kazakhstan × KASE: Corporate Actions on Blockchain** side track.

**Live demo:** [Open BondOps on Vercel](https://solanaproject-pink.vercel.app/)

---

## Problem and Solution

Corporate actions such as coupon payments and bond redemption require issuers and administrators to identify eligible holders, calculate entitlements, distribute funds, and reconcile completed payments. When these steps are handled across spreadsheets and separate payment workflows, it can be difficult to give every participant a clear, auditable status.

**BondOps** models this workflow as a verifiable on-chain event. An administrator imports a holder snapshot, reviews the calculated entitlements, funds a payment reserve, and publishes the action. Eligible investors connect a wallet and claim their allocation. The prototype is designed for Solana Devnet and uses test assets only.
