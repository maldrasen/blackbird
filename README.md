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
end was the natural choice. I don't really use any of Electron's features. It's mostly just there to make the final
version for distribution, packaging the app as a single cross platform executable. 

### Git Setup
Because we're using the repository itself for issue tracking, there's a git hook that generates the task index every
time a task file is added or updated. Git needs to be configured to look for this hook with:
```
git config core.hooksPath .githooks
```

### Running from source
There isn't much to actually play at the moment. The game is still mostly a small collection of test fixtures, though 
if you want to take a look, running the development version of the game is simple. First install Node.js, then:
```
npm install
bin/start.sh
```
The start script generates the file manifest, compiles the SCSS, runs the test suite, and launches Electron.

## AI Disclaimer
Ok, so the thing is, AI is really good at some stuff like finding and fixing bugs, so Claude Code was used pretty
heavily at some points in my development process. Tasks like programmatically building the SVG used as the dungeon
view is exactly the sort of thing that would have been a terrible pain in the ass to do myself. Because it's easily
verifiable visually, though, I can be confident that it's working exactly as I intended. As another example, every time
characters change position in a sex scene, I give a brief description of how the characters move. These moves need to
take the anatomy and current attitude of the characters into consideration, which means that there are thousands of
permutations of "{name} straddles you facing away". For text like this, I just don't have the endurance for such
repetitious writing.

Overall though, I would say AI writing is aggressively mid. It's extra medium. So all the "important" text has to be
handwritten. I won't be shipping the game with any AI art assets. (They're fine for placeholders during development).
As a mostly text based game though, there really aren't that many art assets to begin with. Eventually I'd like to be
able to hire a full time artist and include more graphics, but I'm still very far from that point. Who knows? Maybe
one day there will even be background music.

## License
Blackbird is licensed under [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/). Anyone can share 
and adapt it for non-commercial purposes with attribution.
