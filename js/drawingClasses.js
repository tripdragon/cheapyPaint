



// database system
export class DrawingData{
  constructor(gridUnit){
    this.unit = gridUnit;
    let len = gridUnit**2;
    this.colors = [len];
    this.cache = [len];
    this.table = [len];
    for (var i = 0; i < len; i++) {
      this.table[i] = 0;
    }
  }
  assignColor(index, color){
    // this would become a .copy()
    this.colors[index] = color;
  }
  clearTable(){
    for (var i = 0; i < this.table.length; i++) {
      this.table[i] = 0;
    }
  }
  setTableVal(index,val){
    this.table[index] = val;
  }
}

// 
// holds array data of drawings
// could be a CheapPool but dont have that file in here
export class DrawingDatabase {
  all = [];
  sorted = {};
  add(item){
    this.all.push(item);
  }
  addSorted(key, item){
    if( ! this.sorted.hasOwnProperty(key) ){
      this.sorted[key] = [];
    }
    this.sorted[key].push(item);
    this.add(item);
  }
  export(all = false){
    let yy = {sorted:{}};
    // JSON.stringify(drawings.sorted)
  }
}
