import { checkSimulationFragment } from './utils';

describe('Positioning', () => {
  it('positions basic orientations correctly', async () => {
    await checkSimulationFragment(
`
<SimulatedElementGroup id='top'>
  <Circle orientation={Orientation.PRIMARY} />
  <HtmlFragment orientation={Orientation.TOP}>
    <p><strong>top</strong></p>
  </HtmlFragment>
</SimulatedElementGroup>
<SimulatedElementGroup id='bottom'>
  <Circle orientation={Orientation.PRIMARY} />
  <Label text='bottom' orientation={Orientation.BOTTOM} />
</SimulatedElementGroup>
<SimulatedElementGroup id='left'>
  <Circle orientation={Orientation.PRIMARY} />
  <HtmlFragment orientation={Orientation.LEFT}>
    <p><em>left</em></p>
  </HtmlFragment>
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
  <HtmlFragment orientation={Orientation.BOTTOM_RIGHT}>
    <p style={{ margin: 0 }}>bottom <em>right</em></p>
  </HtmlFragment>
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

  it('positions different orientation styles correctly', async () => {
    await checkSimulationFragment(
`
<SimulatedElement id='top'>
  <Label text='top' />
</SimulatedElement>
<SimulatedElement id='bottom1'>
  <Label text='bottom1' />
</SimulatedElement>
<SimulatedElement id='bottom2'>
  <Label text='bottom2' />
</SimulatedElement>
<SimulatedElement id='bottom3'>
  <Label text='bottom3' />
</SimulatedElement>
<SimulatedElement id='bottom4'>
  <Label text='bottom4' />
</SimulatedElement>
<Rules.OrientingRule
  baseElementId='top'
  targetElements={{ ids: [ 'bottom1', 'bottom2', 'bottom3', 'bottom4' ] }}
  orientation={Orientation.BOTTOM}
  style='wide'
  strength={10}
  />
<Rules.OrientingRule
  baseElementId='bottom1'
  targetElements={{ ids: [ 'bottom2', 'bottom3', 'bottom4' ] }}
  orientation={Orientation.RIGHT}
  style='medium'
  />
<Rules.OrientingRule
  baseElementId='bottom2'
  targetElements={{ ids: [ 'bottom3', 'bottom4' ] }}
  orientation={Orientation.RIGHT}
  style='narrow'
  />
<Rules.OrientingRule
  baseElementId='bottom3'
  targetElements={{ id: 'bottom4' }}
  orientation={Orientation.RIGHT}
  style='exact'
  />
`
    );
  });

});
