---
name: grill-me
description: Interview the user relentlessly about a plan or design. Use when the user wants to stress-test a plan before building, or uses any 'grill' trigger phrases.
---

Before asking, read the local instructions, resolve `{GRIMOIRE}` through `{GRIMOIRE}/docs/rules/global.md`, apply `{GRIMOIRE}/agents/fragments/gate-anti-slop.md`, and inspect the plan, specs, and code directly related to the decision.

Interview me rigorously about unresolved decisions until we reach a shared understanding. Do not ask about facts already answered by the plan, specs, rules, or codebase. Walk down each remaining branch of the design tree, resolving dependencies between decisions one-by-one. For each question, provide your recommended answer.

Ask the questions one at a time, waiting for feedback on each question before continuing. Asking multiple questions at once is bewildering.

If a question can be answered by exploring the codebase, explore the codebase instead.

When no unresolved decisions remain, end with a brief summary of confirmed decisions, adopted assumptions, and remaining open items (`None` when there are none). Do not continue questioning or begin planning or implementation.
