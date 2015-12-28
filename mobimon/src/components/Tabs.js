import React, {PropTypes} from 'react';

// Styles
import './Tabs.less';

export default class Tabs extends React.Component {

  static propTypes = {
    tabNames: PropTypes.array.isRequired,
    selectedTab: PropTypes.string.isRequired,
    onClickTab: PropTypes.func.isRequired
  }

  _renderTab(name, index) {
    let className = name === this.props.selectedTab ? 'tab active' : 'tab';
    return (
      <div
        key={index}
        className={`${className} ${this.props.color}`}
        onClick={this.props.onClickTab.bind(null, name)} >
      {name}
      </div>
    );
  }

  render() {
    return (
      <div className="tabs-container material-shadow" >
        {this.props.tabNames.map((name, index) => this._renderTab(name, index))}
      </div>
    );
  }
}
