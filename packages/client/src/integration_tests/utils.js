import fs from 'fs';
import npm from 'npm';
import clear from 'clear';

const OUTPUT_PATH = './src/local/it.js';

/**
 * Display some markup in the local browser and await user feedback. Returns a promise
 *
 */
const check = (fileString) => writeLocalReactFile(fileString)
  .then(runDisplayCommand)
  .then(checkForResponse);

/**
 * Display a fragment within a graph and ask for user feedback
 *
 */
export const checkGraphFragment = async (fragment) => {
  clear();
  process.stdout.write(`Checking fragment \n${fragment}`);
  await check(
  `import React from 'react';
${elementImports()}

${simulationImports()}

${graphImports()}

export default () => (
  <Graph border={true}>
  ${fragment}
  </Graph>
)
`);
}



/**
 * Display a fragment within a simulation and ask for user feedback
 *
 */
export const checkSimulationFragment = async (fragment) => {
  clear();
  process.stdout.write(`Checking fragment \n${fragment}`);
  await check(
  `import React from 'react';
${elementImports()}

${simulationImports()}

export default () => (
  <SimulationWindow border={true}>
  ${fragment}
  </SimulationWindow>
)
`);
}

/**
 * Display a fragment within an element window and ask for user feedback
 *
 */
export const checkElementFragment = async (fragment) => {
  clear();
  process.stdout.write(`Checking fragment \n${fragment}`);
  await check(
`import React from 'react';

${elementImports()}

export default () => (
  <DisplayWindow border={true}>
  ${fragment}
  </DisplayWindow>
)
`);
}

const writeLocalReactFile = (reactString) => new Promise((resolve, reject) => {
  fs.writeFile(OUTPUT_PATH, reactString, (writeErr) => {
    if (writeErr) {
      reject(writeErr);
    } else {
      resolve();
    }
  });
});

const runDisplayCommand = () => new Promise((resolve, reject) => {
  npm.load((loadError) => {
    if (loadError) {
      reject(loadError);
    } else {
      npm.run('display', OUTPUT_PATH, (runError) => {
        if (runError) {
          reject(runError);
        } else {
          resolve();
        }
      });
    }
  });
});

const checkForResponse = () => new Promise((resolve, reject) => {
  const handler = (data) => {
    process.stdin.removeListener('data', handler);
    process.stdout.write('\n');
    if (new String(data).toLowerCase().indexOf('n') !== -1) {
      reject('Failed');
    } else {
      resolve('Passed');
    }
  };
  process.stdin.on('data', handler);
  process.stdout.write('Pass? (Y/n)\n');
});

const elementImports = () => (
`import Arrow from '../elements/Arrow';
import Circle from '../elements/Circle';
import DisplayWindow from '../elements/DisplayWindow';
import ElementContext from '../elements/ElementContext';
import ElementGroup from '../elements/ElementGroup';
import ElementProps from '../elements/ElementProps';
import ElementPropTypes from '../elements/ElementPropTypes';
import Image from '../elements/Image';
import Label from '../elements/Label';
import Line from '../elements/Line';
import Point from '../elements/Point';
import Rectangle from '../elements/Rectangle';
import WindowContext from '../elements/WindowContext';
import geometryUtils from '../elements/geometry/geometry-utils';
`);

const simulationImports = () => (
`import Orientation from '../simulation/Orientation';
import Rules from '../simulation/Rules';
import SimulatedElementGroup from '../simulation/SimulatedElementGroup';
import SimulatedElement from '../simulation/SimulatedElement';
import SimulatedLayout from '../simulation/SimulatedLayout';
import SimulatedLink from '../simulation/SimulatedLink';
import SimulationContext from '../simulation/SimulationContext';
import SimulationWindow from '../simulation/SimulationWindow';
`);

const graphImports = () => (
`import CircleNode from '../graphs/CircleNode';
import Edge from '../graphs/Edge';
import Graph from '../graphs/Graph';
import ImageNode from '../graphs/ImageNode';
import Node from '../graphs/Node';
import PointNode from '../graphs/PointNode';
`);


export default {
  checkSimulationFragment,
  checkElementFragment,
  checkGraphFragment,
}
