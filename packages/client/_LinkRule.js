import * as d3 from 'd3-force';

import ForceApplication from './ForceApplication';

import utils from '../utils';
import logging from '@akud/logging';

const LOGGER = new logging.Logger('LinkRule');

const contextCache = {};

export const createLinkRule = ({ contextId, between, distance, strength=1.0 }) => {
  utils.requirePresent(contextId);
  utils.requireArrayOfLength(between, 2);
  utils.requireGreaterThanZero(distance);
  utils.requireNonNegative(strength);

  initializeLink({ contextId, between, distance, strength });

  return function(currentState) {
    const {
      linkForce,
      lastSeenNumElements,
      lastComputedIterationNumber,
    } = getContextData(contextId);

    reinitializeIfNecessary(linkForce, lastSeenNumElements, currentState);

  };
}

export const clearLinkCache = () => {
  Object.keys(contextCache).forEach(contextId => {
    delete contextCache[contextId];
  });
}

export default {
  create: createLinkRule,
}


const reinitializeIfNecessary = (linkForce, lastSeenNumElements, currentState) => {
    const currentElementIds = currentState.getElementIds();
    if (lastSeenNumElements !== currentElementIds.length) {
      LOGGER.debug(
        'number of elements changed from {} to {} in {}, reinitializing',
        lastSeenNumElements,
        currentElementIds.length,
        contextId
      );
      linkForce.initialize(currentElementIds.map(elementId => Object.assign(
        currentState.getElementData(elementId),
        {
          vx: 0,
          vy: 0,
        }
      )));
    }
};

const getContextData = (contextId) => {
  if (!contextCache[contextId]) {
    const linkForce = d3.forceLink()
      .id(n => n.id)
      .distance(l => l.distance);
    linkForce.strength(createStrengthFunction(linkForce))

    contextCache[contextId] = {
      linkForce,
      lastSeenNumElements: 0,
      lastComputedIterationNumber: 0,
    };
  }

  return contextCache[contextId];
};

const createStrengthFunction = (linkForce) => {
  const defaultLinkForceStrength = linkForce.strength();
  return function() {
    const link = arguments[0];
    const result = link.strength * defaultLinkForceStrength.apply(null, arguments)
    LOGGER.debug('strength between {} and {}: {}', link.source.id, link.target.id, result);
    return result;
  };
};

const initializeLink = ({ contextId, between, distance, strength }) => {
  const contextData = getContextData(contextId);
  const { linkForce } = contextData;

  const existingLinks = contextData.linkForce.links();
  linkForce.links(existingLinks.concat({
    source: between[0],
    target: between[1],
    distance,
    strength,
  }));
};



//const createLinkForce = (links) => {


  //return linkForce.strength(function() {
    //const link = arguments[0];
    //const result = link.strengthMultiplier * defaultLinkForceStrength.apply(null, arguments)
    //LOGGER.debug('strength between {} and {}: {}', link.source.id, link.target.id, result);
    //return result;
  //});
//}

  //describe('registerRule', () => {
    //it('aggregates distance setting rules into one link force', () => {
      //const links = [];
      //d3ForceLink.links.mockImplementation(l => links.push(l.slice()));
      //new ForceSimulation()
        //.registerRule(
          //new DistanceSettingRuleDefinition({
            //between: ['1', '2'],
            //distance: 10
          //})
        //)
        //.registerRule(
          //new DistanceSettingRuleDefinition({
            //between: ['2', '4'],
            //distance: 50,
            //strengthMultiplier: 2.5,
          //})
        //)
        //.registerRule(
          //new DistanceSettingRuleDefinition({
            //between: ['3', '4'],
            //distance: 15,
            //strengthMultiplier: 1.5,
          //})
        //);

      //const expectedLink1 = {
        //source: '1',
        //target: '2',
        //distance: 10,
        //strengthMultiplier: 1.0,
      //};
      //const expectedLink2 = {
        //source: '2',
        //target: '4',
        //distance: 50,
        //strengthMultiplier: 2.5,
      //};
      //const expectedLink3 = {
        //source: '3',
        //target: '4',
        //distance: 15,
        //strengthMultiplier: 1.5,
      //};

      //expect(links).toEqual([
        //[
          //expectedLink1,
        //],
        //[
          //expectedLink1,
          //expectedLink2,
        //],
        //[
          //expectedLink1,
          //expectedLink2,
          //expectedLink3,
        //],
      //]);
      //expect(d3ForceLink.links).toHaveBeenCalledTimes(3);

      //d3DefaultLinkStrength.mockReturnValue(3.14);
      //expect(d3DefaultLinkStrength).not.toHaveBeenCalled();

      //expect(d3ForceLink.strength).toHaveBeenCalledTimes(2);
      //expect(d3ForceLink.strength).toHaveBeenCalledWith();
      //expect(d3ForceLink.strength).toHaveBeenCalledWith(expect.functionThatReturns([
        //{ input: expectedLink1, output: 3.14 },
        //{ input: expectedLink2, output: 2.5 * 3.14 },
        //{ input: expectedLink3, output: 1.5 * 3.14 },
      //]));
      //expect(baseSimulation.force).toHaveBeenCalledTimes(2);
    //});

    //it('registers positioning rules', () => {
      //const force = { id: 3462435 };
      //MockPositioningRule.create.mockReturnValue(force);

      //new ForceSimulation().registerRule(
        //new PositioningRuleDefinition({
          //elementId: 't35234',
          //x: 68,
          //y: 1923,
        //})
      //);

      //expect(baseSimulation.force).toHaveBeenCalledWith(
        //'t35234-fixed-position',
        //force
      //);
      //expect(MockPositioningRule.create).toHaveBeenCalledWith({
          //elementId: 't35234',
          //x: 68,
          //y: 1923,
      //});
      //expect(baseSimulation.force).toHaveBeenCalledTimes(3);
    //});

    //it('registers relative positioning rules', () => {
      //const force = { id: 3462435 };
      //MockRelativePositioningRule.create.mockReturnValue(force);

      //new ForceSimulation().registerRule(
        //new RelativePositioningRuleDefinition({
          //baseElementId: 't72gwr',
          //targetElementId: 'el632',
          //directions: [ Direction.RIGHT, Direction.DOWN ],
          //strengthMultiplier: 1.5,
        //})
      //);

      //expect(baseSimulation.force).toHaveBeenCalledWith(
        //'t72gwr-el632-relative-position',
        //force
      //);
      //expect(MockRelativePositioningRule.create).toHaveBeenCalledWith({
          //baseElementId: 't72gwr',
          //targetElementId: 'el632',
          //directions: [ Direction.RIGHT, Direction.DOWN ],
          //strengthMultiplier: 1.5,
      //});
      //expect(baseSimulation.force).toHaveBeenCalledTimes(3);
    //});
  //});


