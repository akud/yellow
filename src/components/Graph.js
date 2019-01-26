import GraphElementType from 'graph/GraphElementType';
import React from 'react';
import PropTypes from 'prop-types';
import D3ForceSimulation from 'simulation/D3ForceSimulation';

const copyProps = c => Object.assign({}, c.props);
const isNode = c => c.type.elementType === GraphElementType.NODE;
const isEdge = c => c.type.elementType === GraphElementType.EDGE;


export default class Graph extends React.Component {

  static defaultProps = {
    simulationCreator: options => new D3ForceSimulation(options),
    width: 500,
    height: 500,
    border: false,
  }

  static propTypes = {
    simulationCreator: PropTypes.func,
    width: PropTypes.number,
    height: PropTypes.number,
    border: PropTypes.bool,
  }

  constructor(props) {
    super(props);

    this.nodes = [];
    this.edges = [];
    this.other = [];

    (this.props.children || []).forEach(c => {
      if (isNode(c)) {
        this.nodes.push(c);
      } else if (isEdge(c)) {
        this.edges.push(c);
      } else {
        this.other.push(c);
      }
    });

    this.state = {
      simulation: this.props.simulationCreator({
        nodes: this.nodes.map(copyProps),
        edges: this.edges.map(copyProps),
        width: this.props.width,
        height: this.props.height,
      }).onNewLayout(simulation => this.setState({ simulation }))
    }
  }

  render() {
    const { simulation } = this.state;
    const { width, height, border } = this.props;
    const { nodes, edges, other } = this;

    return (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        viewBox={`0 0 ${width} ${height}`}
        width={width}
        height={height}
        style={ border ? { border: '1px solid black' } : {} }
      >
        <g className="yellow-graph">
          <g className="nodes">
            {
              React.Children.map(nodes, child => React.cloneElement(
                child,
                { position: simulation.getNodePosition(child.props.nodeId) }
              ))
            }
          </g>
          <g className="edges">
            {
              React.Children.map(edges, child => React.cloneElement(
                child,
                {
                  position: simulation.getEdgePosition(
                    child.props.fromNodeId,
                    child.props.toNodeId
                  )
                }
              ))
            }
          </g>
          <g className="other">
            {other}
          </g>
        </g>
      </svg>
    );
  }
}
