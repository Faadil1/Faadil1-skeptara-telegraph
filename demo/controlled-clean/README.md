# Controlled clean dependency fixture

This directory exists only to create a truthful bounded GitHub dependency-change PR for Skeptara's T2/T3/T4 demo.

The root application does not import or install this fixture. Its baseline pins `lodash@4.17.20`; the clean demo PR updates only this isolated fixture to `lodash@4.17.21` so Skeptara can audit a real PR with a real head SHA without changing production/runtime dependencies.

Creating or auditing the PR does not authorize merging it. Merge authorization remains a separate T3 gate.
