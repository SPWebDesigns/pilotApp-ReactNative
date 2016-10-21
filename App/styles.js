import { StyleSheet } from 'react-native';

export default function getStyles(){
  const primary = '#3399db';
  //const primary = '#5BFF1B';
  return StyleSheet.create({
    bgview: {
      flex: 1,
      alignItems: 'stretch',
      backgroundColor: '#000000',
      padding: 0,
      margin: 0
    },

    view: {
      flex: 1,
      alignItems: 'stretch',
      backgroundColor: '#F4F4F4',
      padding: 0,
      margin: 0
    },

    viewrow: {
      flex: 0,
      flexDirection: 'row',
      backgroundColor: '#F4F4F4',
      padding: 15
    },

    viewrowWhite:{
      flex: 0,
      flexDirection: 'row',
      backgroundColor: 'white',
      padding: 15
    },

    viewContainer: {
      flex: 1,
      marginLeft: 15,
      marginRight: 15,
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
      paddingLeft: 15,
      paddingTop: 10,
      flex: 1,
      justifyContent:'center'
    },
    title: {
      fontSize: 26,
      textAlign: 'center',
      backgroundColor: primary,
      color: 'white',
      marginTop: 20
    },
    subtitle: {
      flex: 1,
      fontSize: 13,
      color: primary,
      marginTop: 10,
      paddingLeft: 35,
      paddingTop: 30
    },
    statusText: {
      textAlign: 'center',
      marginTop: 20,
      fontSize: 18
    },
    login: {
      backgroundColor: 'white',
      color: primary,
      padding: 10,
      textAlign: 'center',
      marginTop: 15,
      borderColor: primary,
      borderWidth: 1
    },
    loginbkp: {
      backgroundColor: primary,
      color: '#FFF',
      padding: 15,
      textAlign: 'center',
      marginTop: 15
    },
    btnHome: {
      backgroundColor: primary,
      color: '#FFF',
      padding: 15,
      paddingTop: 30,
      paddingBottom: 30,
      textAlign: 'center',
      marginTop: 15
    },
    message: {
      backgroundColor: primary,
      borderColor: 'white',
      borderWidth: 1,
      color: 'white',
      padding: 25,
      textAlign: 'center',
      marginTop: 15,
      fontSize: 24
    },
    loading: {
      opacity: 0.5
    },
    tileTitle: {
      fontSize: 20
    },
    imageContainer: {
      alignItems: 'stretch',
      paddingTop: 20
    },
    imageContainerWhite: {
      alignItems: 'stretch',
      paddingTop: 20,
    },
    imageWifi: {
      width: 60,
      height: 54,
      padding: 0,
      margin: 0,
      backgroundColor: 'white',
    },
    imageCloud: {
      width: 77,
      height: 50,
      padding: 0,
      margin: 0,
    }
  });
}
