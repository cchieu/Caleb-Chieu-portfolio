# Security Specification for Portfolio Database Content Management

This document defines the zero-trust security architecture, access control policies, and validation gates for Content Management System (CMS) data in Caleb Chieu's branding and UI/UX portfolio.

## 1. Data Invariants

1. **Global Read Access**: Any public site visitor can read (get or list) standard collections (`projects` and `services`) to display the portfolio content smoothly.
2. **Strict Write Restriction**: Only authenticated administrators with the explicitly verified email `calebchieu@gmail.com` are permitted to perform write operations (create, update, delete).
3. **Verified Email Mandate**: To avoid visual identity counterfeiting/spoofing, any writing accounts must be verified (`email_verified == true`).
4. **ID Hardening**: All document-level IDs (`projectId`, `serviceId`) must be valid alphanumeric chars, and restricted to bounded length sizes (<= 128 characters) to prevent database resource exhaustion / Denial of Wallet attacks.
5. **No Blind Updates**: Any updates must specify structural edits where critical metadata properties (`id`, `client`) remain untainted and immutable.

---

## 2. The "Dirty Dozen" Payloads (Rogue CMS Actions)

The security rules are designed to block the following malicious scenarios:

1. **Unauthenticated Project Creation**: Guest tries to write a rogue portfolio project.
2. **Identity Spoofing**: Authenticated user with email `attacker@danger.com` attempts to write design updates.
3. **ID Poisoning / Denial of Wallet**: An attacker tries to write with a 2MB binary key or junk character document ID.
4. **Shadow Update Gate (Ghost Fields)**: Admin tries to update project details with malicious injected parameters not inside schema blueprints.
5. **Self-Assigned Admin Escalation**: Attacker attempts to update user properties or metadata to override security blocks.
6. **Immutable Field Tainting**: Modification of created logs or parent ID attributes during active sessions.
7. **Type Violations**: Attacker submits an array as a project title, or a boolean as client details.
8. **Value Poisoning**: Attacker submits an excessive length title (e.g. 500KB text) to blow up read cost and database load.
9. **Email Spoofing (Unverified accounts)**: User logs in with `calebchieu@gmail.com` but with `email_verified == false` seeking write credentials.
10. **Array Overflooding**: Uploading unbounded tag quantities (e.g. 10,000 tags) to crash the UI layout.
11. **Client Delegation Leak**: Blind allow listing on subprojects allowing read queries to pull unmapped customer logs.
12. **Out of Range Timeline Sorts**: Injecting negative sorted sequence orders into service slots (e.g., negative integers for sort rows).

---

## 3. Test Runner Rules Outline

A local sandbox environment utilizing firestore rules tester must reject each "Dirty Dozen" attempt.
To proceed safely, we enforce zero permissions by default and construct our whitelist rules directly inside `firestore.rules`.
