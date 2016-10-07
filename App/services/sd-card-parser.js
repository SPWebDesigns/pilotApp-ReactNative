export default class parseSdResults {
  constructor(){
    this.input = '';
    this.inputArray = [];
    this.fileArray = [];
    this.removeTitle = true;
    this.objKeys = ['filename', 'size', 'attribute', 'date', 'time']; //order matters
  }

  parse(){
    let tempArray = [];
    this.fileArray = [];
    if(!this.input.length){
      return this.fileArray;
    }
    this.inputArray = this.input.split(',');
    if(this.removeTitle){
      this.inputArray.splice(0,1);
    }
    for(let i = 0, marker = 0; i<this.inputArray.length; i++){
      tempArray[marker] = tempArray[marker] ? tempArray[marker] : [];
      tempArray[marker].push(this.inputArray[i]);
      
      if(tempArray[marker].length !== this.objKeys.length){
        continue;
      }
      let obj = {};
      for(let index = 0; index<this.objKeys.length; index++){
        let key = this.objKeys[index];
        let isNumber = !isNaN(tempArray[marker][index]);
        let value = isNumber ? Number(tempArray[marker][index]) : tempArray[marker][index];
        obj[key] = value;
      }
      this.fileArray.push(obj);
      marker++;
    }
    return this.fileArray;
  }

  setInput(input){
    this.input = input;
  }

  getInput(){
    return this.input;
  }

  getFileArray(){
    return this.fileArray;
  }
}


// var a = `WLANSD_FILELIST
// ,~1.TRA,4096,34,18740,22561
// ,SD_WLAN,0,18,16602,18432
// ,TRASHE~1,0,18,18740,22561
// ,SPOTLI~1,0,18,18740,22561
// ,_KPAO_~1.XML,4096,34,18757,28241
// ,_KPAO_~2.XML,4096,34,18757,28248
// ,FLASHA~1.COM,0,16,18757,28773
// ,_FLASH~1.COM,4096,34,18757,28774
// ,KPAO_K2.XML,12464,32,18757,28236
// ,KPAO_K3.XML,12464,32,18757,28245`;

// var obj = new parseSdResults();
// obj.setInput(a);
// obj.parse();
// console.log(obj.getFileArray());