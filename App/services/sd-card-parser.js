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
      this.fileArray.push({name: obj});
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