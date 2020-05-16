import YellowArrow from './elements/Arrow';
import YellowCircle from './elements/Circle';
import YellowCurve from './elements/Curve';
import YellowDisplayWindow from './elements/DisplayWindow';
import YellowElementContext from './elements/ElementContext';
import YellowElementGroup from './elements/ElementGroup';
import YellowElementProps from './elements/ElementProps';
import YellowGrid from './elements/Grid';
import YellowElementPropTypes from './elements/ElementPropTypes';
import YellowHtmlFragment from './elements/HtmlFragment';
import YellowImage from './elements/Image';
import YellowLabel from './elements/Label';
import YellowLine from './elements/Line';
import YellowLink from './elements/Link';
import YellowPoint from './elements/Point';
import YellowRectangle from './elements/Rectangle';
import YellowWindowContext from './elements/WindowContext';
import YellowGeometryUtils from './elements/geometry/geometry-utils';

import YellowOrientation from './simulation/Orientation';
import YellowRules from './simulation/Rules';
import YellowSimulatedElementGroup from './simulation/SimulatedElementGroup';
import YellowSimulatedElement from './simulation/SimulatedElement';
import YellowSimulatedLayout from './simulation/SimulatedLayout';
import YellowSimulatedLink from './simulation/SimulatedLink';
import YellowSimulationContext from './simulation/SimulationContext';
import YellowSimulationWindow from './simulation/SimulationWindow';

import YellowCircleNode from './graphs/CircleNode';
import YellowEdge from './graphs/Edge';
import YellowGraph from './graphs/Graph';
import YellowHtmlNode from './graphs/HtmlNode';
import YellowImageNode from './graphs/ImageNode';
import YellowNode from './graphs/Node';
import YellowPointNode from './graphs/PointNode';

export const Elements = {
  Arrow: YellowArrow,
  Circle: YellowCircle,
  Curve: YellowCurve,
  DisplayWindow: YellowDisplayWindow,
  ElementContext: YellowElementContext,
  ElementGroup: YellowElementGroup,
  ElementProps: YellowElementProps,
  ElementPropTypes: YellowElementPropTypes,
  Grid: YellowGrid,
  HtmlFragment: YellowHtmlFragment,
  Image: YellowImage,
  Label: YellowLabel,
  Line: YellowLine,
  Link: YellowLink,
  Point: YellowPoint,
  Rectangle: YellowRectangle,
  WindowContext: YellowWindowContext,
  geometryUtils: YellowGeometryUtils,
}
export const Arrow = YellowArrow
export const Circle = YellowCircle
export const Curve = YellowCurve
export const DisplayWindow = YellowDisplayWindow
export const ElementContext = YellowElementContext
export const ElementGroup = YellowElementGroup
export const ElementProps = YellowElementProps
export const ElementPropTypes = YellowElementPropTypes
export const HtmlFragment = YellowHtmlFragment
export const Image = YellowImage
export const Label = YellowLabel
export const Line = YellowLine
export const Link = YellowLink
export const Point = YellowPoint
export const Rectangle = YellowRectangle
export const WindowContext = YellowWindowContext
export const geometryUtils = YellowGeometryUtils

export const Simulations = {
  Orientation: YellowOrientation,
  Rules: YellowRules,
  SimulatedElementGroup: YellowSimulatedElementGroup,
  SimulatedElement: YellowSimulatedElement,
  SimulatedLayout: YellowSimulatedLayout,
  SimulatedLink: YellowSimulatedLink,
  SimulationContext: YellowSimulationContext,
  SimulationWindow: YellowSimulationWindow,
  ...YellowRules,
  ...YellowOrientation
}

export const Orientation = YellowOrientation
export const Rules = YellowRules
export const SimulatedElementGroup = YellowSimulatedElementGroup
export const SimulatedElement = YellowSimulatedElement
export const SimulatedLayout = YellowSimulatedLayout
export const SimulatedLink = YellowSimulatedLink
export const SimulationContext = YellowSimulationContext
export const SimulationWindow = YellowSimulationWindow

export const Graphs = {
  CircleNode: YellowCircleNode,
  Edge: YellowEdge,
  Graph: YellowGraph,
  HtmlNode: YellowHtmlNode,
  ImageNode: YellowImageNode,
  Node: YellowNode,
  PointNode: YellowPointNode,
}

export const CircleNode = YellowCircleNode
export const Edge = YellowEdge
export const Graph = YellowGraph
export const HtmlNode = YellowHtmlNode
export const ImageNode = YellowImageNode
export const Node = YellowNode
export const PointNode = YellowPointNode

export default Object.assign(
  { },
  { Elements, Simulations, Graphs },
  Elements,
  Simulations,
  Graphs
)
