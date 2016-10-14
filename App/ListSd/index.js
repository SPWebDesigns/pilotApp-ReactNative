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
    this.props.navigator.push({id: 'wifi'});
  }

  getFileList(){
    fetchFiles()
    .then((data)=>{
      let files = data;
      sdParserInstance.setInput(files);
      sdParserInstance.parse();
      files = sdParserInstance.getFileArray();
      this.setState(Object.assign({}, this.state, {files}));
    }).catch((err) => {
      console.log(err);
    });
  }

  componentDidMount(){
    this.getFileList();
  }

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
