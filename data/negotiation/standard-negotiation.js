// The framing lines around a negotiation. The questions themselves are NegotiationQuestion records and the monster's
// responses come from its resolved NegotiationReactions; these are just the shared greeting and resolution beats. The
// prose is generic for now — each line is woven with the monster as the target ({T:...}) so it still reads personally.
// A natural follow-up is folding these into a matchable record too, so a monster can greet and refuse in character.

global.NegotiationScript = {

  greeting: `{T:TargetName} hesitates, weapon still half-raised, and studies you across the bloodied ground. "...You'd rather talk than finish this? Fine. Ask what you came to ask, and I'll decide whether you're worth following."`,

  accept: `{T:TargetName} is quiet for a long moment. Then, slowly, the weapon lowers. "...Alright. I'll follow you, for now. Don't make me regret it."`,

  refuse: `{T:TargetName's} expression hardens. "No. I'd sooner die on my feet than crawl after you." {T:He} raises {T:his} weapon again.`,

  declineMessage: `{T:TargetName} refuses your offer and readies to fight on.`,
};
