import React, { Component } from 'react';
import { Navigator, View, ListView, Text, TouchableHighlight, Image, ScrollView } from 'react-native';
import getStyles from '../styles';
import { fetchFiles, fetchFile, getSSID, uploadFile } from '../services/AsyncService';
import parseSdResults from './../services/sd-card-parser';

import NetworkInfo from 'react-native-network-info';
import RNOpenSettings from 'react-native-open-settings';
import RNFS from 'react-native-fs';

const styles = getStyles();
let sdParserInstance = new parseSdResults;

export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      status: '',
      files: [],
      'flashAirStatus': 'Not Conected',
      'flashairSSID': null,
      'uploading': false,
      'filename': null
    };

    // Get SSID
    NetworkInfo.getSSID(ssid => {
      console.log(ssid);
    });

    // Get Local IP
    NetworkInfo.getIPAddress(ip => {
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
      if(data){
        this.setState(Object.assign({}, this.state, {flashAirStatus: 'Conected'}));
      } else {
        this.setState(Object.assign({}, this.state, {flashAirStatus: 'Not Conected'}));
      }
    });
  }

  writeFile(data, filename){
    // create a path you want to write to
    var path = RNFS.DocumentDirectoryPath + '/' + filename;
    // write the file
    RNFS.writeFile(path, data, 'utf8')
      .then((success) => {
        console.log('FILE WRITTEN!');
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  openSettings(){
    RNOpenSettings.openSettings();
  }

  goToFileList(){
    this.props.navigator.push({id: 'list'});
  }

  goToSdFiles(){
    this.props.navigator.push({id: 'sdlist'});
  }
  // uploadFile(){
  //   let file = null;
  //   let path = RNFS.DocumentDirectoryPath + '/' + this.state.filename;
  //   this.setState(Object.assign({}, this.state, {uploading: true}));
     
  //   RNFS.readFile(path).then(function(data){
  //     file = data; 
  //     uploadFile(file)
  //     .then((data)=>{
  //       this.setState(Object.assign({}, this.state, {uploading: false}));
  //     });   
  //   });    
  // }

  render() {
    let iconStatus = this.state.flashAirStatus !== 'Not Conected' ? require('./../imgs/wifi-icon-15-on.png') : require('./../imgs/wifi-icon-15.png');
    // let downloadFilesBtn = <TouchableHighlight onPress={this.fetchFile.bind(this)}> 
    //   <Text style={styles.login}>Download file</Text> 
    // </TouchableHighlight>;
    let downloadFilesBtn = <TouchableHighlight onPress={this.goToSdFiles.bind(this)}> 
      <Text style={styles.login}>Download Sd Files</Text> 
    </TouchableHighlight>;

    if(this.state.flashAirStatus == 'Not Conected'){
      downloadFilesBtn = null;
    }

    return (
      <ScrollView contentContainerStyle={styles.bgview}>
        <View style={styles.view}>
          <Text style={styles.title}>AEYRIUM</Text>
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
            <TouchableHighlight onPress={this.goToFileList.bind(this)}>
              <Text style={styles.login}>Upload Files</Text>
            </TouchableHighlight>
          </View>
        </View>
        
        </View>
      </ScrollView>
    );
  }
}