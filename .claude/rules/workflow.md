# Incremental Implementation Workflow
**Aim for one unit of work per turn.** 

When implementing a task, I want to be able to review every change. When too many changes are made at once, across too 
many files in disparate systems, the review process gets difficult and fragmented. When a task or an approved plan 
includes multiple units of work, never implement everything in a single pass. Every new functional unit needs to be
reviewed and approved. Implement one unit, stop, wait. This is a guideline, not a specification. This "Do as much can I 
review at once" rule is inherently fuzzy. When a change sits near the boundary, do the smaller piece and ask.

## What counts as one unit
A unit is the smallest change that can be described as a single step. After a step has been implemented it's important
that the app still loads, but an in progress feature doesn't need to be functional until it's complete. The test suite
is allowed to be failing while a task is in progress, provided that the tests all pass once it's complete. Mechanical
follow-through required for coherence (updating callsites, regenerating the manifest, adjusting tests that only
cover the changed code) can belong to the current step.

A unit is not:
- Implement "feature"
- Changes spanning unrelated modules

## Stop protocol
At each stop, output:

1. What changed
2. What you deliberately did *not* do
3. What the next unit would be
4. Anything you discovered that invalidates the plan

Do not begin the next unit until I have had a chance to review and approve what was changed or added. Approved code 
will be committed. You're clear to proceed with implementation when the working tree (as reported by `git status`) is
clean. 

## Approval semantics
Approving a plan approves the *direction*, not the execution. Each step in an approved plan still requires its own
go-ahead. Never merge plan steps at execution time, and never work ahead because a later step seems obvious.

## Plan mode
Plans must be numbered steps that each independently satisfy the unit definition above. If a step cannot be expressed 
that way, it may be too large and should be split into multiple steps.
