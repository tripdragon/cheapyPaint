

import {Vector2} from './vector2.js';

export class MicroGrid{
  
  // unit shoudl be size really
  constructor( {unit = 4, width = 40, height = 40, power = 2, count} = {} ) {
    this.unit = unit;
    this.width = width;
    this.height = height;
    this.size = new Vector2(width/unit, height/unit);
    this.count = count || unit ** power;
    // this.count = count;
    
    // this.rows = rows;
    // this.columns = columns;
  }
  reflow({unit,width,height,power,count}={}){
    
  }

  // raise each row col index 1 to handle 0 index
  // for every row we have say gridUnit 8
  // minus the remainder for the total for a row
  // 2 * 8 - (8-7)
  // let atIndex = ( (iiy + 1) * gridUnit ) - (gridUnit - iix);
  // console.log("atIndex", atIndex);
  
  // col is y, row is x
  // 0 : col, 1: row
  _colRow = [-1,-1];
  getColRowIndexes(index, gridUnit){
    let unit = gridUnit || this.unit;
    // debugger
    let col = Math.floor(index/unit);
    // console.log("col", col);
    let row = Math.floor( index - ( col*unit ) );
    this._colRow[0] = col;
    this._colRow[1] = row;
    return this._colRow;
  }
  
  // from a vector2 like a mouse, return the index from the flat array
  getIndexAtMouse(mouse){
    const gridUnit = this.unit;
    let iix = Math.max(0, Math.floor((mouse.x)/this.width*gridUnit) );
    let iiy = Math.max(0, Math.floor((mouse.y)/this.height*gridUnit) );
    
    // console.log(iix, iiy);
    
    // raise each row col index 1 to handle 0 index
    // for ever row we have gridUnit 8
    // minus the remainder for the total for a row
    // 2 * 8 - (8-7)
    
    let atIndex = ( (iiy + 1) * gridUnit ) - (gridUnit - iix);
    
    return atIndex;
  }
  
  
  _rect = { min:new Vector2(), max:new Vector2(), width:0,height:0, position:new Vector2(), center:new Vector2(), radius: 0  }
  
  // min max and position are in world space
  // center is local
  getRectAtIndex(index){
    let indexes = this.getColRowIndexes(index);
    // console.log(indexes);
    let rect = this._rect;
    
    rect.width = this.width/this.unit;
    rect.height = this.height/this.unit;
    
    rect.min.x = rect.width * indexes[1];
    rect.min.y = rect.height * indexes[0];
    
    rect.max.x = rect.min.x + rect.width;
    rect.max.y = rect.min.y + rect.height;
    
    rect.position.x = rect.max.x - (rect.width / 2);
    rect.position.y = rect.max.y - (rect.height / 2);
    
    rect.center.x = rect.width / 2;
    rect.center.y = rect.height / 2;
    
    rect.radius = rect.width / 2;
    
    // console.log(indexes);
    // console.log(rect);
    // debugger
    return rect;
    
  }





}
