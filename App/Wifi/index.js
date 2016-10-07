import React, { Component } from 'react';
import { Navigator, View, ListView, Text, TouchableHighlight, Image, ScrollView } from 'react-native';
import getStyles from '../styles';
import { fetchFiles, fetchFile, checkFlashAirConnection, getSSID } from '../services/AsyncService';
import parseSdResults from './../services/sd-card-parser';

import NetworkInfo from 'react-native-network-info';
import RNOpenSettings from 'react-native-open-settings';

const styles = getStyles();

export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {status: '', files: [], 'flashAirStatus': 'Not Conected', 'flashairSSID': null};
    //this.fetchFiles();
    console.log(RNOpenSettings);

    // Get SSID
    NetworkInfo.getSSID(ssid => {
      console.log(ssid);
    });

    // Get Local IP
    NetworkInfo.getIPAddress(ip => {
      console.log(ip);
      if(ip != 'error'){
        this.setState(Object.assign({}, this.state, {status: 'Conected ' + ip}));
      } else {
        this.setState(Object.assign({}, this.state, {status: 'Not Conected'}));
      }
    });
  
  }

  getSSID(){
    getSSID().then((data)=>{
      console.log(data);
      this.setState(Object.assign({}, this.state, {flashairSSID: data}));
    });
  }
  
  checkFlashAirConnection(){
    checkFlashAirConnection().then((data)=>{
      console.error(data);
      this.setState(Object.assign({}, this.state, {flashairPaired: data}));
    });
  }
  
  fetchFiles(){
    fetchFiles().then((data)=>{
      let files = data.payload;
      //console.log(files);
      let sdParserInstance = new parseSdResults;
      sdParserInstance.setInput(files);
      sdParserInstance.parse();
      files = sdParserInstance.getFileArray();
      console.log(files);
      this.setState(Object.assign({}, this.state, {files}));
    });
  }

  openSettings(){
    RNOpenSettings.openSettings();
  }  

  render() {
    let iconStatus = this.state.status !== 'Not Conected' ? require('./../imgs/wifi-icon-15-on.png') : require('./../imgs/wifi-icon-15.png');
    let downloadFilesBtn = <TouchableHighlight onPress={this.openSettings.bind(this)}> 
      <Text style={styles.login}>Download new files</Text> 
    </TouchableHighlight>;

    if(false){
      downloadFilesBtn = null;
    }

    return (
      <View style={styles.bgview}>
          <Text style={styles.title}>PROYECT NAME</Text>
          <View style={styles.viewrow}>
            <Image
              style={styles.image}
              source={iconStatus}
            />
            <View style={styles.view}>
              <Text style={styles.subtitle}>Status: {this.state.status}</Text>
              <Text style={styles.subtitle}>Flashair: {this.state.flashAirStatus}</Text>
            </View>
          </View>
          <View style={styles.view}>
            <View style={styles.viewContainer}>

              <TouchableHighlight onPress={this.getSSID.bind(this)}>
                <Text style={styles.login}>Check FlashAir SD</Text>
              </TouchableHighlight>

              <TouchableHighlight onPress={this.fetchFiles.bind(this)}>
                <Text style={styles.login}>Check SD Files</Text>
              </TouchableHighlight>

              <TouchableHighlight onPress={this.openSettings.bind(this)}>
                <Text style={styles.login}>Open Wifi Settings</Text>
              </TouchableHighlight>
              {downloadFilesBtn}
              
            </View>
          </View>
        
        <View style={styles.viewrow}>
          <Image
            style={styles.image}
            source={require('./../imgs/upload-icon-3.png')}
          />
          <View style={styles.centerView}>
            <TouchableHighlight onPress={this.openSettings.bind(this)}>
              <Text style={styles.login}>Upload Files</Text>
            </TouchableHighlight>
          </View>
        </View>
        

      </View>
    );
  }
}