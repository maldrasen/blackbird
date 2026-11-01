---
id: 267
title: Decouple Fixtures from Specs
priority: 1
created: 2026-10-13
tags: []
points: 8
---
---
There's a problem with how the specs are currently implemented, a disconnect between what the specs are for and what the fixtures are for. When I run the electron app, the main menu has a few start fixtures commands that will let me define a game state I can jump right into. When I'm implementing a new feature, I want to be able to change these fixtures to reflect what I'm working on. The specs though shouldn't be tied to these fixtures, which aren't really intended to be stable.

The specs need something like the fixtures though for reusable components across the specs. I think we could create a new top level test-support directory. The test-support will be loaded with the test suite, providing reusable setup functions for all the specs. Fixtures will remain in the application, but only used by the fixture commands in the main menu. 

Modules like `application/test/tests.js` are kind of a leftover artifact from then the specs were run in the electron app. They really don't belong in anything but the specs.

The goal here is to move all shared test support functions into test-support, and leave only what the fixtures use in the main application. The `application/test` directory will become `application/fixtures` to make it clear that it's not really for the tests.