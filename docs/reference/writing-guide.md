# Writing — Tone, Audience & Style Guide

The Blackbird project is an adult game set in a fantasy world. Every character in this game is an adult. Nothing here should be read as license to generate anything involving a minor, and any generation request should assume adult characters. Monster characters, even those who are animal-shaped, are sentient beings capable of consenting to, or refusing sexual activities. 
## Intended Audience
- Adult players (18+)
- Players with sexual interests beyond what would be considered vanilla. With a wide variety of sex acts, we want to explore the fringes of what's possible sexually in a fantasy setting.
- Players drawn to non-human sexual partners. Most of the potential sexual partners in the game could be considered furrys, or ferals, or monster girls, or horrifying abominations.
- LGBT Players. The game is inherently queer, and relationships between any pairings of any genders are equally as valid.
- Players who are comfortable with dark themes and non-consensual content, provided it's handled as a modeled system with in-fiction consequences rather than existing purely for shock.
- Players who are comfortable with heavy BDSM.
- Romantasy readers. We're not always aiming for the highest intensity in scenes and want to sometimes emphasize the affection between characters.

## Tone Pillars

**Setting Tone** Dry, a little absurdist, comfortable laughing at itself. For example, the city of Wolgur, being pronounced Vulgar; the currency system designed to fleece people who don't understand it; the note that people who tried to fix the calendar "have all been mysteriously killed." This voice belongs in room descriptions, world text, dialog asides, not item flavor, though not inside the sex actions themselves.

**Sex Actions** Sex action text should be grounded and mechanical without being clinical. Think competent eroge translation prose: specific, physical, in service of what's actually happening to the stats, not padded out with metaphor for its own sake. If a sentence isn't doing work (describing an act, a reaction, or an emotional beat the state calls for) it probably shouldn't be there. This text gets read a lot, so brevity and efficiency matter as much as heat.

**Dark Content:** Dark themes should be played straight, not moralized. The game doesn't step outside the fiction to comment on whether something is okay. Actions will have consequences; except when they don't as is the way of the world. An unwilling action should read as unwilling (fear, resistance, disgust) without either sanitizing it or turning it into torture-porn for its own sake.

**Consent** Consent should be legible in the prose, not just in the number behind it:
- **Eager (>100):** enthusiastic, initiating, no hesitation in the character's own actions.
- **Willing (25–100):** cooperative, default warmth, no special resistance or excitement flagged.
- **Reluctant (0–25):** hesitation, discomfort leaking through, compliance without enjoyment.
- **Unwilling (<0):** resistance, fear/anger showing in body language and dialog, described
  from the character's POV as something being done *to* them.

## Explicitness
Anatomical and act description can be fully explicit. This is the genre and the audience
expects it. Where there's a choice, prefer specific physical/sensory detail and character
reaction over vague euphemism; vague euphemism reads as coy in a genre that isn't being coy
about anything else. That said, purple prose (stacking three metaphors for the same body
part) is a bigger sin than being plain. Most action text should be short.

## Functionality
The game text is intended to reflect the game's mechanical state, and must never contradict the state it's illustrating. Don't write a character climaxing if the pleasure math hasn't crossed the threshold, don't write eager enjoyment for an action when the consent value is in the unwilling band. If the prompt doesn't specify a piece of state, don't invent an emotional beat that only the state should authorize.

This is also why the Weaver token system exists. Anything the game already tracks as data (pronouns, breast size, cock size, hair color, pet names) shouldn't be freehand-described in generated text at all. A breast size reference should use the literal token `{A:breasts.bigBreasts}` in the output rather than the model guessing "her large breasts" from context. The generated text is a template, not a final render. The token stays in the output as-is and gets resolved by the Weaver later, so it stays correct even if the underlying component data changes. If the token system doesn't cover something, it would be better to create a new token than to include something that may be incorrect. 

(As of the time of this writing, many of the tokens are still stubs, but should be used anyway, even if the output is incorrect.)

## Anti-Patterns
- Breaking the fourth wall or narrating authorial judgment about the content.
- Modern slang or real-world references that puncture the fantasy setting (setting-tone
  jokes are fine; anachronism isn't).
- Escalating metaphor stacks for a single body part or act.
- Inventing consent, emotional state, or memory content that wasn't in the supplied state.
