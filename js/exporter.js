

import { HSVtoRGBString } from './utilites.js';

export class Exporter{
  // 
  // grid = null;
  // drawingData = null;
  // 
  
  // canvas = null;
  
  words = ["fish", "tacos", "the_over_malrg", "within", "upon", 
  "mices", "ourealy", "could_this_be", "well_houdy_then", "gradprix", 
  "apples", "oranges", "cash", "NFT_NFT" ];

  constructor(){
    
  }

  randomWord(){
    return this.words[Math.floor((Math.random()*this.words.length))];
  }
  
  
  canvasToData(canvas){
    let downloadLink = document.createElement('a');
    var title = "NFT" + "_" + this.randomWord() + "_" + this.randomWord();
    downloadLink.setAttribute('download', title+'.png');
    let dataURL = canvas.toDataURL('image/png');
    return {dataURL:dataURL, downloadLink:downloadLink};
  }
  
  // saves the painted png at its original resolution
  // https://stackoverflow.com/questions/11112321/how-to-save-canvas-as-png-image
  saveToFile(canvas) {
    
    let dataUp = this.canvasToData(canvas);
    
    let url = dataUp.dataURL.replace(/^data:image\/png/,'data:application/octet-stream');
    dataUp.downloadLink.setAttribute('href', url);
    dataUp.downloadLink.click();
    
  }



  // saves the file at whatever the grid size is
  // so its tiny really, can be used as a database
  // https://stackoverflow.com/questions/11112321/how-to-save-canvas-as-png-image
  saveToFileAsDataSize(grid, drawingData) {
    
    
    let xLim = grid.unit;
    let yLim = grid.unit;
    
    // ovo.canvasBuffer = document.createElement('canvas');
    this.canvas = document.createElement('canvas');
    const canvas = this.canvas;
    
    canvas.width = xLim;
    canvas.height = yLim;
    let context = canvas.getContext("2d");
        
    let width = xLim;
    let height = yLim;
    

    console.log(grid.unit, xLim, yLim, canvas.width,canvas.height);
    
    context.fillStyle = HSVtoRGBString(Math.random(),1,1);
    context.fillRect(0, 0, width, height);

    let x=0;
    let y=0;
    
    for (var i = 0; i < grid.count; i++) {
      // grid.unit
      let val = drawingData.table[i];
      let bb = grid.getColRowIndexes(i);
      let color = "#ffffff";
    
      if (val === 1){
        color = "#000000";
      }
      // drawAtIndex(i, 4, width, height, context, "#000000")
      let col = bb[0];
      let row = bb[1];
    
      // let sizeX = width/gridUnit;
      // let sizeY = height/gridUnit;
    
      // let x = grid.unit * row % xLim;
      // let y = grid.unit * col % yLim;
      context.fillStyle = color;
      context.fillRect(x, y, 1, 1);
      
      x++;
      if(x===grid.unit){
        x = 0;
        y++;
      }
    
    }

    let dataUp = this.canvasToData(canvas);
    
    let url = dataUp.dataURL.replace(/^data:image\/png/,'data:application/octet-stream');
    dataUp.downloadLink.setAttribute('href', url);
    dataUp.downloadLink.click();
    
  }



  // makes an image and adds to the drawingsIN array
  // https://stackoverflow.com/questions/11112321/how-to-save-canvas-as-png-image
  generateDataImage(grid, drawingData, drawingsIN) {
    
    
    // canvas.toBlob(function(blob) {
    //     saveAs(blob, "pretty image.png");
    // });
    // let grid = ovo.grid;

    let xLim = grid.unit;
    let yLim = grid.unit;
    
    // ovo.canvasBuffer = document.createElement('canvas');
    // let canvas = document.createElement('canvas');
    this.canvas = document.createElement('canvas');
    const canvas = this.canvas;
    canvas.width = xLim;
    canvas.height = yLim;
    let context = canvas.getContext("2d");

    let width = xLim;
    let height = yLim;

    // console.log(grid.unit, xLim, yLim, canvas.width,canvas.height);
    
    context.fillStyle = HSVtoRGBString(Math.random(),1,1);
    context.fillRect(0, 0, width, height);

    
    let x=0;
    let y=0;
    for (var i = 0; i < grid.count; i++) {
      // grid.unit
      let val = drawingData.table[i];
      let bb = grid.getColRowIndexes(i);
      let color = "#ffffff";
    
      if (val === 1){
        color = "#000000";
      }
      
      let col = bb[0];
      let row = bb[1];

      context.fillStyle = color;
      context.fillRect(x, y, 1, 1);
      
      x++;
      if(x===grid.unit){
        x = 0;
        y++;
      }
    
    }


    let dataUp = this.canvasToData(canvas);
    
    const img = document.createElement('img');
    img.src = dataUp.dataURL;
    
    const yy = document.getElementById('images');
    yy.appendChild(img);
    
    drawingsIN.add(drawingData.table.slice())
    drawingsIN.addSorted(letterinput.value, drawingData.table.slice())
    
    // console.log(letterinput.value);
    
  }



}
