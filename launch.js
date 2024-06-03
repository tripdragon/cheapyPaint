
import { PainterApp } from './js/painterApp.js';
// import { PainterApp } from './dist/painterAppModule.1.0.js';

import {Vector2} from './js/vector2.js';
import { mouseToCanvas, randomHexString } from './js/utilites.js';


export function launch(configs){
  
  const ovo = new PainterApp(configs);

  handleURlParams(ovo);  
  setupUI(ovo);
  setupMouseEvents_CM(ovo);
  setupKeyEvents(ovo);

  return ovo;


  // setTimeout(function(){
  //   console.log("¿??");
  //   drawingData_a.current.reverse();
  //   redrawCanvasWithData({width:grid.width, height:grid.height, gridUnit: grid.unit, context: ctx, dataIn: drawingData_a.current })
  // 
  //   for (var i = 0; i < grid.count; i++) {
  //     drawAtIndex(i, grid.unit, grid.width, grid.height, ctx, "#eeeeee")
  //   }
  // 
  // }, 100)



}

// these are for the interface so they dont pertain to the app
// except for the mousing of course

function handleURlParams(app){
  const urlParams = new URLSearchParams(window.location.search);
  const size = urlParams.get('size');
  const _brushsize = urlParams.get('brushsize');
  if (size) {
    // gridUnit = 2 * size;
    app.gridUnit = size;
    app.gridUnit = Math.min(gridUnit, 500);
  }
  if(_brushsize){
    app.brushsize = _brushsize;
  }
}



function setupUI(app) {
  

  const letterinput = document.getElementById('letterinput');

  const savebutton = document.getElementById('savebutton');
  savebutton.onclick = function(ev) {
    app.generateDataImage();
    app.clearScreen_CM();
  }

  const iterrateSaveButton = document.getElementById('iterrateSaveButton');
  iterrateSaveButton.onclick = function(ev) {
    app.generateDataImage();
  }

  const clearbutton = document.getElementById('clearbutton');
  clearbutton.onclick = function(ev) {
    app.clearScreen_CM();
  }

  const downloadButton = document.getElementById('downloadButton');
  downloadButton.onclick = function(ev) {
    app.saveToFile();
  }

  const dataDownloadButton = document.getElementById('dataDownloadButton');
  dataDownloadButton.onclick = function(ev) {
    app.saveToFileAsDataSize();
  }
  
}



function setupMouseEvents_CM(app){
  
  // var IS_DOWN = false;

  const mouse = new Vector2();
  const mouseDown = new Vector2();
  
  // const _app = app;
  const grid = app.grid;
  const ctx = app.ctx;
  const canvas = app.canvas;
  
  
  
  // canvas.addEventListener( 'pointermove', onPointerMove.bind(app), true );
  // canvas.addEventListener( 'pointerdown', onPointerDown.bind(app), true );
  // canvas.addEventListener( 'pointerup', onPointerUp.bind(app), true );
  canvas.addEventListener( 'pointermove', onPointerMove, true );
  canvas.addEventListener( 'pointerdown', onPointerDown, true );
  canvas.addEventListener( 'pointerup', onPointerUp, true );
  
  // note see that these are nested in the function
  function onPointerMove( ev ) {
    
    if ( !app.IS_DOWN ) {
      // debugger
      return;
    }
    mousing_CM(ev, mouse);
    
    console.log("¿¿¿");
    app.drawFill_222(ev);
    
    // drawGuides();
    
  }
  
  
  function onPointerDown(ev){
    app.IS_DOWN = true;
    mouseToCanvas(ev,mouseDown, app.clientRect);
    mousing_CM(ev);
    
    // for the auto fill system
    mouseToCanvas(ev,app.autoFillMousePositions[0], app.clientRect);
    mouseToCanvas(ev,app.autoFillMousePositions[1], app.clientRect);

    // drawGuides();

  }


  function onPointerUp(ev){
    app.IS_DOWN = false;
    mouseToCanvas(ev,mouse, app.clientRect);
    // drawFill_111(ev);
    
    app.drawFill_222(ev);
    
    // drawGuides();
    console.log("?Up");
    
  }
  
  
  // this handles painting events when mouse is down
  function mousing_CM(ev) {
    // NOTE this function being nested references vars above
    
    // return
    mouseToCanvas(ev,mouse, app.clientRect);
    
    //// drawingData_a.current.reverse();
    // redrawCanvasWithData({width:resolution, height:resolution, gridUnit: gridUnit, context: ctx, dataIn: drawingData_a.current })
    
    let atIndex = grid.getIndexAtMouse(mouse);
    // console.log("atIndex", atIndex);
    // this paints the canvas
    // app.canvasPainter.drawAtIndex(atIndex, grid.unit, grid.width, grid.height, app.ctx, app.currentColor)
    app.canvasPainter.drawAtIndex(atIndex, app.currentColorHex)
    // this sets the database value
    app.drawingData.setTableVal(atIndex, 1);
  }

}



function setupKeyEvents(app){
  
  app.canvas.addEventListener("keydown", (ev) => {
  // window.addEventListener("keydown", (ev) => {
      // if (event.defaultPrevented) {
      //   return; // Should do nothing if the default action has been cancelled
      // }

      console.log(event);
      if (ev.key === "a") {
        // 
        app.clearScreen_CM();
      }
      
      if(ev.key === "q"){
        app.saveToFile();
      }
      if(ev.key === "w"){
        app.saveToFileAsDataSize();
      }
      if(ev.key === "e"){
        app.generateDataImage();
        app.clearScreen_CM();
      }
      
      if(ev.key === "["){
        app.brushSize -= 1;
        app.brushSize = Math.max(1, app.brushSize);
      }
      if(ev.key === "]"){
        app.brushSize += 1;
        app.brushSize = Math.min(9, app.brushSize);
      }
      if(ev.key === "r"){
        // need to add color box as well
        app.currentColorHex = randomHexString();  
      }
      if(ev.key === "c"){
        // app.generateDataImage();
        app.clearScreen_CM();
      }
      if(ev.key === "s"){
        app.generateDataImage();
        app.clearScreen_CM();
      }
      if(ev.key === "i"){
        app.generateDataImage();
      }
      
      
      // // let handled = false;
      // if (event.key !== undefined) {
      //   // Handle the event with KeyboardEvent.key
      //   handled = true;
      // } else if (event.keyCode !== undefined) {
      //   // Handle the event with KeyboardEvent.keyCode
      //   handled = true;
      // }
      
  });

}
