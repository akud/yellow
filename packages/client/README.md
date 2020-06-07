# Yellow


Welcome to Yellow! Yellow is a library of React components for rendering
[simulated](https://github.com/d3/d3/blob/master/API.md#forces-d3-force) graphs.
Yellow has components for rendering basic graphs,

![yellow-main](https://raw.githubusercontent.com/akud/yellow/master/packages/client/yellow-main.png)

```javascript
import React from 'react';
import { Graphs } from '@akud/yellow-client';

export default () => {
  return (
    <Graphs.Graph>
      <Graphs.CircleNode nodeId="red-node" color="#fc2f38" />
      <Graphs.CircleNode nodeId="blue-node" color="#5b41fc" />
      <Graphs.CircleNode nodeId="yellow-node" color="#fcf95d" />
      <Graphs.CircleNode nodeId="green-node" color="#3ba226" />
      <Graphs.Edge fromNodeId="yellow-node" toNodeId="red-node" />
      <Graphs.Edge fromNodeId="yellow-node" toNodeId="blue-node" directed={true} />
      <Graphs.Edge fromNodeId="yellow-node" toNodeId="green-node" />
      <Graphs.Edge fromNodeId="blue-node" toNodeId="green-node" />
      <Graphs.Edge fromNodeId="blue-node" toNodeId="red-node" directed={true} />
      <Graphs.Edge fromNodeId="green-node" toNodeId="red-node" />
    </Graphs.Graph>
  )
}
```

for controlling their layouts with simulated forces,

![sample-architecture-diagram](https://raw.githubusercontent.com/akud/yellow/master/packages/client/sample-architecture-diagram.png)

```javascript
import React from 'react';

import { Elements, Simulations, Graphs } from '@akud/yellow-client';

export default ({ width=1000, height=1000 }) => (
  <Graphs.Graph width={width} height={height} border={true}>
    <Graphs.Node nodeId="event-queue">
      <Elements.Label text='Event Queue' orientation={Simulations.Orientation.TOP_LEFT} />
      <Elements.Circle color="#fcf95d" />
    </Graphs.Node>
    <Graphs.Node nodeId="service-a">
      <Elements.Label text='Web Service' orientation={Simulations.Orientation.TOP_LEFT} />
      <Elements.Circle color="#2980B9" />
    </Graphs.Node>
    <Graphs.Node nodeId="service-b">
      <Elements.Label text='Web Service' orientation={Simulations.Orientation.TOP_LEFT} />
      <Elements.Circle color="#2980B9" />
    </Graphs.Node>
    <Graphs.Node nodeId="service-c">
      <Elements.Label text='Web Service' orientation={Simulations.Orientation.TOP_LEFT} />
      <Elements.Circle color="#2980B9" />
    </Graphs.Node>
    <Graphs.Node nodeId="client-a">
      <Elements.Label text='Client' orientation={Simulations.Orientation.TOP_LEFT} />
      <Elements.Circle color="#8c28b7" />
    </Graphs.Node>
    <Graphs.Node nodeId="client-c">
      <Elements.Label text='Client' orientation={Simulations.Orientation.TOP_LEFT} />
      <Elements.Circle color="#8c28b7" />
    </Graphs.Node>
    <Graphs.Node nodeId="data-lake">
      <Elements.Label text='Data Lake' orientation={Simulations.Orientation.TOP_LEFT} />
      <Elements.Circle color="#28b92b" />
    </Graphs.Node>

    <Graphs.Edge fromNodeId="event-queue" toNodeId="service-a" bidirectional={true} />
    <Graphs.Edge fromNodeId="event-queue" toNodeId="service-c" bidirectional={true} />
    <Graphs.Edge fromNodeId="event-queue" toNodeId="data-lake" directed={true} />
    <Graphs.Edge fromNodeId="service-b" toNodeId="service-a" bidirectional={true} />
    <Graphs.Edge fromNodeId="service-b" toNodeId="service-c" bidirectional={true} />
    <Graphs.Edge fromNodeId="service-a" toNodeId="client-a" bidirectional={true} />
    <Graphs.Edge fromNodeId="service-c" toNodeId="client-c" bidirectional={true} />


    <Simulations.CenteringRule elements={{ groupId: 'event-queue' }} />
    <Simulations.DirectionalRule
      elements={{ groupIds: ['service-a'] }}
      orientation={Simulations.Orientation.TOP_RIGHT}
      strength={25.0}
    />
    <Simulations.DirectionalRule
      elements={{ groupIds: ['client-a'] }}
      orientation={Simulations.Orientation.TOP_RIGHT}
      strength={50.0}
    />
    <Simulations.DirectionalRule
      elements={{ groupIds: ['service-c'] }}
      orientation={Simulations.Orientation.BOTTOM_RIGHT}
      strength={25.0}
    />
    <Simulations.DirectionalRule
      elements={{ groupIds: ['client-c'] }}
      orientation={Simulations.Orientation.BOTTOM_RIGHT}
      strength={50.0}
    />
    <Simulations.DirectionalRule
      elements={{ groupIds: ['data-lake'] }}
      orientation={Simulations.Orientation.LEFT}
      strength={50.0}
    />
  </Graphs.Graph>
);
```

and [more](#simulations). The great thing about yellow is that
any React component can be embedded inside an [HtmlNode](#html-node),
so you can create graphical organization of any type of content.


# API Reference

There are three top-level concepts in Yellow's architecture that form
the ability to render graphs -
[Elements](https://github.com/akud/yellow/tree/master/packages/client/src/elements), [Simulations](https://github.com/akud/yellow/tree/master/packages/client/src/simulation), and [Graphs](https://github.com/akud/yellow/tree/master/packages/client/src/graphs). Each of these is an importable name from `@akud/yellow-client`, and all components can be imported directly.


## <a name="elements">Elements</a>

![basic_elements](https://raw.githubusercontent.com/akud/yellow/master/packages/client/basic_elements.png)

```javascript
import React from 'react';
import {
  Elements
} from '@akud/yellow-client';

<Elements.DisplayWindow border={true}>
  <Elements.Circle radius={2} color='red' position={{ x: 100, y: 250 }} />
  <Elements.Circle radius={2} color='red' position={{ x: 400, y: 200 }} />
  <Elements.Curve
    id='4'
    from={{ x: 100, y: 250 }}
    to={{ x: 400, y: 200 }}
    curvature={4}
    />
  <Elements.Curve
    id='3'
    from={{ x: 100, y: 250 }}
    to={{ x: 400, y: 200 }}
    curvature={3}
    />
  <Elements.Curve
    id='2'
    from={{ x: 100, y: 250 }}
    to={{ x: 400, y: 200 }}
    curvature={2}
    />
  <Elements.Curve
    id='1'
    from={{ x: 100, y: 250 }}
    to={{ x: 400, y: 200 }}
    curvature={1}
    />
  <Elements.Curve
    id='-1'
    from={{ x: 100, y: 250 }}
    to={{ x: 400, y: 200 }}
    curvature={-1}
    />
  <Elements.Curve
    id='-2'
    from={{ x: 100, y: 250 }}
    to={{ x: 400, y: 200 }}
    curvature={-2}
    />
  <Elements.Curve
    id='-3'
    from={{ x: 100, y: 250 }}
    to={{ x: 400, y: 200 }}
    curvature={-3}
    />
  <Elements.Curve
    id='-4'
    from={{ x: 100, y: 250 }}
    to={{ x: 400, y: 200 }}
    curvature={-4}
    />
</Elements.DisplayWindow>
```

The `Elements` namespace contains basic components for rendering a
static svg. When used directly, these components need to be passed a
position inside the svg. They will normally be used inside of components
from the `Simulations` and `Graphs` namespaces to be positioned automatically.

---


* <a name="arrow" href="https://github.com/akud/yellow/blob/master/packages/client/src/elements/Arrow.js">`Arrow`</a> - renders an arrow pointing at the desired position

  Props:

  * `to`: [#element-prop-types-position](ElementPropTypes.position).
  Position the arrow points to. Required

  * `color`: PropTypes.string. Color string like `'#4286f4'` or `green`.
  Optional.

  * `thickness`: PropTypes.number. Thickness of the arrow. Optional.

  * `angle`: PropTypes.number. Angle at which the arrow should be rendered.
  Optional.

  * `link`: [ElementPropTypes.link](#element-prop-types-link) Optional link object describing a web page for the object to link to

* <a name="circle" href="https://github.com/akud/yellow/blob/master/packages/client/src/elements/Circle.js">`Circle`</a> - renders a circle centered at the given position

  Props:

  * `id`: PropTypes.string - optional id for the element. Will be set as `data-element-id` on the rendered circle. This is used by the simulation to track elements.

  * `position`: ElementPropTypes.position - circle center

  * `color`: PropTypes.string - circle color. Defaults to `#4286f4`

  * `radius`: PropTypes.number - circle radius. Defaults to 10

  * `link`: [ElementPropTypes.link](#element-prop-types-link) Optional link
  object describing a web page for the object to link to

* <a name="curve" href="https://github.com/akud/yellow/blob/master/packages/client/src/elements/Curve.js">`Curve`</a> - renders a curve between the given points

  Props:

  * `id`: PropTypes.string - optional id for the element. Will be set as `data-element-id` on the rendered circle. This is used by the simulation to track elements.

  * `color`: PropTypes.string - curve color. Defaults to `#c7c7c7`

  * `from`: ElementPropTypes.position - curve starting point

  * `to`: ElementPropTypes.position - curve ending point

  * `thickness`: PropTypes.number - thickness of the curve

  * `curvature`: [#element-prop-types-curvature](ElementPropTypes.curvature) - one of `-4`,`-3`,`-2`,`-1`,`1`,`2`,`3`,`4` denoting the curvature. Negative numbers denote convex curves, positive number concave curves.

* <a name="display-window" href="https://github.com/akud/yellow/blob/master/packages/client/src/elements/DisplayWindow.js">`DisplayWindow`</a> - top-level wrapper component for holding elements. Renders `children` inside an svg with the provided size.

  Props:

  * `width`: PropTypes.number - width of the svg. Defaults to 500

  * `height`: PropTypes.number - height of the svg. Defaults to 500

  * `border`: PropTypes.bool - boolean indicating if a border should be drawn around the svg. Defaults to false.

  * `zoom`: PropTypes.number - multiplier determining the zoom level inside
  the window

* <a name="element-group" href="https://github.com/akud/yellow/blob/master/packages/client/src/elements/ElementGroup.js">`ElementGroup`</a> - renders `children` inside a `<g>` tag. Forwards all props to the `<g>` tag.

* <a name='element-prop-types-link' href="https://github.com/akud/yellow/blob/master/packages/client/src/elements/ElementPropTypes.js">ElementPropTypes.link</a> - Defines a link prop type for linking to a web page

  ```javascript
  export const link = PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.exact({
      href: PropTypes.string.isRequired,
      inline: PropTypes.bool,
      className: PropTypes.string,
    }),
  ]);
  ```
  If a string is provided, the element will link to that url. the
  `inline` prop determines whether the link will open in a new window
  (`inline={false}`) or in the same browser window (`inline={true}`).
  `className` is set on the wrapping `a` tag.

* <a name='element-prop-types-position'
  href="https://github.com/akud/yellow/blob/master/packages/client/src/elements/ElementPropTypes.js">ElementPropTypes.position</a>
- Determines an element's position in svg space. For the most
part this prop should be passed in automatically by `Simulations` or
`Graphs`.

  ```javascript
  export const position = PropTypes.exact({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  });
  ```

* <a name='element-prop-types-curvature' href="https://github.com/akud/yellow/blob/master/packages/client/src/elements/ElementPropTypes.js">ElementPropTypes.curvature</a> - Determines the curvature of a line or edge, from a max concavity
(`curvature=4`) to a max convexity (`curvature=-4`)

  ```javascript
  export const curvature = PropTypes.oneOf([
    4, 3, 2, 1, -1, -2, -3, -4,
    '4', '3', '2', '1', '-1', '-2', '-3', '-4',
  ]);
  ```
* <a name='grid' href="https://github.com/akud/yellow/blob/master/packages/client/src/elements/Grid.js">Grid</a> - Renders a grid cooridnate system on the current display window

  Props:

  * `color`: PropTypes.string - color to use to render the grid points

  * `stepsPerSide`: PropTypes.number - number of steps to take per side when laying out the grid

* <a name="html-fragment" href="https://github.com/akud/yellow/blob/master/packages/client/src/elements/HtmlFragment.js">`HtmlFragment`</a> - renders `children` inside an html fragment centered at the given position

  Props:

  * `id`: PropTypes.string - optional id for the element. Will be set as `data-element-id` on the rendered element. This is used by the simulation to track elements.

  * `position`: ElementPropTypes.position - fragment center

  * `link`: [ElementPropTypes.link](#element-prop-types-link) Optional link
  object describing a web page for the object to link to

* <a name="image" href="https://github.com/akud/yellow/blob/master/packages/client/src/elements/Image.js">`Image`</a> - renders an image

  Props:

  * `id`: PropTypes.string - optional id for the element. Will be set as `data-element-id` on the rendered image. This is used by the simulation to track elements.

  * `position`: ElementPropTypes.position - image center

  * `src`: PropTypes.string.isRequired - image source

  * `width`: PropTypes.number.isRequired - width to render the image as

  * `height`: PropTypes.number.isRequired - height to render the image as

  * `link`: [ElementPropTypes.link](#element-prop-types-link) Optional link
object describing a web page for the object to link to

* <a name="label" href="https://github.com/akud/yellow/blob/master/packages/client/src/elements/Label.js">`Label`</a> - renders svg text centered at the given position

  Props:

  * `id`: PropTypes.string - optional id for the element. Will be set as `data-element-id` on the rendered text element. This is used by the simulation to track elements.

  * `text`: PropTypes.string.isRequired - the text to render

  * `position`: ElementPropTypes.position - label center

  * `link`: [ElementPropTypes.link](#element-prop-types-link) Optional link
  object describing a web page for the object to link to

* <a name="line" href="https://github.com/akud/yellow/blob/master/packages/client/src/elements/Line.js">`Line`</a> - renders a line between the given points

  Props:

  * `from`: ElementPropTypes.position.isRequired - line starting point

  * `to`: ElementPropTypes.position.isRequired - line ending point

  * `color`: PropTypes.string - line color. Defaults to `#c7c7c7`

  * `thickness`: PropTypes.number - line thickness

* <a name="link" href="https://github.com/akud/yellow/blob/master/packages/client/src/elements/Link.js">`Link`</a> - renders `children` in an `<a>` tag to link to a web page.

  Props:

  * `href`: PropTypes.string.isRequired - location to link to

  * `inline`: PropTypes.bool - whether to open the link inline (in the same
  browser tab) or not. Defaults to false, opening links in a new window

  * `className`: PropTypes.string - optional class name to set on the
  wrapping `a` tag

* <a name="rectangle" href="https://github.com/akud/yellow/blob/master/packages/client/src/elements/Rectangle.js">`Rectangle`</a> - renders a rectangle centered at the given position

  Props:

  * `id`: PropTypes.string - optional id for the element. Will be set as `data-element-id` on the rendered rectangle. This is used by the simulation to track elements.

  * `position`: ElementPropTypes.position - rectangle center

  * `color`: PropTypes.string - rectangle color. Defaults to `#4286f4`

  * `width`: PropTypes.number - rectangle width. Defaults to 10

  * `height`: PropTypes.number - rectangle height. Defaults to 10

* <a name="window-context" href="https://github.com/akud/yellow/blob/master/packages/client/src/elements/WindowContext.js">`WindowContext`</a> - [Context](https://reactjs.org/docs/context.html) that provides basic information about the window. Will be provided by [DisplayWindow](#display-window)

  ```javascript
  const WindowContext = React.createContext({
    width: 500,
    height: 500,
    center: { x: 250, y: 250 },
  });
  ```


## <a name="simulations">Simulations</a>

![simulations](https://raw.githubusercontent.com/akud/yellow/master/packages/client/simulation.gif)

```javascript
import React from 'react';
import {
  Elements, Simulations
} from '@akud/yellow-client';

export default () => (
  <Simulations.SimulationWindow>

    <Simulations.SimulatedElement id='centered'>
      <Elements.Label text='Center' />
    </Simulations.SimulatedElement>

    <Simulations.SimulatedElement id='rectangle-1'>
      <Elements.Rectangle color='red' />
    </Simulations.SimulatedElement>

    <Simulations.SimulatedElement id='rectangle-2'>
      <Elements.Rectangle color='red' />
    </Simulations.SimulatedElement>

    <Simulations.SimulatedElementGroup id='circle1'>
      <Elements.Circle />
      <Elements.Label text='circle1' />
    </Simulations.SimulatedElementGroup>

    <Simulations.SimulatedElementGroup id='circle2'>
      <Elements.Circle />
      <Elements.Label text='circle2' />
    </Simulations.SimulatedElementGroup>

    <Simulations.SimulatedElementGroup id='circle3'>
      <Elements.Circle />
      <Elements.Label text='circle3' orientation={Simulations.TOP_RIGHT} />
    </Simulations.SimulatedElementGroup>

    <Simulations.CenteringRule elements={{ id: 'centered' }} />

    <Simulations.DirectionalRule
      elements={{ ids: [ 'rectangle-1', 'rectangle-2' ] }}
      orientation={Simulations.TOP}
      strength={2.0}
    />

    <Simulations.DirectionalRule
      elements={{ groupIds: [ 'circle1', 'circle2' ] }}
      orientation={Simulations.BOTTOM_LEFT}
    />

    <Simulations.OrientingRule
      baseElementId={Simulations.SimulatedElementGroup.getPrimaryElementId('circle-1')}
      targetElements={{ groupIds: [ 'circle-2', 'circle-3' ] }}
      orientation={Simulations.LEFT}
    />
  </Simulations.SimulationWindow>
)
```

The `Simulations` namespace provides the backbone of yellow's layout
engine. Under the hood, Yellow runs a
[d3 force simulation](https://github.com/d3/d3/blob/master/API.md#forces-d3-force)
to guide elements to their desired position determined by a set of
basic forces and user-defined [Rules](#rules). The main components
are [SimulationWindow)](#simulation-window),
[SimulatedElement](#simulated-element), and
[SimulatedElementGroup](#simulated-element-group). Elements and
Groups inside a Window will render with positions determined by
a force-particle simulation. Each element is simulated as a circle
with a certain radius whose motion is affected by the
[ForceApplications](#force-application) returned by rules in the
simulation. All simulations have a basic repelling force
where elements exert a repelling force on each other, though
that can be changed with
[SimulationContext#setRepellingForceStrength](#simulation-context).

---

* <a name='orientation' href='https://github.com/akud/yellow/blob/master/packages/client/src/simulation/Orientation.js'>Orientation</a> - enumeration of orientations available in a simulation.

  ```
  TOP_LEFT
  TOP
  TOP_RIGHT
  RIGHT
  BOTTOM_RIGHT
  BOTTOM
  BOTTOM_LEFT
  LEFT
  UNSPECIFIED
  PRIMARY
  ```

  These can be used in
  [SimulatedElementGroups](#simulated-element-group),
  [DirectionalRules](#directional-rule) and
  [OrientingRules](#orienting-rule).

* <a name='rules' href='https://github.com/akud/yellow/blob/master/packages/client/src/simulation/Rules.js'>Rules</a> - module containing embeddable `Rule` components to
interact with the [SimulationContext)](#simulation-context). Each `Rule`
component is also accessible as a top level property of `Simulations`.

  * <a name='directional-rule' href='https://github.com/akud/yellow/blob/master/packages/client/src/simulation/Rules.js'>DirectionalRule</a> - Rule that pushes elements in a direction

    Props:

    * `elements`: SimulationPropTypes.elementSelector.isRequired -
      [ElementSelector](#simulation-prop-types-element-selector)
      determing the elements this rule should apply to

    * `orientation`: PropTypes.oneOf(Object.values(Orientation)).isRequired - direction the elements should be pushed in

    * `strength`: PropTypes.number - strength multiplier for the rule

  * <a name='positioning-rule' href='https://github.com/akud/yellow/blob/master/packages/client/src/simulation/Rules.js'>PositioningRule</a> - Rule that pushes elements towards a position

    Props:

    * `elements`: SimulationPropTypes.elementSelector.isRequired -
      [ElementSelector](#simulation-prop-types-element-selector)
      determing the elements this rule should apply to

    * `position`:
      [ElementPropTypes.position.isRequired](#element-prop-types-position) - x, y coordinates of the position that elements should be pushed towards

    * `strength`: PropTypes.number - strength multiplier for the rule

  * <a name='centering-rule' href='https://github.com/akud/yellow/blob/master/packages/client/src/simulation/Rules.js'>CenteringRule</a> - Rule that pushes elements towards the window center

    Props:

    * `elements`: SimulationPropTypes.elementSelector.isRequired -
      [ElementSelector](#simulation-prop-types-element-selector)
      determing the elements this rule should apply to

    * `strength`: PropTypes.number - strength multiplier for the rule

  * <a name='orienting-rule' href='https://github.com/akud/yellow/blob/master/packages/client/src/simulation/Rules.js'>OrientingRule</a> - Rule that orients a group of elements relative to a base element

    Props:

    * `baseElementId`: PropTypes.string.isRequired - element id of the element to
       use as the base.  Other elements will be pushed to be oriented relative to this one.

    * `targetElements`: SimulationPropTypes.elementSelector.isRequired -
      [ElementSelector](#simulation-prop-types-element-selector)
      determing the elements this rule should apply to

    * `orientation`: PropTypes.oneOf(Object.values(Orientation)).isRequired - orientation
      determining the desired positioning of the target elements
      relative to the base element.

    * `strength`: PropTypes.number - strength multiplier for the rule

    * `style`: PropTypes.oneOf([ 'exact', 'narrow', 'medium', 'wide', ]) - enum determining
      the rule's tolerance

  * <a name='linking-rule' href='https://github.com/akud/yellow/blob/master/packages/client/src/simulation/Rules.js'>LinkingRule</a> - Rule that links two elements together, acting on them both to keep them a desired distance apart.

    Props:

    * `between`: PropTypes.arrayOf(PropTypes.string).isRequired -
      two-element array of element ids to apply the rule to

    * `distance`: PropTypes.number.isRequired - desired distance to keep
      the two elements apart

    * `strength`: PropTypes.number - strength multiplier for the rule

  * <a name='binding-rule' href='https://github.com/akud/yellow/blob/master/packages/client/src/simulation/Rules.js'>BindingRule</a> - Rule that binds a set of target elements to a base element, acting only on the target elements to keep them a desired distance away from the base element.

    Props:

    * `baseElementId`: PropTypes.string.isRequired - element id of the element to
       use as the base.  Other elements will be pushed to be kept a desired distance away from this one.

    * `targetElements`: SimulationPropTypes.elementSelector.isRequired -
      [ElementSelector](#simulation-prop-types-element-selector)
      determing the elements this rule should apply to

    * `distance`: PropTypes.number.isRequired - desired distance to keep
      the target elements from the base elements

    * `strength`: PropTypes.number - strength multiplier for the rule

  * <a name='function-rule' href='https://github.com/akud/yellow/blob/master/packages/client/src/simulation/Rules.js'>FunctionRule</a> - Rule that runs a function to determine forces to apply at each simulation iteration

    Props:

    * `rule`: PropTypes.func.isRequired - function with signature
      ([simulation](https://github.com/akud/yellow/blob/master/packages/client/src/simulation/force/ForceSimulation.js)) =&gt; [[ForceApplication]((https://github.com/akud/yellow/blob/master/packages/client/src/simulation/force/ForceApplication.js), ...] that will be passed the simulation object (for retrieving current element data) and should return an array of ForceApplication objects determining forces to apply in the next iteration of the simulation

  * <a name='repelling-rule' href='https://github.com/akud/yellow/blob/master/packages/client/src/simulation/Rules.js'>RepellingRule</a> - Sets the simulation-wide repelling force strength

    Props:

    * `strength`: PropTypes.number - strength multiplier for the
      simulation-wide repelling force

* <a name='simulated-element' href='https://github.com/akud/yellow/blob/master/packages/client/src/simulation/simulated-element.js'>SimulatedElement</a> Wraps a single [Element](#elements) and positions it based on the current [SimulationContext](#simulation-context)

  Props:

  * `id`: PropTypes.string.isRequired - id to use for the element in the
    simulation

* <a name='simulated-element-group' href='https://github.com/akud/yellow/blob/master/packages/client/src/simulation/simulated-elementGroup.js'>SimulatedElementGroup</a> - Wraps a group of [Elements](#elements) and binds them around a primary element. This component will read an `orientation` prop off of all children to determine the primary element and how to orient the others around the primary element. The primary element is the first element with no orientation or `orientation={Orientation.PRIMARY}`

  Props:

  * `id`: PropTypes.string.isRequired - id to use for the element group. The primary element will
    have an element id of `id + "_primary"`.

  * `className`: PropTypes.string - optional class name to set on the
    `g` tag

  * `bindingStrength`: PropTypes.number - optional strength to set on
    the rules that bind elements together

* <a name='simulated-link' href='https://github.com/akud/yellow/blob/master/packages/client/src/simulation/SimulatedLink.js'>SimulatedLink</a> - links two elements in the simulation together and passes their positions to a render prop. This is used to render edges between nodes in a graph

  Props:

  * `render`: PropTypes.func.isRequired - function with signature `(sourcePosition, targetPosition) => </>` that will be passed the positions of the two elements and can return children to be rendered

  * `fromElementId`: PropTypes.string.isRequired -  the "source" of the link, whose position will be passed as `sourcePosition`

  * `toElementId`: PropTypes.string.isRequired - the "target" of the link, whose position will be passed as `targetPosition`

  * `distance`: PropTypes.number - distance to keep the elements apart.
    Defaults to 100.

  * `bindingStrength`: PropTypes.number - strength to use in the rule
    that links the two elements

* <a name='simulation-context' href='https://github.com/akud/yellow/blob/master/packages/client/src/simulation/SimulationContext.js'>SimulationContext</a> - [Context](https://reactjs.org/docs/context.html) that delivers the core functionality of Yellow simulations. This will be provided by a [SimulationWindow](#simulation-window).

  ```javascript
  export default React.createContext({

    /**
     * String identifying the current simulation context
     */
    contextId: 'default-simulation-context',

    /**
     * Add an element to the underlying simulation, specifying it's id and shape
     */
    registerElement: (elementId, shape) => {},

    /**
     * Get a list of ids of all the elements in the simulation
     */
    getElementIds: () => simulation.getElementIds(),

    /**
     * Retrieve a blob of data about an element in the underlying simulation:
     *
     * {
     *   position: {
     *     x: <current x position>,
     *     y: < current y position>,
     *   },
     *   shape: elementShape
     *   }
     *
     */
    getElementData: elementId => ({
      position: {
        x: 0,
        y: 0,
      },
      velocity: {
        x: 0,
        y: 0,
      },
      shape: PointDefinition.INSTANCE,
    }),

    /**
     * Register a new rule in the simulation. A rule is a function
     * `f: f(currentSimulation) => [ForceApplication, ForceApplication...]
     *
     * thata optionally determines a set of forces to apply to the next state
     * in the simulation
     */
    registerRule: (ruleId, rule) => {},

    /**
     * Register a group of elements with the simulation, which can be retrieved with
     * getGroupElementIds
     */
    registerGroup: (groupId, elementIds) => simulation.registerGroup(groupId, elementIds),

    /**
     * Retrieve a list of a previously defined element group
     */
    getGroupElementIds: (groupId) => simulation.getGroupElementIds(groupId),

    /**
     * Set the strength of the simulation-wide force that causes elements to repel
     * or attract each other. 1.0 is the base repelling force strength, -1.0 would
     * be an equivalent attractive force.
     */
    setRepellingForceStrength: (strength) => simulation.setRepellingForceStrength(strength),
  });
  ```


* <a name='simulation-prop-types-element-selector' href='https://github.com/akud/yellow/blob/master/packages/client/src/simulation/SimulationPropTypes.js'>SimulationPropTypes.elementSelector</a> - determines a set of elements for rules to apply to.

  ```javascript
  /**
   * Defines a prop that identifies a group of elements in a simulation.
   * There are several options:
   *
   * id: select a single element by id
   * ids: select a set of elements by their ids
   * groupId: select all elements in a group
   * groupIds: select all elements in set of groups
   * all: select all elements
   */
  export const elementSelector = PropTypes.oneOfType([
    PropTypes.exact({ id: PropTypes.string.isRequired }),
    PropTypes.exact({ ids: PropTypes.arrayOf(PropTypes.string).isRequired }),
    PropTypes.exact({ groupId: PropTypes.string.isRequired }),
    PropTypes.exact({ groupIds: PropTypes.arrayOf(PropTypes.string).isRequired }),
    PropTypes.oneOf(['all']),
  ]);
  ```

* <a name='simulation-window' href='https://github.com/akud/yellow/blob/master/packages/client/src/simulation/SimulationWindow.js'>SimulationWindow</a> - Wrapper class to render a simulation inside a [DisplayWindow](#display-window). This will provide a `SimulationContext` to children, render all `SimulatedElement`s and `SimulatedElementGroup`s with their positions from the simulation, and register all `Rule` components.

  Props:

  * `width`: PropTypes.number - width for the window. Defaults to 500.

  * `height`: PropTypes.number - height for the window. Defaults to 500.

  * `border`: PropTypes.bool - whether to render a border around the window or not

  * `zoom`: PropTypes.number - Optional multiplier that determines the
    zoom level of the window

## Graphs

![yellow-main](https://raw.githubusercontent.com/akud/yellow/master/packages/client/yellow-main.png)

```javascript
import React from 'react';
import { Graphs } from '@akud/yellow-client';

export default () => {
  return (
    <Graphs.Graph>
      <Graphs.CircleNode nodeId="red-node" color="#fc2f38" />
      <Graphs.CircleNode nodeId="blue-node" color="#5b41fc" />
      <Graphs.CircleNode nodeId="yellow-node" color="#fcf95d" />
      <Graphs.CircleNode nodeId="green-node" color="#3ba226" />
      <Graphs.Edge fromNodeId="yellow-node" toNodeId="red-node" />
      <Graphs.Edge fromNodeId="yellow-node" toNodeId="blue-node" directed={true} />
      <Graphs.Edge fromNodeId="yellow-node" toNodeId="green-node" />
      <Graphs.Edge fromNodeId="blue-node" toNodeId="green-node" />
      <Graphs.Edge fromNodeId="blue-node" toNodeId="red-node" directed={true} />
      <Graphs.Edge fromNodeId="green-node" toNodeId="red-node" />
    </Graphs.Graph>
  )
}
```

The `Graphs` namespace contains high level components for rendering
[graphs](https://en.wikipedia.org/wiki/Graph_(discrete_mathematics))
driven by a physical simulation. The main component is [Graph](#graph),
which will render a window with all [Nodes](#node) and [Edges](#edge)
from its children.

---

* <a name='circlenode' href='https://github.com/akud/yellow/blob/master/packages/client/src/graphs/CircleNode.js'>CircleNode</a> - Convenience component to render a [Circle](#circle) inside a [Node](#node).

  Props:

  * `nodeId`: PropTypes.string.isRequired - id to use for the node

  * `color`: PropTypes.string - circle color. Defaults to `'#4286f4'`

  * `radius`: PropTypes.number - circle radius. Defaults to 10

  * `link`: [ElementPropTypes.link](#element-prop-types-link) Optional link object describing a web page for the circle to link to

* <a name='edge' href='https://github.com/akud/yellow/blob/master/packages/client/src/graphs/Edge.js'>Edge</a> - Renders an edge in the graph

  Props:

  * `fromNodeId`: PropTypes.string.isRequired - source node id

  * `toNodeId`: PropTypes.string.isRequired - target node id

  * `color`: PropTypes.string - Optional color to render the edge.  Defaults to `'#c7c7c7'`

  * `thickness`: PropTypes.number - Edge thickness. Defaults to 1.

  * `distance`: PropTypes.number - Edge distance. defaults to 100.

  * `directed`: PropTypes.bool - whether to make the edge directed (render an arrow at the target element) or not.

  * `bidirectional`: PropTypes.bool - whether to make the edge bidirectional (render an arrow at both the source and target nodes) or not

  * `bindingStrength`: PropTypes.number - strength with which to bind elements together

  * `curvature`: [ElementPropTypes.curvature](#element-prop-types-curvature) - Optional curvature with which to render the edge

* <a name='graph' href='https://github.com/akud/yellow/blob/master/packages/client/src/graphs/Graph.js'>Graph</a> - Main entrypoint for rendering graphs. This renders a graph inside a [SimulationWindow](#simulation-window) which is used to determine the layout

  Props:

    * `width`: PropTypes.number - width of the window. Defaults to 500.

    * `height`: PropTypes.number - height of the window. Defaults to 500.

    * `border`: PropTypes.bool - whether to render a border around the window or not

    * `zoom`: PropTypes.number - zoom to be applied to the window

* <a name='htmlnode' href='https://github.com/akud/yellow/blob/master/packages/client/src/graphs/HtmlNode.js'>HtmlNode</a> - renders children inside an [HtmlFragment](#html-fragment) inside a (Node)[#node]

  Props:

  * `nodeId`: PropTypes.string.isRequired - id to use for the node

  * `link`: [ElementPropTypes.link](#element-prop-types-link) Optional link object describing a web page for the html fragment to link to

* <a name='imagenode' href='https://github.com/akud/yellow/blob/master/packages/client/src/graphs/ImageNode.js'>ImageNode</a> - renders an [Image](#image) inside a [Node]

  Props:

  * `nodeId`: PropTypes.string.isRequired - id to use for the node

  * `src`: PropTypes.string.isRequired - image src url

  * `width`: PropTypes.number.isRequired - image width

  * `height`: PropTypes.number.isRequired - image height

  * `link`: [ElementPropTypes.link](#element-prop-types-link) Optional link object describing a web page for the image to link to

* <a name='node' href='https://github.com/akud/yellow/blob/master/packages/client/src/graphs/Node.js'>Node</a> - Basic wrapper component for rendering [elements](#elements) inside a graph. `children` will be rendered inside the graph positioned by the graph rules, and multiple elements will be oriented around a primary element inside a [SimulatedElementGroup](#simulated-element-group).

  Props:

  * `nodeId`: PropTypes.string.isRequired - id to use for the node

  * `link`: [ElementPropTypes.link](#element-prop-types-link) Optional link object describing a web page for the node to link to

* <a name='pointnode' href='https://github.com/akud/yellow/blob/master/packages/client/src/graphs/PointNode.js'>PointNode</a> - Renders a point-sized, invisible node

  Props:

  * `nodeId`: PropTypes.string.isRequired - id to use for the node


[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lernajs.io/)
