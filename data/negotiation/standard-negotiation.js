// The standard negotiation script. When the player corners the last monster and chooses to negotiate, the monster asks
// these questions and the tone of the player's answers shapes the feelings it would hold towards the player if it were
// recruited (see Archetype.negotiationDelta). The prose is generic for now — each line is woven with the monster as the
// target ({T:...}) so it still reads personally. Per-archetype flavored variants can be layered on later.

global.NegotiationScript = {

  greeting: `{T:TargetName} hesitates, weapon still half-raised, and studies you across the bloodied ground. "...You'd rather talk than finish this? Fine. Ask what you came to ask, and I'll decide whether you're worth following."`,

  questions: [
    {
      text: `{T:TargetName} tilts {T:his} head. "So. Why should something like me follow someone like you?"`,
      answers: [
        { tone: NegotiationTone.boastful, label: `Because I'm the strongest thing you'll ever stand beside.` },
        { tone: NegotiationTone.kind,     label: `Because I'll treat you better than this place ever has.` },
        { tone: NegotiationTone.dominant, label: `Because the alternative is my blade in your throat.` },
        { tone: NegotiationTone.honest,   label: `Honestly? You might do fine alone. But I'd rather have you.` },
      ],
    },
    {
      text: `"And what is it you'd want from me?" {T:targetName} asks, wary.`,
      answers: [
        { tone: NegotiationTone.dominant, label: `Obedience. You'd be mine, completely.` },
        { tone: NegotiationTone.honest,   label: `Your strength at my side. Nothing you'd resent giving.` },
        { tone: NegotiationTone.kind,     label: `Only what you'd offer freely. I won't take more.` },
        { tone: NegotiationTone.lewd,     label: `Company, mostly. The nights down here get lonely.` },
      ],
    },
    {
      text: `{T:TargetName} lets the weapon drop an inch. "And if I say no?"`,
      answers: [
        { tone: NegotiationTone.dominant, label: `Then this ends the way it started. Badly, for you.` },
        { tone: NegotiationTone.kind,     label: `Then you walk away, and we pretend this never happened.` },
        { tone: NegotiationTone.boastful, label: `You won't. You already know I'm the best offer you'll get.` },
        { tone: NegotiationTone.lewd,     label: `Then I'd be disappointed. I think we'd suit each other.` },
      ],
    },
  ],

  accept: `{T:TargetName} is quiet for a long moment. Then, slowly, the weapon lowers. "...Alright. I'll follow you, for now. Don't make me regret it."`,

  refuse: `{T:TargetName's} expression hardens. "No. I'd sooner die on my feet than crawl after you." {T:He} raises {T:his} weapon again.`,

  declineMessage: `{T:TargetName} refuses your offer and readies to fight on.`,
};
