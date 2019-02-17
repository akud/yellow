import GraphElementType from 'graph/GraphElementType';
import React from 'react';
import PropTypes from 'prop-types';
import { createDefaultGraphSimulation } from 'simulation/d3/ForceSimulation';
import { withExtraProps } from './component-utils';

const toSimulatedElement = c => c.type.toSimulatedElement(c.props);
const isNode = c => c.type.elementType === GraphElementType.NODE;
const isEdge = c => c.type.elementType === GraphElementType.EDGE;


export default class Graph extends React.Component {

  static defaultProps = {
    simulationCreator: createDefaultGraphSimulation,
    width: 500,
    height: 500,
    border: false,
    zoom: 1.0,
  }

  static propTypes = {
    simulationCreator: PropTypes.func,
    width: PropTypes.number,
    height: PropTypes.number,
    border: PropTypes.bool,
    zoom: PropTypes.number,
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
        nodes: this.nodes.map(toSimulatedElement),
        edges: this.edges.map(toSimulatedElement),
        width: this.props.width / this.props.zoom,
        height: this.props.height / this.props.zoom,
      }).onNewLayout(simulation => this.setState({ simulation }))
    }
  }

  render() {
    const { simulation } = this.state;
    const { width, height, border, zoom } = this.props;
    const { nodes, edges, other } = this;

    return (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        viewBox={`0 0 ${width/zoom} ${height/zoom}`}
        width={width}
        height={height}
        style={ border ? { border: '1px solid black' } : {} }
      >
        <g className="yellow-graph">
          <g className="nodes">
            {
              withExtraProps(
                nodes,
                childProps => ({ position: simulation.getNodePosition(childProps.nodeId) })
              )
            }
          </g>
          <g className="edges">
            {
              withExtraProps(
                edges,
                childProps => ({
                  position: simulation.getEdgePosition(
                    childProps.fromNodeId,
                    childProps.toNodeId
                  )
                })
              )
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
