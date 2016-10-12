import React, { Component } from 'react';
import { Navigator } from 'react-native';
import Wifi from './Wifi';
import List from './List';

export default class App extends Component {
  constructor(props){
    super(props);
  }

  navigatorRenderScene(route, navigator) {
    _navigator = navigator;
    switch (route.id) {
      case 'wifi':
        return (<Wifi navigator={navigator} />);
      case 'list':
        return (<List navigator={navigator} />);
    }
  }

  render() {
    return (
      <Navigator
        initialRoute={{id: 'wifi'}}
        renderScene={this.navigatorRenderScene}/>
    );
  }
}
