Ability.Defend = function() {
  const ability = Ability('Defend');

  ability.setExecuteFunction(() => {
    const round = BattleSystem.getRound();

    round.clearTarget();
    round.addTime(1000, false);
    round.addMessage({ text:`{A:ActingName} takes a defensive stance, becoming {S/pst}Poised{/S}.` });

    BattleSystem.addStatus(round.getActing(), 'poised', { count:1 });
  });

  return ability;
}
