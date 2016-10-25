import React, { Component } from 'react';
import { Navigator, View, ListView, Text, TouchableHighlight, Image, ScrollView, Alert } from 'react-native';
import getStyles from '../styles';
import { fetchFiles, fetchFile, getSSID, uploadFile, checkInternetConnection } from '../services/AsyncService';
import parseSdResults from './../services/sd-card-parser';
import NavigationBar from 'react-native-navbar';

import NetworkInfo from 'react-native-network-info';
import RNFS from 'react-native-fs';

const styles = getStyles();
let sdParserInstance = new parseSdResults;

export default class App extends Component {
  constructor(props){
    super(props);

    console.log(RNFS.DocumentDirectoryPath);
    
    this.state = {
      status: '',
      files: [],
      'flashAirStatus': 'Not Conected',
      //'flashAirStatus': 'Conected',
      'internetConnection': 'Not Conected',
      'flashairSSID': null,
      'uploading': false,
      'filename': null,
      'requests': 0
    };

    // Get SSID
    NetworkInfo.getSSID(ssid => {
      console.log(ssid);
      Alert.alert('Hello');
    });

    // Get Local IP
    NetworkInfo.getIPAddress(ip => {
      console.log(ip);
      if(ip != 'error'){
        this.setState(Object.assign({}, this.state, {status: 'Connected ' + ip}));
      } else {
        this.setState(Object.assign({}, this.state, {status: 'Not Connected'}));
      }
    });

  }

  componentDidMount(){
    this.getSSID();
    this.checkInternetConnection();

    setInterval(this.getSSID, 1500);
    setInterval(this.checkInternetConnection, 1500);
  }

  checkInternetConnection(){
    checkInternetConnection().then((data)=>{
      if(data){
        this.setState(Object.assign({}, this.state, {internetConnection: 'Connected'}));
      } else {
        this.setState(Object.assign({}, this.state, {internetConnection: 'Not Connected'}));
      }
    });
  }

  getSSID(){
    getSSID().then((data)=>{
      this.setState(Object.assign({}, this.state, {flashairSSID: data}));
      if(data){
        this.setState(Object.assign({}, this.state, {flashAirStatus: 'Connected'}));
      } else {
        this.setState(Object.assign({}, this.state, {flashAirStatus: 'Not Connected'}));
      }
    });
  }

  goToFileList(){
    if(this.state.flashAirStatus != "Conected"){
      this.props.navigator.push({id: 'list'});
    } else {
      this.props.navigator.push({id: 'messages', 'message': 'You need internet connection to upload data to the Aeyrium service. Go to Settings > Wifi and connect to Internet.'});
    }
  }

  goToSdFiles(){
    if(this.state.flashAirStatus != "Conected"){
      this.props.navigator.push({id: 'messages', 'message': 'You must to connect with the Flashair Card Network. Go to Settings > Wifi and connect to the FlashAir SD Card.'});
    } else {
      this.props.navigator.push({id: 'sdlist'});
    }
  }

  render() {
    let iconStatus = this.state.flashAirStatus !== 'Not Conected' ? require('./../imgs/wifi-icon-15-on.png') : require('./../imgs/wifi-icon-15.png');
    // let downloadFilesBtn = <TouchableHighlight onPress={this.fetchFile.bind(this)}> 
    //   <Text style={styles.login}>Download file</Text> 
    // </TouchableHighlight>;
    let downloadFilesBtn = <TouchableHighlight onPress={this.goToSdFiles.bind(this)}> 
      <Text style={styles.login}>Download Sd Files</Text> 
    </TouchableHighlight>;

    if(this.state.flashAirStatus == 'Not Conected'){
      //downloadFilesBtn = null;
    }

    const titleConfig = {
      title: 'Aeyrium',
    };

    return (
      <ScrollView contentContainerStyle={styles.bgview}>
        <View style={styles.view}>
          <NavigationBar style={styles.navigationBar}
            title={{ title: 'AERYUM', tintColor: '#3399db', style: styles.navigationBarTitle  }} />
          <View style={styles.viewrow}>
            <View style={styles.view}>
              <Text style={styles.message}>Flashair: {this.state.flashAirStatus}</Text>
            </View>
          </View>
          <View style={styles.viewrow}>
            <View style={styles.view}>
              <Text style={styles.message}>Internet: {this.state.internetConnection}</Text>
            </View>
          </View>
          <View style={styles.view}>
            <View style={styles.viewContainer}>
              {downloadFilesBtn}
            </View>
          </View>
        
        <View style={styles.viewrow}>
          <View style={styles.imageContainer}>
            <Image
              style={styles.imageCloud}
              source={require('./../imgs/upload-icon-3.png')}
            />
          </View>
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