import React, { Component } from 'react';
import { Navigator, View, ListView, TouchableHighlight, Text, ScrollView } from 'react-native';
import getStyles from '../styles';
import RNFS from 'react-native-fs';

const styles = getStyles();

export default class App extends Component {
  constructor(props){
    super(props);  
  }
  
  goHome(){
    this.props.navigator.push({id: 'wifi'});
  }

  render() {

    return (
      <View style={styles.view}>
        <View>
          <Text style={styles.title}>AEYRIUM</Text>
        </View>
        <ScrollView contentContainerStyle={styles.bgview}>
          <View style={styles.view}>

            <Text style={styles.message}>{this.props.type}</Text>

            <TouchableHighlight onPress={this.goHome.bind(this)}>
              <Text style={styles.login}>Back</Text>
            </TouchableHighlight>   

          </View>
        </ScrollView>
      </View>
    );
  }
}
