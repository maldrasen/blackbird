
const harvestButtons = [
  { label:'Pick some apples.', end:true },
  { label:'Leave them alone.', end:true },
]

Episode.register('orchard-empty',{
  layout: 'centered',
  repeat: true,
  pages: [
    { content:`You find an orchard.`, buttons:harvestButtons, buttonsStyle:'column' }
  ],
});
