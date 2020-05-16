import React from 'react';

import PropTypes from 'prop-types';

import ElementGroup from './ElementGroup';
import Label from './Label';
import Circle from './Circle';
import WindowContext from './WindowContext';

import utils from '../utils';

export default class Grid extends React.Component {
  static contextType = WindowContext;


  static propTypes = {
    color: PropTypes.string,
    stepsPerSide: PropTypes.number,
  }

  static defaultProps = {
    color: 'black',
    stepsPerSide: 10,
  }

  render() {
    return (
      <React.Fragment>
        {
          this.context != null && utils.flatten(
            this.getXNumberLine().map(x => (
              this.getYNumberLine().map(y => (
                <ElementGroup key={`${x}-${y}`}>
                  {
                    (x == 0 && y != 0) ?
                      <Label text={`${Math.round(y)}`} position={{ x: 15, y }} /> :
                      (
                        (x != 0 && y == 0) ?
                        <Label text={`${Math.round(x)}`} position={{ x, y: 15 }} /> :
                        <Circle
                          key={`${x}-${y}`}
                          color={this.props.color}
                          radius={1}
                          position={{ x, y }}
                        />
                      )
                  }
                </ElementGroup>
              ), this)
            ), this)
          )
        }
      </React.Fragment>
    );
  }

  getXNumberLine() {
    const line = [];
    let x = 0;
    while (x <= this.context.width) {
      line.push(x);
      x += this.getXIncrement();
    }
    return line;
  }

  getYNumberLine() {
    const line = [];
    let y = 0;
    while (y <= this.context.height) {
      line.push(y);
      y += this.getYIncrement();
    }
    return line;
  }

  getXIncrement() {
    return this.context.width / this.props.stepsPerSide;
  }

  getYIncrement() {
    return this.context.height / this.props.stepsPerSide;
  }
}
