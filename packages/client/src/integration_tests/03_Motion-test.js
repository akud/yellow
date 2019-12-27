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
<Rules.DirectionalRule elementIds={['up']} angle={3 * Math.PI / 2} />
<Rules.DirectionalRule elementIds={['down']} angle={Math.PI / 2} />
<Rules.DirectionalRule elementIds={['left']} angle={Math.PI} />
<Rules.DirectionalRule elementIds={['right']} angle={0} />
`
    );
  });
});
