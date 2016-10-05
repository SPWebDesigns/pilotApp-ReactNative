import React, { Component } from 'react';
import { Navigator, View, ListView, Text, TouchableHighlight, Image } from 'react-native';
import getStyles from '../styles';
import { fetchFiles, fetchFile } from '../services/AsyncService';

import NetworkInfo from 'react-native-network-info';
import RNOpenSettings from 'react-native-open-settings';

const styles = getStyles();

export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {status: '', files: []};
    //this.fetchFiles();

    console.log(RNOpenSettings);

    // Get SSID
    NetworkInfo.getSSID(ssid => {
      console.log(ssid);
    });

    // Get Local IP
    NetworkInfo.getIPAddress(ip => {
      console.log(ip);
      if(ip){
        this.setState(Object.assign({}, this.state, {status: 'Conected ' + ip}));
      } else {
        this.setState(Object.assign({}, this.state, {status: 'Not Conected'}));
      }
    });
  
  }

  fetchFiles(){
    fetchFiles().then((data)=>{
      const files = data.payload;
      console.log(files);
      this.setState(Object.assign({}, this.state, {files}));
    });
  }

  openSettings(){
    RNOpenSettings.openSettings();
  }

  goHome(view){
    this.props.navigator.push({id: 'login'});
  }

  render() {
    const iconStatus = this.state.status !== 'Not Conected' ? './../imgs/wifi-icon-15.png' : './../imgs/wifi-icon-15.png';

    return (
      <View style={styles.view}>
        <View style={styles.view}>
          <Text style={styles.title}>Status: {this.state.status}</Text>

          
          <Image
            style={styles.image}
            source={require(iconStatus)}
          />
        </View>

        <TouchableHighlight onPress={this.openSettings.bind(this)}>
          <Text style={styles.login}>Open Settings</Text>
        </TouchableHighlight>

        <TouchableHighlight onPress={this.openSettings.bind(this)}>
          <Text style={styles.login}>Download SD Files</Text>
        </TouchableHighlight>

        <Image
          style={styles.image}
          source={require('./../imgs/upload-icon-3.png')}
        />

        <TouchableHighlight onPress={this.openSettings.bind(this)}>
          <Text style={styles.login}>Upload Files</Text>
        </TouchableHighlight>

      </View>
    );
  }
}