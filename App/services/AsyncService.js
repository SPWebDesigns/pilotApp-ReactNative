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
      console.log(response);
      return response.text();
    })
    .then((responseJson) => {
      return responseJson;
    })
    .catch((error) => {
      console.log(error);
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
    //console.error(error);
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
    //console.error(error);
  });
}

export function uploadFile(file, name){
  console.log(file);

  var serializeJSON = function(file) {
    return Object.keys(file).map(function (keyName) {
      return encodeURIComponent(keyName) + '=' + encodeURIComponent(file[keyName])
      //return encodeURIComponent(keyName) + '=' + file[keyName]
    }).join('&');
  }

  var serialize = function(data) {
    return Object.keys(data).map(function (keyName) {
        return encodeURIComponent(keyName) + '=' + encodeURIComponent(data[keyName])
    }).join('&');
  };

  return fetch('http://danielgeslin.com/generic-file-uploader/upload.php', {
    method: 'POST',
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    body: serialize({
      data: file.trim(),
      name: name 
    })
  })
  .then(function(response) {
    console.log(response);
    return response.json();
  })
  .then((responseJson) => {
    console.log(responseJson);
    return responseJson;
  })
  .catch((error) => {
    console.log(error);
    return error;
    //console.error(error);
  })
}
