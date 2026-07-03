# The Action Consent Model
In order to show the available actions, we first need to calculate all of action consent values, color coding the command text according to their consent levels. That way the player will have an idea of how an action will be received before they choose it. (That's all the detail they'll get though as actions are performed when the action button is clicked.)

### Consent Result Model
As we calculate the consent values we put together a result model. The model has the result, the result level, and a summary of the calculations that were made to get to that result. We display this summary as a tool tip for the sex action (along with an action description, just to make it clear that "get blowjob" means that the player character is the one getting a blowjob, or in case someone needs docking explained to them.)

### Levels
Consent has four levels, based on the difficulty of the action being performed and how well the partner would enjoy that action. These levels greatly effect how the action is received by the partner. Banded as a percentage of target difficulty: 
- **Eager** `(>200%)` All of the positive sensation from this action get a bonus.
- **Willing** `(125% - 200%)` Default value, sensation calculations are normal.
- **Reluctant** `(100% - 125%)` When consent is reluctant the positive sensation values are all penalized
- **Unwilling** `(< 100%)` Increased negative sensations, anger, fear, etc. And very penalized positive values.

### Calculating Consent
Each sex action must have an an ordered array of consent factors in the following order:
- `base` - What type of action is this and how well is the player liked, feared and respected? 
- `arousal` - How much of an effect does their current level of arousal have?
- `gender` - How much of an effect does the player's gender have?
- `preference` - Do they have a matching or opposing sexual preference?
There must always be a base factor. There can be one arousal or gender factor. There can be multiple preference factors. These factors are all added or multiplied together to calculate the consent target.

##### Consent Base Classes
- **Emotional** (Kissing, Hand Holding) = Affection - Fear/2
- **Reverse Service** (Getting Pleasured) = Affection + Respect
- **Rough Service** (Deepthroating, Difficult Sex) = (Respect + Fear) / 2
- **Service** (Giving Pleasure) = Respect + Affection/2
- **Touching** (Fondling) = Affection + Fear/2
- **Penetration** (Fucking) = Affection + Respect/2 - Fear/2
- **Performance** (Masturbate, Striptease) = Respect + Fear/2 
