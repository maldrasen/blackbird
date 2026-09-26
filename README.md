# Blackbird

Blackbird is an erotic, text based, dungeon crawling, roguelike, training game inspired by obscure Japanese
[Era games](https://wiki.eragames.rip/index.php/Main_Page), Wizardry, Shin Megami Tensai, and a bunch of other weird
sex games. In Blackbird, you descend into a procedurally generated dungeon; fight, recruit, or capture the monsters 
you find there, and then "train" them back at your home. 

**This game contains explicit and sometimes extreme sexual content and very dark themes. It is intended for the most
hardcore of adults only.**

## Status
Blackbird is in active development, but it's not at all playable yet. I'm still working towards a minimum viable 
product, getting every core system implemented end to end before shifting focus to content. Most of the mechanical 
skeleton is in place, but there's still a ton of content that I need to add.

The project is hosted on both GitHub and GitLab. Rather than using either site's project tracking tools, I'm simply 
tracking tasks as markdown files in the [docs/tasks](docs/tasks) directory. I'm not accepting issues or pull requests 
at the moment. At least, not until all the systems work is complete, and I'm focused solely on adding content. 

## Technical Overview
Blackbird is an Electron app written in plain JavaScript. Blackbird is primarily a text based game, so an HTML front
end was the natural choice. I don't really use any of Electron's features. It's mostly just there to package the app
as a single cross platform executable.

### Git Setup
Because we're using the repository itself for issue tracking, there's a git hook that generates the task index every
time a task file is added or updated. Git needs to be configured to look for this hook with:
```
git config core.hooksPath .githooks
```

### Running from source
There still isn't much of a game here yet. As I'm building out the game systems, I'm adding a minimal amount of content
to get them working, but there's not enough here to feel like an actual game yet. if you want to take a look anyway,
running the development version of the game is simple. First install Node.js, then:
```
npm install
bin/start.sh
```
The start script generates the file manifest, compiles the SCSS, runs the test suite, and launches Electron.

# Code Style
Look, I'm super old. My JavaScript style was calcified in the early 2000s. There are no classes anywhere. There is no
bundler or module imports. Modules are defined using self evaluating function expressions and stored on the global
scope. I avoid dependencies like the plague. It's what works for me. In a "You can write COBOL in any language" since
of the phrase, hopefully this will help the project longevity. Even if Electron stops existing, the application could
easily be ported into any similar framework, or even run on a webserver.

# AI Policy / Disclaimer / Opinions

### AI Images
This project won't be using any AI image assets. Even though AIs can generate images that are kind of aesthetically
pleasing, they all have a kind of look. That overly polished, vaguely samey kind of look sends a signal. When a project
uses a bunch of AI assets it makes the entire project look like low effort slop. Even if it's only the image assets and
everything else is lovingly hand crafted, the visual cue is there that the developers just didn't give a fuck.

### AI Writing
The same is true for most AI writing. It's uncreative, homogenous, aggressively mid, and extra medium. The goal with
this game is to be over the top perverted, which is completely incompatible with what most AI models are capable of
producing anyway.

There are some places where I will be using some AI text generation though. With the sex positions for instance, every
time the characters change positions, I give a brief description of how the characters move. These moves need to take
the anatomy and current attitude of the characters into consideration, which means that there are thousands of
permutations of "{name} straddles you facing away". Text like this doesn't need to be creative or interesting. It
simply needs to describe what is happening.

Dialog between characters, scene descriptions, item descriptions, battle text, training text, all have to be hand
written, or else it will just end up being boring, pointless, and uninspired.

### AI Software
All that said, there are parts of software development where an AI can be very helpful. I can describe a bug and point
at an AI at it, and it can diagnose a problem and offer a solution in maybe a minute; something that would take me far
longer to trace myself. There are problems in game development that have known, well understood solutions. If I want
the dungeon viewport to use a damped springs, I can just tell the AI to implement that, because there are thousands of
examples in its training data of how to do that correctly. If a feature is 80% complete, and AI can generally fill in
the missing pieces, when it's obvious what needs to be done. It can then generate all the test cases for what I've
written myself, occasionally finding bugs when doing so.

I've found that AIs though are completely unreliable when the solution to a problem isn't obvious. If they have to make
an architecture decision, they're limited by whatever's in their current context, so they won't have a full picture of
all the game's many interconnected systems. So even though I'm using an AI to generate some code, I won't include
anything that I don't fully understand or haven't designed myself. Otherwise, I'd just end up painting myself into a
corner, as trying to change or maintain a system you don't understand is the worst situation for a software engineer to
find themselves in.

## License
Blackbird is licensed under [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/). Anyone can share 
and adapt it for non-commercial purposes with attribution.
