

// this handles painting the canvas element
// does not hold data


export class CanvasPainter{
  constructor({canvas, context, grid, width, height}){
    this.canvas = canvas;
    this.context = context;
    this.grid = grid;
    this.width = width;
    this.height = height;
  }
  
  // drawAtIndex_CM({index, gridUnit, width, height, context, color}) {
  drawAtIndex(index, color="#aa00ff") {

    let bb = this.grid.getColRowIndexes(index);
    
    // console.log("pre count", ciiy*gridCount);
    
    // drawAtIndex_ColRow(bb[0], bb[1], gridUnit, width, height, context, color);
    this.drawAtIndex_ColRow({col:bb[0], row:bb[1], color});

  }

  // drawAtIndex_ColRow(col, row, gridUnit, width, height, context, color) {
  drawAtIndex_ColRow({col, row, color}) {
    const width = this.width;
    const height = this.height;
    const gridUnit = this.grid.unit;
    const context = this.context;
    let sizeX = width/gridUnit;
    let sizeY = height/gridUnit;
    let x = width/gridUnit * row % width;
    let y = height/gridUnit * col % height;
    context.fillStyle = color;
    context.fillRect(x, y, sizeX, sizeY);
  }

  // redrawCanvasWithData({width, height, gridUnit, context, dataIn}) {
  redrawCanvasWithData(dataIn) {
    const width = this.width;
    const height = this.height;
    const gridUnit = this.grid.unit;
    const context = this.context;
    
    // let width = resolution;
    // let height = resolution;
    let sizeX = width/gridUnit;
    let sizeY = height/gridUnit;
    let gridCount = gridUnit ** 2;
    
    // we just step the grid instead of nested loops
    let yy = -1;
    let xx = 0;
    for (var rr = 0; rr < gridCount; rr++) {
      
      let xx = width/gridUnit*rr % width;
      if (xx === 0) {
        yy++;
      }
      let y = height/gridUnit*yy % height;
      context.fillStyle = `#${dataIn[rr]}`;
      // we know colorVector was updated
      context.fillRect(xx, y, sizeX, sizeY);
    }
    
  }



  drawGuides() {
    const ctx = this.context;
    const grid = this.grid;
    ctx.strokeStyle = '#aaaaaa';
    ctx.beginPath(grid.width/2, 0); // Start a new path
    ctx.moveTo(grid.width/2, 0); // Move the pen to (30, 50)
    ctx.lineTo(grid.width/2, grid.height); // Draw a line to (150, 100)
    ctx.lineWidth = 1;
    ctx.stroke(); // Render the path
    
    ctx.beginPath(0, grid.height/2); // Start a new path
    ctx.moveTo(0, grid.height/2); // Move the pen to (30, 50)
    ctx.lineTo(grid.width, grid.height/2); // Draw a line to (150, 100)
    ctx.lineWidth = 1;
    ctx.stroke(); // Render the path
    
  }
}
