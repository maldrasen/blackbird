---
id: 259
title: UI Debug Fixture
priority: 3
created: 2026-10-07
tags: []
points: 8
---
---

The UI is staring to get a bit out of control. In every new view we're adding a lot of bespoke styles. We need to go though every view and pull shared elements into their own components. We're done a fairly good job in reusing some elements like the buttons, borders, shadows, etc. A lot of the background colors are still hand picked. I knew they were temporary when I added them though. A lot of the margins and paddings are repeated and could be pulled into variables. 

The first step of this should be to figure out what's copied (or just happened to be authored into the same shape) and extract them into their own styles or variables.

I think we need to use less generic class names as well. Classes like `.panel` don't tell me enough about how they're used. Can it be nested? How deeply? We also need to spend some time separating how the component looks visually from where it sits on the page. 

---

The other big problem with the UI is it's too corporate looking right now. At a glance, it looks more like a stock trading app than a sex game. I'm tempted to buy a UI kit and start incorporating 9-slice frame drawing, but at the same time, I'm worried about trapping myself into a visual style I wouldn't be able to reproduce when I need something that isn't in the kit. Plus, I don't want to use something recognizable that multiple other projects are probably using. 

I think rather than changing the entire UI I should focus on smaller changes. Ditch Roboto for something still sans serif and readable (Habibi is not readable outside of a text block, but it looks good there.) I think a lot more could be done with motion and visual effects. 

---

For this task, it's too big of an ask to completely rewrite the User Interface. I think we need to put together a style sheet debug page, cataloging all the styles, how they're used. This could be done as a fixture that doesn't load the game, but builds something that uses every element in some way.