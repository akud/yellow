import { check, checkElementFragment } from './utils';

describe('Basic Element Display', () => {
  it('renders elements correctly', async () => {
    await checkElementFragment(
`
<Circle radius={20} color='red' position={{x: 100, y: 100}} />
<Label text='big' position={{x: 100, y: 100}} />
<Circle radius={10} color='blue' position={{x: 400, y: 400}} />
<Label text='small' position={{x: 400, y: 400}} />
<Line from={{x: 120, y: 120}} to={{x: 390, y: 390}} color='black' />
<HtmlFragment position={{ x: 250, y: 100 }} link='https://google.com'>
  <p>This is <b>html</b></p>
</HtmlFragment>
<Arrow
  thickness={2}
  to={{x: 120, y: 120}}
  color='black'
  angle={geometryUtils.computeHorizontalIntersectionAngle(
    { x: 400, y: 400 },
    { x: 100, y: 100 },
  )}
  />
<Arrow
  to={{x: 390, y: 390}}
  color='black'
  angle={geometryUtils.computeHorizontalIntersectionAngle(
    { x: 100, y: 100 },
    { x: 400, y: 400 },
  )}
  />
  <Link href='https://example.com'>
    <ElementGroup>
      <Label text='linked circle' position={{x: 100, y: 400}} />
      <Circle position={{x: 120, y: 420}} />
    </ElementGroup>
  </Link>
  <ElementGroup link={{ href: 'https://example.com', inline: true }}>
    <Label text='linked square' position={{x: 400, y: 100}} />
    <Rectangle position={{x: 420, y: 120}} width={10} height={10} />
  </ElementGroup>
`
    );
  });

  it('renders curves correctly', async () => {
    await checkElementFragment(
`
<Circle radius={2} color='red' position={{ x: 100, y: 250 }} />
<Circle radius={2} color='red' position={{ x: 400, y: 200 }} />
<Curve
  id='4'
  from={{ x: 100, y: 250 }}
  to={{ x: 400, y: 200 }}
  curvature={4}
  />
<Curve
  id='3'
  from={{ x: 100, y: 250 }}
  to={{ x: 400, y: 200 }}
  curvature={3}
  />
<Curve
  id='2'
  from={{ x: 100, y: 250 }}
  to={{ x: 400, y: 200 }}
  curvature={2}
  />
<Curve
  id='1'
  from={{ x: 100, y: 250 }}
  to={{ x: 400, y: 200 }}
  curvature={1}
  />
<Curve
  id='-1'
  from={{ x: 100, y: 250 }}
  to={{ x: 400, y: 200 }}
  curvature={-1}
  />
<Curve
  id='-2'
  from={{ x: 100, y: 250 }}
  to={{ x: 400, y: 200 }}
  curvature={-2}
  />
<Curve
  id='-3'
  from={{ x: 100, y: 250 }}
  to={{ x: 400, y: 200 }}
  curvature={-3}
  />
<Curve
  id='-4'
  from={{ x: 100, y: 250 }}
  to={{ x: 400, y: 200 }}
  curvature={-4}
  />
`
    );
  });

  it('can set a background on the window', async () => {
    await check(
      `import React from 'react';
import DisplayWindow from '../elements/DisplayWindow';
import Circle from '../elements/Circle';
import HtmlFragment from '../elements/HtmlFragment';

export default () => (
  <DisplayWindow background='rgba(100, 100, 100, 0.5)'>
    <Circle position={{ x: 250, y: 250 }} />
    <HtmlFragment position={{ x: 300, y: 300 }}>
      <button style={{ borderRadius: '5px' }}>Rounded</button>
    </HtmlFragment>
  </DisplayWindow>
)`
    );
  });
});
