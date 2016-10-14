import React, { Component } from 'react';
import { Navigator, View, ListView, TouchableHighlight, Text, ScrollView } from 'react-native';
import { getReservationList, fetchFiles } from '../services/AsyncService';
import Tile from './Tile';
import getStyles from '../styles';
import RNFS from 'react-native-fs';
import parseSdResults from './../services/sd-card-parser';

const styles = getStyles();
let sdParserInstance = new parseSdResults;

export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {files: [], 'filename': null};
  }
  
  goHome(){
    this.props.navigator.push({id: 'wifi', flashAirStatus: 'Conected'});
  }

  fetchFile(){
    let files = sdParserInstance.getFileArray();
    console.log(files[files.length - 1]);
    let fileName = files[files.length - 1].filename;
    this.setState(Object.assign({}, this.state, {filename: fileName}));

    fetchFile(fileName).then((data)=>{
      let file = data;
      //console.log(files);
      console.log(file);

      this.writeFile(file, fileName);
      //this.setState(Object.assign({}, this.state, {files}));
    });
  }

  getFileList(){
    fetchFiles().then((data)=>{
      let files = data;
      //console.log(files);
      sdParserInstance.setInput(files);
      sdParserInstance.parse();
      files = sdParserInstance.getFileArray();
      console.log(files);
      this.setState(Object.assign({}, this.state, {files}));
    });
    // let files = [{'name': 'abc.xml'}, {'name': 'asd.xml'}];
    // this.setState(Object.assign({}, this.state, {files}));
  }

  // shouldComponentUpdate(nextProps, nextState){
  //   // return a boolean value
  //   let files = [{'name': 'abc.xml'}, {'name': 'asd.xml'}];
  //   this.setState(Object.assign({}, this.state, {files}));
  //   console.log(this.state);
  //   return true;
  // }

  // componentDidUpdate(prevProps, prevState){
  //   let files = [{'name': 'abc.xml'}, {'name': 'asd.xml'}];
  //   this.setState(Object.assign({}, this.state, {files}));
  //   console.log(this.state);
  // }

  render() {
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    const dataSource = ds.cloneWithRows(this.state.files);

    return (
      <View style={styles.view}>
        <View>
          <Text style={styles.title}>AEYRIUM</Text>
        </View>
        <ScrollView contentContainerStyle={styles.bgview}>
          <View style={styles.view}>
            
            <TouchableHighlight onPress={this.goHome.bind(this)}>
              <Text style={styles.login}>Back</Text>
            </TouchableHighlight>

            <TouchableHighlight onPress={this.getFileList.bind(this)}>
              <Text style={styles.login}>Get File List</Text>
            </TouchableHighlight>

            <ListView
              enableEmptySections={true}
              dataSource={dataSource}
              renderRow={(rowData)=>
                  <Tile navigator={this.props.navigator} data={rowData}></Tile>
              }
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}
