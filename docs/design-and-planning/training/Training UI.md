There's a lot of room for improvement with the training user interface. It's actually amazing that the Era games were as functional as they were, given that they were essentially terminal programs. The biggest problem was with the persistent actions. If you do the sex then that opens a couple new related actions, cervix tease, g-spot stimulation, but that was pretty much it. You could change position, but had no control over any action that was ongoing. So that's the biggest change I want to make. The other big place I see for improvement is better filtering of the big list of actions. We're already removing a lot of actions from the list by moving most follow on type actions into separate persistent actions. I think we can also filter by body part and action type at once. There should be an action type category: caress, sex toys, fuck, domination, degradation, etc. And there should be a body part category: mouth, breasts, pussy, cock, etc. Then you can filter the list down to something specific like all sex toy actions that target the anus. All the categories will be toggle switches, that allow multiple categories to be selected, then we display the intersection. The table itself should have action categories on the left, the body part categories on the top, and the available actions in the center. 

### Persistent Actions
I think that starting most actions should persist it. Really an action could be seen as locking a body part to another body part. Kissing becomes a mouth to mouth lock. Breast fondling a hands to breast lock. Then fucking is cock to pussy lock. Any other action that uses those body parts in that configuration then is controlled within that persistent action frame. 

```
M->M : Currently: [Kissing]                                                  [Stop]
       Change to: [Deep Kissing][Tongue Sucking][Spit in mouth]

H->B : Currently: [Fondling]                                                 [Stop]
       Change to: [Tit Shaking][Rough Squeezing][Nipple Pulling][Tit Spanking]

C->V : Currently: [Fucking]                                                 [Pull Out]
       Thrusting Speed:[**Stopped**][Slow][Medium][Fast] Forcefulness:[**Soft**][Moderate][Rough]
```

An action frame has the current action, we could also give some details about the effects that action is having, though not the actual sensation values, those are only produced once you've picked an action. Changing an action either changes the current action, or does something that unlocks the action after it's been completed. An action could change the lock position. If the player is getting a tit job, and the partner's mouth is free, there could be a tit & blowjob action that uses both at once. So really these locks are a many to many:

```
C->BM Currently: [Tit&Blowjob]                                               [Stop]
      Thrusting Speed: [Stopped][Slow][**Medium**][Fast] Forcefulness:[Soft][Moderate][**Rough**]
      Change To: [Tit Fuck][Blowjob]

H->VA Currently: [Fingering Ass&Pussy]                                       [Stop]
      Thrusting Speed: [Stopped][Slow][Medium][**Fast**] Forcefulness:[Soft][Moderate][**Rough**]
      Change To: [Anal Fingering][Pussy Fingering][Urethral Fingering][Anal Fisting][Pussy Fisting][Double Fisting]
```

Most insertion actions will have speed and forcefulness toggles, unless it's something like a simple dildo insertion. Speed and forcefulness are always a linked action, two parameters essentially. After insertion all options are unselected. Once both a speed and a forcefulness are picked the action is invoked. If one of these values is changed the next round, it deselects the other. That way changing the speed or forcefulness also gives the option to change the other value without submitting an action. Two clicks are always required.

Sex toys will be handled in a similar way, though for some toys it's a partial lock. Having nipple clamps on won't prevent some breast actions. Nipple sucking becomes impossible, but breast shaking is available and uses the clamps in the action. 

```
->(B) Nipple Clamps Attached                                                [Remove]
      Use: [Pull Clamps][Add weights][Add rotor]

->(V) 8in Dildo Inserted                                                  [Pull Out]
->(V) 6in Dildo Inserted                                                  [Pull Out]
      Use: [Thrust][Push Deeper]

H->A  Currently: [Thrusting 18in horsecock dildo]                         [Pull Out]
      Thrusting Speed: [Stopped][Slow][Medium][**Fast**] Forcefulness:[Soft][Moderate][**Rough**]
      Change to: [Insert Fist with Dildo]
```

All of the persistent actions will either have an option to stop them (Stop is not an action, it just doesn't repeat) or a stopping action that does count as this round's action. Pulling an insertion out, or removing the nipple clamps will produce a reaction that simply not doing something again won't.
### Sex Positions
Sex positions are really there to manage these body part locks. Depending on what is where and in pointing in which directions some actions won't be possible. If the current position is `kneeling-dominant`, with the blowjob action persisted. Then the fingering actions aren't visible. At any time though you should be able to change position from a sex position menu. The menu should be able to inform you what actions will be removed by changing to the new position. This could invoke all of the pull out actions at once. You could be anal fucking then switch the position to face sitting submissive, and that's a heck of a thing, could potentially invoke a few actions at once. 

Some actions could also automatically change position. That was my plan at first. The Era games had actions like: missionary fuck, doggy style fuck, piledriver fuck, etc. In my version I think the way to achieve that is to first pick the position in the sex position menu. The moves people around, invokes any stop actions. Then next round you can pick anal, vaginal, oral, whatever is available in the position you're in. That invokes an insertion action for this round. Then the next action taken would be to change the thrusting speed and forcefulness to 'turn on the fucking', or some other action can be picked instead which would leave the cock in the 'inserted but not moving' state. Some rougher actions though could start hard and fast. Maybe a grab and fuck kind of action would manhandle the person into position, thrust in, and fuck hard all in one action. This action would necessarily put the partner into the associated position as part of that action.

So clearly actions are going to need to be chained together, and each round can produce multiple actions, all of which are resolved separately. It shouldn't be difficult to determine the order of actions though if that's important. Position changes happen first. That triggers all of the unlocking actions for incompatible arrangements. If there are any insertion actions they happen next. There could be multiple of these at once if a character has two dicks or an action like double fisting. Any other kind of actions would be resolved last. 
