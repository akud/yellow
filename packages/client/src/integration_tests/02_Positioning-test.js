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
`);
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

  it('pushes elements towards positions correctly', async () => {
    await checkSimulationFragment(
`
<SimulatedElement id="top-right">
  <Label text='top right' />
</SimulatedElement>
<SimulatedElement id="bottom-right">
  <Label text='bottom right' />
</SimulatedElement>
<SimulatedElement id="top-left">
  <Label text='top left' />
</SimulatedElement>
<SimulatedElement id="bottom-left">
  <Label text='bottom left' />
</SimulatedElement>
<SimulatedElement id="center">
  <Label text='center' />
</SimulatedElement>

<Grid />

<Rules.PositioningRule
  elements={{ id: 'top-right' }}
  position={{ x: 400, y: 100 }}
  />
<Rules.PositioningRule
  elements={{ id: 'bottom-right' }}
  position={{ x: 400, y: 400 }}
  />
<Rules.PositioningRule
  elements={{ id: 'top-left' }}
  position={{ x: 100, y: 100 }}
  />
<Rules.PositioningRule
  elements={{ id: 'bottom-left' }}
  position={{ x: 100, y: 400 }}
  />
<Rules.CenteringRule
  elements={{ id: 'center' }}
  />
`
    );
  });

  it('positions medium orientation styles correctly', async () => {
    await checkSimulationFragment(
`
<SimulatedElement id='anchor'>
  <Label text='anchor' />
</SimulatedElement>
<React.Fragment>
{
  [1, 2, 3, 4, 5].map(i => (
    <SimulatedElement id={\`bottom-\${i}\`} key={i}>
      <Label text={\`bottom \${i}\`} />
    </SimulatedElement>
  ))
}
  </React.Fragment>
<Rules.OrientingRule
  baseElementId='anchor'
  targetElements={{ ids: [1, 2, 3, 4, 5].map(i => \`bottom-\${i}\`) }}
  orientation={Orientation.BOTTOM}
  style='medium'
  />
<Rules.PositioningRule
  elements={{ id: 'anchor' }}
  position={{ x: 250, y: 125 }}
  />
  <React.Fragment>
  {
    [1, 2, 3, 4, 5].map(i => (
      <Rules.DirectionalRule
        elements={{ id: \`bottom-\${i}\` }}
        orientation={ i % 2 == 0 ? Orientation.LEFT : Orientation.RIGHT }
        key={i}
      />
    ))
  }
  </React.Fragment>
`
    );
  });

  it('positions wide orientation styles correctly', async () => {
    await checkSimulationFragment(
`
<SimulatedElement id='anchor'>
  <Label text='anchor' />
</SimulatedElement>
<React.Fragment>
{
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(i => (
    <SimulatedElement id={\`right-\${i}\`} key={i}>
      <Label text={\`right \${i}\`} />
    </SimulatedElement>
  ))
}
  </React.Fragment>
<Rules.OrientingRule
  baseElementId='anchor'
  targetElements={{ ids: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(i => \`right-\${i}\`) }}
  orientation={Orientation.RIGHT}
  style='wide'
  />
<Rules.PositioningRule
  elements={{ id: 'anchor' }}
  position={{ x: 125, y: 250 }}
  />
  <React.Fragment>
  {
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(i => (
      <Rules.DirectionalRule
        elements={{ id: \`right-\${i}\` }}
        orientation={ i % 2 == 0 ? Orientation.TOP : Orientation.BOTTOM }
        key={i}
      />
    ))
  }
  </React.Fragment>
`
    );
  });

  it('can handle multiple elements bound by orienting rules', async () => {
    await checkSimulationFragment(
`
<SimulatedElement id='anchor'>
  <Label text='anchor' />
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
<Rules.PositioningRule elements={{ id: 'anchor' }} position={{ x: 250, y: 125 }} />
<Rules.OrientingRule
  baseElementId='anchor'
  targetElements={{ ids: [ 'bottom1', 'bottom2', 'bottom3', 'bottom4' ] }}
  orientation={Orientation.BOTTOM}
  style='wide'
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
  style='medium'
/>
<Grid />
`
    );

//<Rules.OrientingRule
  //baseElementId='bottom2'
  //targetElements={{ ids: [ 'bottom3', 'bottom4' ] }}
  //orientation={Orientation.RIGHT}
  //style='narrow'
  ///>
//<Rules.OrientingRule
  //baseElementId='bottom3'
  //targetElements={{ id: 'bottom4' }}
  //orientation={Orientation.RIGHT}
  //style='exact'
  ///>

  });
});
