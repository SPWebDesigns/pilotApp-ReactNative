const API = 'http://flashair/';

const getListParams = 'command.cgi?op=100&DIR=/';
const getSSIDParams = 'command.cgi?op=104';

export function serialize (data) {
  return Object.keys(data).map(function (keyName) {
      return encodeURIComponent(keyName) + '=' + encodeURIComponent(data[keyName])
  }).join('&');
};

export function checkFlashAirConnection (data) {
  return fetch(API)
  .then((response) => response)
  .then((responseJson) => {
    return true;
  })
  .catch((error) => {
    return false;
  });
};


// var body = null; //earlier i used var body =' '; //blank value --null & blank makes a different
// if (method === 'post' || method === 'POST' || method === 'put' || method === 'PUT') {
//   body = serializedData;
//   headers = {
//     'Accept': 'application/json',
//     'Authorization': 'Bearer ' + this.authToken,
//     'Content-Type': 'application/x-www-form-urlencoded',
//   };
// } else {
//   url = url + '?' + serializedData;
//   headers = {
//     'Accept': 'application/json',
//     'Authorization': 'Bearer ' + this.authToken,
//   };
// }

// return fetch(url,{
//   method: method,
//   headers: headers,
//   body: body,
// })

// fetch('http://facebook.github.io/react-native/movies.json')
//   .then((response) => response.json())
//   .then((responseJson) => {
//     //works fine in simulator
//     this.setState({title: responseJson.title})
//   })
//   .catch((error) => {
//     //hits this everytime on the actual device
//     console.error(error);
//   });

export function getSSID(){
  return fetch(API + getSSIDParams, {
    method: 'GET',
    body: null,
    // headers: {
    //     'Accept': 'application/text',
    //     "Content-Type": "application/x-www-form-urlencoded",
    // }
  })
    .then(function(response) {
      return response.text();
    })
    .then((responseJson) => {
      console.log(responseJson);
      return responseJson;
    })
    .catch((error) => {
      console.error(error);
  });
}

export function fetchFiles(){
  return fetch(API + getListParams, {
    method: 'GET',
    body: null,
  })
  .then(function(response) {
      return response.text();
    })
  .then((responseJson) => {
    console.log(responseJson);
    return responseJson;
  })
  .catch((error) => {
    console.error(error);
  });
}

export function fetchFile(filename){
  console.log(API + filename);
  return fetch(API + filename, {
    method: 'GET'
  })
  .then(function(response) {
    return response.text();
  })
  .then((responseJson) => {
    return responseJson;
  })
  .catch((error) => {
    console.error(error);
  });
}

export function uploadFile(file){
  var serializeJSON = function(file) {
    return Object.keys(file).map(function (keyName) {
      return encodeURIComponent(keyName) + '=' + encodeURIComponent(file[keyName])
    }).join('&');
  }

  return fetch('http://danielgeslin.com/generic-file-uploader/upload.php', {
    method: 'POST',
    body: serializeJSON({
      data: file
    })
  })
  .then(function(response) {
    console.log(response);
    return response.json();
  })
  .then((responseJson) => {
    return responseJson;
  })
  .catch((error) => {
    console.log(response);
    console.error(error);
  });
}
