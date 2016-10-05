const API = 'http://flashair/';

const getListParams = 'command.cgi?op=100&DIR=/';
const getSSID = 'command.cgi?op=104';

export function serialize (data) {
  return Object.keys(data).map(function (keyName) {
      return encodeURIComponent(keyName) + '=' + encodeURIComponent(data[keyName])
  }).join('&');
};

export function fetchFiles(){
  return fetch(API + getListParams)
  .then((response) => response.json())
  .then((responseJson) => {
    return responseJson;
  })
  .catch((error) => {
    console.error(error);
  });
}

export function fetchFile(filename){
  return fetch(API + filename,{
    method: 'GET'
  })
  .then((response) => response.json())
  .then((responseJson) => {
    return responseJson;
  })
  .catch((error) => {
    console.error(error);
  });;
}
