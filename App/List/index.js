import React, { Component } from 'react';
import { Navigator, View, ListView, TouchableHighlight, Text, ScrollView } from 'react-native';
import { getReservationList, fetchFiles } from '../services/AsyncService';
import Tile from './Tile';
import getStyles from '../styles';
import RNFS from 'react-native-fs';

const styles = getStyles();

export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {files: []};

    
    setTimeout(()=> {
      if(this.props.type != 'sd'){
        this.readDir();
      } else {
        this.getFileList();
      }
    }, 500)
  }

  goHome(){
    this.props.navigator.push({id: 'wifi'});
  }

  readDir(){
    // create a path you want to write to
    var path = RNFS.DocumentDirectoryPath + '/';
    // write the file
    RNFS.readDir(path)
      .then((files) => {
        console.log(files)
        console.log('FILE WRITTEN!');
        this.setState(Object.assign({}, this.state, {files}));
      })
      .catch((err) => {
        console.log(err.message);
      });
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
  }

  render() {
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    const dataSource = ds.cloneWithRows(this.state.files);

    return (
      <View>
        <View>
          <Text style={styles.title}>AEYRIUM</Text>
        </View>
        <ScrollView contentContainerStyle={styles.bgview}>
          <View style={styles.view}>
            <ListView
              enableEmptySections={true}
              dataSource={dataSource}
              renderRow={(rowData)=>
                  <Tile navigator={this.props.navigator} data={rowData}></Tile>
              }
            />
          </View>
        </ScrollView>
        <TouchableHighlight onPress={this.goHome.bind(this)}>
          <Text style={styles.login}>Back to Home</Text>
        </TouchableHighlight>
      </View>
    );
  }
}
