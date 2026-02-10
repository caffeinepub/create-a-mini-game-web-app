# Specification

## Summary
**Goal:** Build a browser-playable mini game with deterministic scoring, optional Internet Identity sign-in, score submission, and a persisted leaderboard, all wrapped in a cohesive non-blue/purple visual theme.

**Planned changes:**
- Implement a 2D game playable in the browser with a clear objective, deterministic scoring, and start/gameplay/results states.
- Add UI to start a new session, show live gameplay feedback (e.g., score and/or time), and end with a results screen including “play again”.
- Integrate optional Internet Identity sign-in/out UI and reflect authentication state.
- When signed in, allow submitting the final score from the end-of-game screen; when signed out, disable or prompt sign-in.
- Add a single Motoko backend actor with methods to submit a score (tied to caller identity) and fetch a top-N leaderboard; persist scores across reloads.
- Add a leaderboard UI view/section that loads top scores, supports refresh after submission, and shows loading/error states in English.
- Apply a consistent creative visual theme across all screens with responsive layout and a primary palette that is not predominantly blue/purple.

**User-visible outcome:** A user can play a complete mini game in the browser, see their final score, optionally sign in with Internet Identity to submit it, and view a persisted leaderboard of top scores.
