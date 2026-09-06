# Skeptara controlled demo fixtures

This directory is used only for bounded hackathon demo pull requests. The demo PRs are real GitHub changes but are isolated from the production/runtime package at the repository root.

- clean case: dependency target expected to survive the required counter-evidence challenge;
- challenged case: dependency target intentionally selected to have material external counter-evidence.

No demo PR is merge-authorized by this file. T3 must enforce allow-list + fresh PASS + exact head SHA/action fingerprint before any merge.
