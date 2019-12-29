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
<Rules.DirectionalRule elementIds={['up']} orientation={Orientation.TOP} />
<Rules.DirectionalRule elementIds={['down']} orientation={Orientation.BOTTOM} />
<Rules.DirectionalRule elementIds={['left']} orientation={Orientation.LEFT} />
<Rules.DirectionalRule elementIds={['right']} orientation={Orientation.RIGHT} />
`
    );
  });
});
