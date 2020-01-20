import { checkSimulationFragment } from './utils';

describe('Motion', () => {
  it('moves elements in the correct direction', async () => {
    await checkSimulationFragment(
`
<SimulatedElement id='up'>
  <Label text='going up' />
</SimulatedElement>
<SimulatedElement id='down'>
  <Label text='going down' />
</SimulatedElement>
<SimulatedElement id='right'>
  <Label text='going right' />
</SimulatedElement>
<SimulatedElement id='left'>
  <Label text='going left' />
</SimulatedElement>
<Rules.DirectionalRule elements={{ id: 'up' }} orientation={Orientation.TOP} />
<Rules.DirectionalRule elements={{ id: 'down' }} orientation={Orientation.BOTTOM} />
<Rules.DirectionalRule elements={{ id: 'left' }} orientation={Orientation.LEFT} />
<Rules.DirectionalRule elements={{ id: 'right' }} orientation={Orientation.RIGHT} />
`
    );
  });

  it('can move a groups of elements together', async () => {
    await checkSimulationFragment(
`
<SimulatedElementGroup id='up'>
  <Label text="we're all" />
  <Label text='going up' />
</SimulatedElementGroup>
<SimulatedElementGroup id='left1'>
  <Label text="we're all" />
  <Label text='all of us' />
</SimulatedElementGroup>
<SimulatedElementGroup id='left2'>
  <Label text='going' />
  <HtmlFragment>
    <em>left</em>
  </HtmlFragment>
</SimulatedElementGroup>

<Rules.DirectionalRule
  elements={{ groupId: 'up' }}
  orientation={Orientation.TOP}
  strength={2.5}
  />
<Rules.DirectionalRule
  elements={{ groupIds: [ 'left1', 'left2' ] }}
  orientation={Orientation.LEFT}
  strength={2.5}
  />
`
    );
  });

});
