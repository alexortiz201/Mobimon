import React, {PropTypes} from 'react';

import {Characters, Items} from '../../utils/constants';

// svg
import Octobruise from '../../images/characters/octobruise.svg';
import Bilsner from '../../images/characters/bilsner.svg';
import Peater from '../../images/characters/peater.svg';
import Bird from '../../images/characters/bird.svg';

// items
import Sword from '../../images/items/sword.svg';
import Shield from '../../images/items/shield.svg';


export default class Svg extends React.Component {
  static propTypes = {
    type: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    size: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    view: PropTypes.string
  }

  static defaultProps = {
    size: 100
  }

  _mergeStyles(...args) {
    // This is the m function from "CSS in JS" and can be extracted to a mixin
    return Object.assign({}, ...args);
  }

  // Allow resizing of svgs
  _composeDOMElement(svg) {
    let svgNode = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

    svgNode.setAttributeNS(null, 'viewBox', this.props.view);
    svgNode.setAttributeNS(null, 'verticalAlign', 'bottom');
    // svgNode.setAttributeNS(null, 'fill', 'currentcolor');
    svgNode.setAttributeNS(null, 'width', this.props.size);
    svgNode.setAttributeNS(null, 'height', this.props.size);
    svgNode.setAttributeNS(null, 'preserveAspectRatio', 'xMidYMid meet');
    svgNode.insertAdjacentHTML('afterbegin', svg.props.dangerouslySetInnerHTML.__html);

    return { __html: svgNode.outerHTML};
  }

  _renderGraphic(type, iconHash) {
    let SVG = '';
    let character = '';
    let item = '';

    if (type === 'character') {
      character = Characters.filter((char) => {
        return char.name === iconHash;
      })[0];

      if (!character) {
        throw new Error('Character ' + iconHash + ' not found');
        return;
      }

      switch (character.name) {
        case 'Octobruise': 
          SVG = Octobruise;
          break;
        case 'Bilsner': 
          SVG = Bilsner;
          break;
        case 'Peater': 
          SVG = Peater;
          break;
        case 'Bird': 
          SVG = Bird;
          break;
        default:
          break;
      }
    }

    if (type === 'item') {
      item = Items.filter((item) => {
        return item.name === iconHash;
      })[0];

      if (!item) {
        throw new Error('Item ' + iconHash + ' not found');
        return;
      }

      switch (item.name) {
        case 'sword': 
          SVG = Sword;
          break;
        case 'shield': 
          SVG = Shield;
          break;
        default:
          break;
      }
    }

    return (
      <div dangerouslySetInnerHTML={this._composeDOMElement(SVG)} />
    );
  }

  render() {
    return (
      <div>{this._renderGraphic(this.props.type, this.props.icon)}</div>
    );
  }
}
