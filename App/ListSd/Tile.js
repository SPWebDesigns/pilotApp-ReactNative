import React, { Component } from 'react';
import { View, Text, TouchableHighlight, Image } from 'react-native';
import { uploadFile } from '../services/AsyncService';
import getStyles from '../styles';
import RNFS from 'react-native-fs';

const styles = getStyles();

export default class Tile extends Component {
  constructor(props){
    super(props);
    this.state = {
      'uploading': false
    };
  }

  uploadFile(){
    let file = null;
    let path = RNFS.DocumentDirectoryPath + '/' + this.props.data;
    this.setState(Object.assign({}, this.state, {uploading: true}));
     
    RNFS.readFile(path).then(function(data){
      file = data; 
      uploadFile(file)
      .then((data)=>{
        this.setState(Object.assign({}, this.state, {uploading: false}));
      });   
    });    
  }

  render() {
    const data = this.props.data;

    let deleteBtn = <TouchableHighlight onPress={this.deleteFile.bind(this)}>
      <Text style={styles.login}>Delete File</Text>
    </TouchableHighlight>;

    if(this.props.type == 'sd'){
      deleteBtn = null;
    }

    return (
      // <View>
      //   <TouchableHighlight>
      //     <Text style={styles.tileTitle}>{data}</Text>
      //   </TouchableHighlight>
      // </View>
      <View style={styles.viewrow}>
          <Image
            style={styles.image}
            source={require('./../imgs/upload-icon-3.png')}
          />
          <View style={styles.centerView}>
            <TouchableHighlight onPress={this.uploadFile.bind(this)}>
              <Text style={styles.login}>Upload {data.name}</Text>
            </TouchableHighlight>

            <TouchableHighlight onPress={this.uploadFile.bind(this)}>
              <Text style={styles.login}>Delete File</Text>
            </TouchableHighlight>
            
            {deleteBtn}
            
          </View>
        </View>
    );
  }
}
