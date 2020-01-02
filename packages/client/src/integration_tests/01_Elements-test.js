import { checkElementFragment } from './utils';

describe('Basic Element Display', () => {
  it('renders elements correctly', async () => {
    await checkElementFragment(
`
<Circle radius={20} color='red' position={{x: 100, y: 100}} />
<Label text='big' position={{x: 100, y: 100}} />
<Circle radius={10} color='blue' position={{x: 400, y: 400}} />
<Label text='small' position={{x: 400, y: 400}} />
<Line from={{x: 120, y: 120}} to={{x: 390, y: 390}} color='black' />
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
`
    );
  });
});
