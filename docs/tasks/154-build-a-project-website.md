---
id: 154
title: Build a project website
priority: 4
created: 2026-08-06
tags: []
points: 13
---
---
Once I have something up and running that could reasonably considered an alpha version of the game, I should look into putting a website together. I might look into something self hosted even. This is a massive epic kind of task. Registering a domain, pointing DNS at it, all that. For this first task it's enough to get a webserver running with an index.html on the open web.

As far as the webpage itself goes, I'll need to think about how much functionality I want there. At the very least it's an "about this game" page with links to get playable binaries. Probably also a blog where I can post progress updates and such. So far, that's just a static site generator with no need for anything fancy on the server side.

Open questions would be:
 - Do I want people to be able to comment on blog posts? (Adding any kind of interaction would immediately add a massive amount of work. Accounts, authorization, etc. At that point it would be better to just use an out of the box wordpress maybe? Still locally hosted. 
	- Could also allow (only allow) anonymous comments, because who wants another damn account or to link an account to a porn game page? As long as comments are only ever text it should be fine.
 - Should I have a playable non-electron version of the game on the site?
 - Protection against DOS?
