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
    let name = this.props.data.name;
    let path = RNFS.DocumentDirectoryPath + '/' + this.props.data.name;
    this.setState(Object.assign({}, this.state, {uploading: true}));
     
    RNFS.readFile(path)
    .then((data) => {
      file = data;
      uploadFile(file, this.props.data.name)
      .then((data)=>{
        this.setState(Object.assign({}, this.state, {uploading: false}));
      });   
    })
    .catch(function(err){
      console.log(err);
    });    
  }

  deleteFile(){
    return false;
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
      <View style={styles.viewrow}>
          <Image
            style={styles.image}
            source={require('./../imgs/upload-icon-3.png')}
          />
          <View style={styles.centerView}>
            <TouchableHighlight onPress={this.uploadFile.bind(this)}>
              <Text style={styles.login}>Upload {data.name}</Text>
            </TouchableHighlight>
            
            {deleteBtn}
            
          </View>
        </View>
    );
  }
}
