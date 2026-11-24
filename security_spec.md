# Security Specification & Payload-First TDD (`MedExcel BD`)

## 1. Data Invariants
1. **Strict Ownership & PII Isolation**: `users/{userId}` and all subcollections (`topicStats`, `testAttempts`, `bookmarks`, `wrongAnswers`) may ONLY be read or written by the authenticated owner (`request.auth.uid == userId`) with verified email (`request.auth.token.email_verified == true` for writes), except verified Super Admins (`isSuperAdmin()`) who may inspect, manually create, or update governance metadata (`accountStatus`, `adminNote`, profile fields) on `/users/{userId}`.
2. **Identity Integrity**: Every document's `uid` or `userId` field must strictly match its path ID (and `request.auth.uid` for non-admin owner writes), and cannot be mutated after creation.
3. **Referential & Temporal Integrity**:
   - Subcollection documents (`topicStats`, `testAttempts`, `bookmarks`, `wrongAnswers`) require the parent `users/{userId}` document to exist.
   - All `createdAt`, `updatedAt`, `lastPracticedAt`, and `lastWrongAt` timestamps must equal `request.time`.
   - `createdAt` and `createdByUid` are immutable on update; `wrongAnswers` updates may only mutate `selectedOptionIndex`, `wrongCount`, and `lastWrongAt`.
4. **Super Admin Content Governance**:
   - `customInfographics`, `customVideos`, `customQuestions`, and `customWorksheets` can ONLY be created, updated, or deleted by verified Super Admins (`isSuperAdmin()`).
   - Non-admin reads and list queries are strictly restricted to `resource.data.status == 'published'` (drafts remain private to the Super Admin).
   - List queries never invoke `get()` or `exists()`; only `isBootstrappedAdmin()` (email + verified check) is permitted alongside `resource.data.status == 'published'` on `allow list`.
5. **Volumetric & Schema Guardrails**:
   - No ghost/shadow fields (`keys().hasAll(...) && keys().hasOnly(...)`).
   - All IDs match `^[a-zA-Z0-9_\-]+$` with max 128 chars (`80` for content IDs).
   - Arrays strictly bounded (`nodes <= 10`, `keyTakeawaysBn <= 8`, `boardPoints <= 10`, `options == 4`, `tasks <= 20`, `weakTopics <= 15`).
6. **Public Daily Leaderboard Isolation & Score Integrity**:
   - `/dailyLeaderboards/{dateKey}/entries/{userId}` contains ONLY public display metadata (`displayName`, `photoUrl`, `college`, `targetExam`) and daily performance counters (`questionsAttempted`, `correctCount`, `testsCompleted`, `bestNetScore`, `score`). Zero PII (`email`) is allowed.
   - Only the verified owner (`request.auth.uid == userId`) can create or update their own entry, `score` is strictly bounded against their reported `questionsAttempted`/`correctCount`/`testsCompleted`, and parent `/dailyLeaderboards/{dateKey}` must exist on creation.

## 2. The "Dirty Dozen" Attack Payloads (Expected: `PERMISSION_DENIED`)
1. Unauthenticated read of `/users/userA`.
2. Authenticated `userB` attempting to read `/users/userA` (PII leak).
3. `userA` creating `/users/userA` with `uid: "userB"` (Identity spoofing).
4. `userA` creating `/users/userA` with unverified email (`email_verified: false`).
5. `userA` creating `/users/userA` with ghost field `isAdmin: true` (Shadow field injection).
6. Non-admin `userB` creating or updating `/customQuestions/q_hack` (Privilege escalation).
7. Unverified user spoofing `email: "aayat6666@gmail.com"` with `email_verified: false` to write `/customInfographics/inf_1` (Email spoofing).
8. Non-admin querying `/customWorksheets` without `where('status', '==', 'published')` or attempting to `get` a `draft` worksheet (Draft exposure).
9. Super Admin writing `/customQuestions/q1` with `options` array length != 4 or `correctIndex: 5` (Schema corruption).
10. Super Admin updating `/customVideos/v1` attempting to mutate `createdAt` or `createdByUid` (Immutability violation).
11. `userA` creating `/admins/userA` with `role: "super_admin"` (Self-assigned role escalation).
12. `userB` listing `/users/userA/wrongAnswers` (Cross-user query scraping).
13. `userA` writing `/dailyLeaderboards/2026-11-21/entries/userB` or forging `score: 999999` with `questionsAttempted: 0` (Leaderboard spoofing / score poisoning).
14. `userA` injecting `email: "leak@test.com"` into `/dailyLeaderboards/2026-11-21/entries/userA` (Public PII leak attempt).
15. `userA` creating or updating `/users/userA` with `accountStatus: "suspended"` or modifying `adminNote` (User self-modifying admin-only governance fields).
16. Non-admin `userB` listing `/users` or reading `/users/userA` (Unauthorized user directory PII scraping).
17. `userA` creating `/users/userA` with `accessTier: "enrolled_pro"` or updating `accessExpiresAt` (Self-upgrading subscription without payment approval).
18. Non-admin `userA` writing `/appConfig/accessPolicy` (Tampering with trial duration, price, or feature matrix).
19. `userA` updating `/enrollmentRequests/req1` to `status: "approved"` or listing `userB`'s enrollment requests (Self-approving payment / PII scraping).

