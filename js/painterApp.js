import { DrawingData, DrawingDatabase } from './drawingClasses.js';
import { Exporter } from './exporter.js';
import { CanvasPainter } from './canvasPainter.js';
import { MicroGrid } from './microGrid.js';
import { mouseToCanvas, HSVtoRGBString, hexFromRGBCache } from './utilites.js';
import { Vector2 } from './vector2.js';

import { lineIntersectsRect, lineCircle } from './collision_detection.js';




export class PainterApp{

  canvasIdName = "";
  grid = null;
  gridCount = 0;
  brushSize = 1;
  resolution = 400;
  gridUnit = 2*14; // change the second var
  drawingsDatabase = null;
  drawingData = null; // drawingData_a;
  canvas = null;
  canvasPainter = null;
  ctx = null;
  IS_DOWN = false;
  clientRect = null;
  currentColor = null;
  currentColorHex = "#0000ff";
  // 0: previous, 1: current
  autoFillMousePositions = [new Vector2(), new Vector2()];
  
  exporter = null;
  
  drawings = new DrawingDatabase();

  constructor(params){
    
    const {
      brushSize, resolution, gridUnit, canvasIdName,
      currentColorHex = "#0000ff"
    } = params;
    
    this.brushSize = brushSize;
    this.resolution = resolution;
    this.gridUnit = gridUnit;
    this.canvasIdName = canvasIdName;
    this.currentColorHex = currentColorHex;
    
    
    this.gridCount = gridUnit ** 2;
    // after this gridUnit is not used again, grid.unit should be the bases, but needs refactor
    
    this.grid = new MicroGrid({unit: gridUnit, 
      width: resolution, height: resolution, 
      count: this.gridCount 
    })//.computeRowsColumns(resolution, resolution);
    
    this.drawingData = new DrawingData(this.grid.unit);
    
    this.setupCanvas();
    
    this.canvasPainter = new CanvasPainter({
      canvas: this.canvas, 
      context: this.ctx, 
      grid: this.grid, 
      width: this.grid.width, 
      height: this.grid.height
    });
    
    
    this.exporter = new Exporter();
    
  } // constructor

  
  drawFill_222(ev){
    
    
    // mouseToCanvas(ev,autoFillMousePositions[0]);
    mouseToCanvas(ev,this.autoFillMousePositions[1], this.clientRect);
    
    const start = this.autoFillMousePositions[0];
    const stop = this.autoFillMousePositions[1];
    
    const grid = this.grid;
    
    // ovo.ctx.fillStyle = '#eeaa00';
    // ovo.ctx.beginPath(mouseDown.x, mouseDown.y); // Start a new path
    // ovo.ctx.moveTo(mouseDown.x, mouseDown.y); // Move the pen to (30, 50)
    // ovo.ctx.lineTo(mouse.x, mouse.y); // Draw a line to (150, 100)
    // ovo.ctx.lineWidth = 1;
      
    // ovo.ctx.stroke(); // Render the path
    // debugger
    for (var i = 0; i < grid.count; i++) {
      let vv = grid.getRectAtIndex(i);
      // console.log(vv);
      
      // let gg = lineIntersectsRect(start.x, start.y, stop.x, stop.y, vv.min.x, vv.min.y, vv.width, vv.height);
      
      // let dis = gg.position.distanceTo();
      // lineCircle(x1, y1, x2, y2, cx, cy, r)
      // console.log("vv.position", vv.position);
      // console.log(vv);
      // console.log("vv.min", vv.min);
      // console.log("vv.max", vv.max);
      
      // we need the charatristic of the line to allow diagonol points
      // so circle testing gives this
      // Otherwise the line work is a bit heavier cause its failsafing in stepping style
      // Also note the scalar on radius gives a cheap brush size effect
      // let brushSize = 1.5;
      
      let isInCircle = lineCircle(start.x, start.y, stop.x, stop.y, vv.position.x, vv.position.y, vv.radius * this.brushSize);
      // console.log("isInCircle", isInCircle);
      if(isInCircle){
      // if(gg === true && isInCircle){
      // if(gg === true){
        // debugger
        this.canvasPainter.drawAtIndex(i, grid.unit, grid.width, grid.height, this.ctx, this.currentColorHex);
        this.drawingData.table[i] = 1;
      }
    }
    
    this.autoFillMousePositions[0].copy(this.autoFillMousePositions[1]);
  }


  

  setupCanvas() {
    
    this.canvas = document.getElementById(this.canvasIdName);
    this.ctx = this.canvas.getContext("2d");
    
    this.clientRect = this.canvas.getBoundingClientRect();
    
    const canvas = this.canvas;
    const ctx = this.ctx;
    const resolution = this.resolution;
    const grid = this.grid;
    
    canvas.width = this.grid.width;
    canvas.height = this.grid.height;

    // this.ctx.imageSmoothingEnabled= false
    // this.ctx.globalCompositeOperation = "destination-out"


    // for offscreen stuff
    this.canvasBuffer = document.createElement('canvas');
    this.canvasBuffer.width = resolution;
    this.canvasBuffer.height = resolution;
    this.ctxBuffer = this.canvasBuffer.getContext("2d");

    
    // ctx.fillStyle = "#0000ff";
    ctx.fillStyle = HSVtoRGBString(Math.random(),1,1);
    // ctx.fillRect(0,0,390, 20);
    ctx.fillRect(0,0,resolution, resolution);

    console.log("¿");


    let yy = -1;
    let xx = 0;
    for (var rr = 0; rr < grid.count; rr++) {
      
      let xx = grid.width/grid.unit*rr % grid.width;
      // console.log(xx);
      // console.log(width/gridUnit*(rr+1));
      // console.log("=========");
      if (xx === 0) {
        yy++;
      }
      let y = grid.height/grid.unit*yy % grid.height;
      // console.log(rr/gridCount);
      // ctx.fillStyle = HSVtoRGBString(0.2,1,rr/gridCount);
      ctx.fillStyle = HSVtoRGBString(Math.random(),1,1);
      // we know colorVector was updated
      this.drawingData.assignColor(rr, hexFromRGBCache() );
      
      // ctx.fillRect(xx, y, gridUnit, gridUnit);
      ctx.fillRect(xx, y, grid.size.x, grid.size.y);
    
    }
      
    
  } // setupCanvas

  // handles drawing and database fixing
  clearScreen_CM(color = '#eeeeee'){
    this.ctx.fillStyle = color;
    this.ctx.fillRect(0, 0, this.resolution, this.resolution);
    
    this.canvasPainter.drawGuides();
    this.drawingData.clearTable();
  }

  saveToFileAsDataSize(){
    this.exporter.saveToFileAsDataSize(this.grid, this.drawingData);
  }
  saveToFile(){
    this.exporter.saveToFile(this.canvas);
  }
  generateDataImage(){
    this.exporter.generateDataImage(this.grid, this.drawingData, this.drawings);
  }
}
