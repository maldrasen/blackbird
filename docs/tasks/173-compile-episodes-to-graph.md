---
id: 173
title: Compile episode pages to a graph at registration
priority: 3
created: 2026-08-09
tags:
  - episode
points: 3
---
### Compile episode pages to a graph
Episodes are authored as a flat pages array with `label`/`jump`/`end` navigation (the Ren'Py-style script convention). The array is the right authoring format, but the implicit fall-through between array entries has a footgun: if the last page of a branch forgets its `jump` or `end`, play silently bleeds into the next branch's pages. Building an internal graph from the array at registration time turns that plot hole into a load-time error, without changing how episodes are written.

### Graph construction
At `Episode.register`, compile the pages array into a node graph:
- Pages without a `label` get a generated one (index-based is fine); they only need real labels when something jumps to them.
- Each page's outgoing edges come from its `jump`, its `end`, its buttons' `jump`/`end`, or an implicit next-in-array edge when it declares none of those.
- `requires` skips become conditional edges; they don't change the graph shape, only which edge is taken at runtime.

### Validation
- **No implicit fall-through into a labeled page.** Any page that is a jump target must be entered explicitly. Reconvergence is still allowed, it just costs an explicit `jump` on the preceding page. This is the check that kills the branch-bleed footgun.
- Warn on pages unreachable from the first page (dead prose).
- Check that every node can reach an end (running off the array end or an `end` directive). Cycles stay legal for hub-and-return conversations, so this is reachability-of-an-exit, not termination.

### Declarative navigation discipline
The graph is only sound if all navigation is visible to it, so callbacks must stop navigating:
- Callbacks become pure side effects; they never call `EpisodeSystem.nextPage()` or `jumpToPage()` themselves.
- A button with a callback and no `jump`/`end` defaults to advancing after the callback runs.
- Migrate the existing callback-driven episodes (`data/episodes/game-start-1.js`, `data/episodes/propose-training.js`) to declarative navigation.

### Runtime
`EpisodeState` internals switch from index arithmetic (`pageIndex`/`nextPage`) to walking the compiled graph. Data files don't change except where the new fall-through rule surfaces genuine bugs.

Bonus once the graph exists: an episode's flow could be auto-rendered as a diagram for authoring.
