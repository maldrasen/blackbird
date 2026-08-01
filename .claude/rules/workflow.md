# Incremental Implementation Workflow

**Default: one unit of work per turn.** 

When a task or an approved plan includes multiple units of work, never it in a single pass. Every new functional unit
needs to be reviewed and approved. Implement one unit, stop, wait.

## What counts as one unit

A unit is the smallest change that leaves the repo in a coherent state and can be described in a single commit message
containing no "and".

A unit is:
- Creating the scaffolding of a new module.
- Adding a new public function. (Private functions that support this function can be considered part of that unit)
- Making a change across a functional call stack
- Updating all the fields of a data record.
- Updating a single field across multiple data records.
- Renaming a symbol and updating all of it's callsites. 

A unit is not:
- "Implement [feature]"
- Changes spanning unrelated modules
- Any step you'd describe with "and then"

## Stop protocol

At each stop, output:
1. What changed
2. What you deliberately did *not* do
3. What the next unit would be
4. Anything you discovered that invalidates the plan

Do not begin the next unit until I have had a chance to review and approve what was changed or added. Approved code 
will be committed. You're clear to proceed with implementation when the working directory is clear. (When `git status` 
is empty)

## Approval semantics

Approving a plan approves the *direction*, not the execution. Each step in an approved plan still requires its own
go-ahead. Never merge plan steps at execution time, and never work ahead because a later step seems obvious.

## Plan mode

Plans must be numbered steps that each independently satisfy the unit definition above. If a step cannot be expressed 
that way, it may be too large and should be split into multiple steps.
