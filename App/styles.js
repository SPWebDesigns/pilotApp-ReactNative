import { StyleSheet } from 'react-native';

export default function getStyles(){
  const primary = '#3399db';
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
      width: 40,
      height: 50,
      marginTop: 20
    }
  });
}
