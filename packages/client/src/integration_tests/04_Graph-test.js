import { checkGraphFragment } from './utils';

describe('Graph', () => {
  it('can render basic graphs', async () => {
    await checkGraphFragment(
`
  <CircleNode nodeId="red-node-1" color="#fc2f38" />
  <CircleNode nodeId="red-node-2" color="#fc2f38" />
  <CircleNode nodeId="blue-node-1" color="#5b41fc" />
  <CircleNode nodeId="blue-node-2" color="#5b41fc" />
  <CircleNode nodeId="yellow-node" color="#fcf95d" />
  <HtmlNode nodeId="green-node" link='https://google.com' >
    <p style={{ color: '#3ba226', margin: 0 }}>green</p>
  </HtmlNode>
  <Edge fromNodeId="red-node-1" toNodeId="yellow-node" directed={true} />
  <Edge fromNodeId="red-node-1" toNodeId="blue-node-1" curvature={2} directed={true} />
  <Edge fromNodeId="red-node-1" toNodeId="green-node" />
  <Edge fromNodeId="red-node-2" toNodeId="yellow-node" bidirectional={true} />
  <Edge fromNodeId="red-node-2" toNodeId="blue-node-1" />
  <Edge fromNodeId="red-node-2" toNodeId="blue-node-2" />
  <Edge fromNodeId="red-node-2" toNodeId="green-node" curvature={-3} bidirectional={true} />
  <Edge fromNodeId="blue-node-1" toNodeId="green-node" />
  <Edge fromNodeId="blue-node-1" toNodeId="yellow-node" directed={true} />
  <Edge fromNodeId="blue-node-2" toNodeId="green-node" />
`
    );
  });

  it('can renders labels correcly', async () => {
    await checkGraphFragment(
`
  <Node nodeId="red-node-1">
    <Label text="top left" orientation={Orientation.TOP_LEFT} />
    <Circle color="#fc2f38" />
  </Node>
  <CircleNode nodeId="red-node-2" color="#fc2f38" />
  <CircleNode nodeId="blue-node-1" color="#5b41fc" />
  <CircleNode nodeId="blue-node-2" color="#5b41fc" />
  <Node nodeId="yellow-node" link='https://example.com.com'>
    <Label text='bottom right link' orientation={Orientation.BOTTOM_RIGHT} />
    <Circle color="#fcf95d" />
  </Node>
  <CircleNode nodeId="green-node" color="#3ba226" />
  <Edge fromNodeId="red-node-1" toNodeId="yellow-node" distance={200} />
  <Edge fromNodeId="red-node-1" toNodeId="blue-node-1" distance={200} />
  <Edge fromNodeId="red-node-1" toNodeId="green-node" distance={200} curvature={1} />
  <Edge fromNodeId="red-node-2" toNodeId="yellow-node" distance={200} />
  <Edge fromNodeId="red-node-2" toNodeId="blue-node-1" distance={200} />
  <Edge fromNodeId="blue-node-1" toNodeId="green-node" distance={200} />
  <Edge fromNodeId="blue-node-1" toNodeId="yellow-node" distance={200} />
  <Edge fromNodeId="blue-node-2" toNodeId="green-node" distance={200} />
`
    );
  });
});
