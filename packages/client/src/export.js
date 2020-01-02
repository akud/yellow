import Arrow from './elements/Arrow';
import Circle from './elements/Circle';
import DisplayWindow from './elements/DisplayWindow';
import ElementContext from './elements/ElementContext';
import ElementGroup from './elements/ElementGroup';
import ElementProps from './elements/ElementProps';
import ElementPropTypes from './elements/ElementPropTypes';
import Image from './elements/Image';
import Label from './elements/Label';
import Line from './elements/Line';
import Point from './elements/Point';
import Rectangle from './elements/Rectangle';
import WindowContext from './elements/WindowContext';
import geometryUtils from './elements/geometry/geometry-utils';


import Orientation from './simulation/Orientation';
import Rules from './simulation/Rules';
import SimulatedElementGroup from './simulation/SimulatedElementGroup';
import SimulatedElement from './simulation/SimulatedElement';
import SimulatedLayout from './simulation/SimulatedLayout';
import SimulatedLink from './simulation/SimulatedLink';
import SimulationContext from './simulation/SimulationContext';
import SimulationWindow from './simulation/SimulationWindow';

import CircleNode from './graphs/CircleNode';
import Edge from './graphs/Edge';
import Graph from './graphs/Graph';
import ImageNode from './graphs/ImageNode';
import Node from './graphs/Node';
import PointNode from './graphs/PointNode';

export const Elements = {
  Arrow,
  Circle,
  DisplayWindow,
  ElementContext,
  ElementGroup,
  ElementProps,
  ElementPropTypes,
  Image,
  Label,
  Line,
  Point,
  Rectangle,
  WindowContext,
  geometryUtils,
}

export const Simulations = {
  Orientation,
  Rules,
  SimulatedElementGroup,
  SimulatedElement,
  SimulatedLayout,
  SimulatedLink,
  SimulationContext,
  SimulationWindow,
}

export const Graphs = {
  CircleNode,
  Edge,
  Graph,
  ImageNode,
  Node,
  PointNode,
}

export default Object.assign(
  { },
  { Elements, Simulations, Graphs },
  Elements,
  Simulations,
  Graphs
)
