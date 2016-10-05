import { StyleSheet } from 'react-native';

export default function getStyles(){
  const primary = '#3399db';
  return StyleSheet.create({
    view: {
      flex: 1,
      alignItems: 'stretch',
      backgroundColor: '#F4F4F4',
      padding: 15
    },
    input: {
      height: 45,
      borderColor: 'gray',
      borderWidth: 1,
      padding: 15,
      marginBottom: 10,
      lineHeight: 28
    },
    centerView: {
      flex: 1,
      justifyContent:'center'
    },
    title: {
      fontSize: 20,
      textAlign: 'center',
      color: primary,
      marginTop: 0
    },
    statusText: {
      textAlign: 'center',
      marginTop: 20,
      fontSize: 18
    },
    login: {
      backgroundColor: primary,
      color: '#FFF',
      padding: 15,
      textAlign: 'center',
      marginTop: 15
    },
    loading: {
      opacity: 0.5
    },
    tileTitle: {
      fontSize: 20
    },
    imageContainer: {
      flex: 1,
      alignItems: 'stretch'
    },
    image: {
      width: 150,
      height: 100,
      marginTop: 20
    }
  });
}
