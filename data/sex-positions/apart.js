// Apart is a position where the two characters aren't really interacting,
// used for actions like striptease or masturbation where a character might be
// acting alone. We'll always need to reposition into and out of the apart
// position.
SexPosition.register('apart',{
  name: 'Apart',

  alignment: {
    first: {},
    second: {},
  },

  moves:[],

  generateRearrange: rearrange
});

function rearrange(context) {
  return `[Rearrange with player and partner standing apart with partner attitude ${context.attitude}]`
}
