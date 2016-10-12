import React, { Component } from 'react';
import { Navigator, View, ListView, TouchableHighlight, Text } from 'react-native';
import { getReservationList } from '../services/AsyncService';
import Tile from './Tile';
import getStyles from '../styles';

const styles = getStyles();

export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {files: []};
    setTimeout(()=> {
      this.getFileList();
    }, 1000)
  }

  goHome(){
    this.props.navigator.push({id: 'wifi'});
  }

  getFileList(){
    // getReservationList(month,year).then((data)=>{
    //   const reservations = data.payload;
    //   this.setState(Object.assign({}, this.state, {reservations}));
    // });
    var files = ['KPAO_K1.xml', 'KPAO_K2.xml', 'KPAO_K3.xml'];
    this.setState(Object.assign({}, this.state, {files}));
  }

  render() {
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    const dataSource = ds.cloneWithRows(this.state.files);

    return (
      <View style={styles.view}>
        <ListView
          enableEmptySections={true}
          dataSource={dataSource}
          renderRow={(rowData)=>
              <Tile navigator={this.props.navigator} data={rowData}></Tile>
          }
         />
         <TouchableHighlight onPress={this.goHome.bind(this)}>
          <Text style={styles.login}>Back to Home</Text>
        </TouchableHighlight>
      </View>
      
    );
  }
}
