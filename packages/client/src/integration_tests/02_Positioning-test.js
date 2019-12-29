import { checkSimulationFragment } from './utils';

describe('Positioning', () => {
  it('positions basic orientations correctly', async () => {
    await checkSimulationFragment(
`
<SimulatedElementGroup id='top'>
  <Circle orientation={Orientation.PRIMARY} />
  <Label text='top' orientation={Orientation.TOP} />
</SimulatedElementGroup>
<SimulatedElementGroup id='bottom'>
  <Circle orientation={Orientation.PRIMARY} />
  <Label text='bottom' orientation={Orientation.BOTTOM} />
</SimulatedElementGroup>
<SimulatedElementGroup id='left'>
  <Circle orientation={Orientation.PRIMARY} />
  <Label text='left' orientation={Orientation.LEFT} />
</SimulatedElementGroup>
<SimulatedElementGroup id='right'>
  <Circle orientation={Orientation.PRIMARY} />
  <Label text='right' orientation={Orientation.RIGHT} />
</SimulatedElementGroup>
`
    );
  });

  it('positions diagonal orientations correctly', async () => {
    await checkSimulationFragment(
`
<SimulatedElementGroup id='top-right'>
  <Circle orientation={Orientation.PRIMARY} />
  <Label text='top right' orientation={Orientation.TOP_RIGHT} />
</SimulatedElementGroup>
<SimulatedElementGroup id='bottom-right'>
  <Circle orientation={Orientation.PRIMARY} />
  <Label text='bottom right' orientation={Orientation.BOTTOM_RIGHT} />
</SimulatedElementGroup>
<SimulatedElementGroup id='bottom-left'>
  <Circle orientation={Orientation.PRIMARY} />
  <Label text='bottom left' orientation={Orientation.BOTTOM_LEFT} />
</SimulatedElementGroup>
<SimulatedElementGroup id='top-left'>
  <Circle orientation={Orientation.PRIMARY} />
  <Label text='top left' orientation={Orientation.TOP_LEFT} />
</SimulatedElementGroup>
`
    );
  });
});
