// database system
class $8132b21bff19b719$export$b12212111e5a3769 {
    constructor(gridUnit){
        this.unit = gridUnit;
        let len = gridUnit ** 2;
        this.colors = [
            len
        ];
        this.cache = [
            len
        ];
        this.table = [
            len
        ];
        for(var i = 0; i < len; i++)this.table[i] = 0;
    }
    assignColor(index, color) {
        // this would become a .copy()
        this.colors[index] = color;
    }
    clearTable() {
        for(var i = 0; i < this.table.length; i++)this.table[i] = 0;
    }
    setTableVal(index, val) {
        this.table[index] = val;
    }
}
class $8132b21bff19b719$export$b3b683065954d4c7 {
    all = [];
    sorted = {};
    add(item) {
        this.all.push(item);
    }
    addSorted(key, item) {
        if (!this.sorted.hasOwnProperty(key)) this.sorted[key] = [];
        this.sorted[key].push(item);
        this.add(item);
    }
    export(all = false) {
        let yy = {
            sorted: {}
        };
    // JSON.stringify(drawings.sorted)
    }
}


function $60d029dc6af41112$export$3a89f8d6f6bf6c9f(x, y, t) {
    return (1 - t) * x + t * y;
}
const $60d029dc6af41112$var$colorVector = {
    r: 0,
    g: 0,
    b: 0
};
function $60d029dc6af41112$export$61dbc3014460e6c3(h, s, v, vector) {
    // if using 256 color space
    // HSVtoRGB(i/256,1,1, colorVector);
    // ctx.fillStyle = `rgb(${colorVector.r},${colorVector.g},${colorVector.b})`;
    var r, g, b, i, f, p, q, t;
    if (arguments.length === 1) s = h.s, v = h.v, h = h.h;
    i = Math.floor(h * 6);
    f = h * 6 - i;
    p = v * (1 - s);
    q = v * (1 - f * s);
    t = v * (1 - (1 - f) * s);
    switch(i % 6){
        case 0:
            r = v, g = t, b = p;
            break;
        case 1:
            r = q, g = v, b = p;
            break;
        case 2:
            r = p, g = v, b = t;
            break;
        case 3:
            r = p, g = q, b = v;
            break;
        case 4:
            r = t, g = p, b = v;
            break;
        case 5:
            r = v, g = p, b = q;
            break;
    }
    vector.r = Math.round(r * 255);
    vector.g = Math.round(g * 255);
    vector.b = Math.round(b * 255);
}
function $60d029dc6af41112$export$fd6e24a0caf3e4cb(h, s, v) {
    // returns 255 space vector string
    $60d029dc6af41112$export$61dbc3014460e6c3(h, s, v, $60d029dc6af41112$var$colorVector);
    return `rgb(${$60d029dc6af41112$var$colorVector.r},${$60d029dc6af41112$var$colorVector.g},${$60d029dc6af41112$var$colorVector.b})`;
}
function $60d029dc6af41112$export$34d09c4a771c46ef(r, g, b) {
    if (r > 255 || g > 255 || b > 255) throw "Invalid color component";
    return (r << 16 | g << 8 | b).toString(16);
}
function $60d029dc6af41112$export$517d98b40c45ffec() {
    return ("000000" + $60d029dc6af41112$export$34d09c4a771c46ef($60d029dc6af41112$var$colorVector.r, $60d029dc6af41112$var$colorVector.g, $60d029dc6af41112$var$colorVector.b)).slice(-6);
}
function $60d029dc6af41112$export$7ac26ea692ac2fe0(ev, vectorIn, clientRect) {
    vectorIn.x = ev.clientX - clientRect.left;
    vectorIn.y = ev.clientY - clientRect.top;
}
function $60d029dc6af41112$export$d07c3b3b0c2bfc35(size = 6) {
    let result = [];
    let hexRef = [
        "0",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "a",
        "b",
        "c",
        "d",
        "e",
        "f"
    ];
    for(let n = 0; n < size; n++)result.push(hexRef[Math.floor(Math.random() * 16)]);
    return "#" + result.join("");
}


class $06a759a80ee4afa0$export$a46f15a9a9fee68a {
    // 
    // grid = null;
    // drawingData = null;
    // 
    // canvas = null;
    words = [
        "fish",
        "tacos",
        "the_over_malrg",
        "within",
        "upon",
        "mices",
        "ourealy",
        "could_this_be",
        "well_houdy_then",
        "gradprix",
        "apples",
        "oranges",
        "cash",
        "NFT_NFT"
    ];
    constructor(){}
    randomWord() {
        return this.words[Math.floor(Math.random() * this.words.length)];
    }
    canvasToData(canvas) {
        let downloadLink = document.createElement("a");
        var title = "NFT_" + this.randomWord() + "_" + this.randomWord();
        downloadLink.setAttribute("download", title + ".png");
        let dataURL = canvas.toDataURL("image/png");
        return {
            dataURL: dataURL,
            downloadLink: downloadLink
        };
    }
    // saves the painted png at its original resolution
    // https://stackoverflow.com/questions/11112321/how-to-save-canvas-as-png-image
    saveToFile(canvas) {
        let dataUp = this.canvasToData(canvas);
        let url = dataUp.dataURL.replace(/^data:image\/png/, "data:application/octet-stream");
        dataUp.downloadLink.setAttribute("href", url);
        dataUp.downloadLink.click();
    }
    // saves the file at whatever the grid size is
    // so its tiny really, can be used as a database
    // https://stackoverflow.com/questions/11112321/how-to-save-canvas-as-png-image
    saveToFileAsDataSize(grid, drawingData) {
        let xLim = grid.unit;
        let yLim = grid.unit;
        // ovo.canvasBuffer = document.createElement('canvas');
        this.canvas = document.createElement("canvas");
        const canvas = this.canvas;
        canvas.width = xLim;
        canvas.height = yLim;
        let context = canvas.getContext("2d");
        let width = xLim;
        let height = yLim;
        console.log(grid.unit, xLim, yLim, canvas.width, canvas.height);
        context.fillStyle = (0, $60d029dc6af41112$export$fd6e24a0caf3e4cb)(Math.random(), 1, 1);
        context.fillRect(0, 0, width, height);
        let x = 0;
        let y = 0;
        for(var i = 0; i < grid.count; i++){
            // grid.unit
            let val = drawingData.table[i];
            let bb = grid.getColRowIndexes(i);
            let color = "#ffffff";
            if (val === 1) color = "#000000";
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
            if (x === grid.unit) {
                x = 0;
                y++;
            }
        }
        let dataUp = this.canvasToData(canvas);
        let url = dataUp.dataURL.replace(/^data:image\/png/, "data:application/octet-stream");
        dataUp.downloadLink.setAttribute("href", url);
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
        this.canvas = document.createElement("canvas");
        const canvas = this.canvas;
        canvas.width = xLim;
        canvas.height = yLim;
        let context = canvas.getContext("2d");
        let width = xLim;
        let height = yLim;
        // console.log(grid.unit, xLim, yLim, canvas.width,canvas.height);
        context.fillStyle = (0, $60d029dc6af41112$export$fd6e24a0caf3e4cb)(Math.random(), 1, 1);
        context.fillRect(0, 0, width, height);
        let x = 0;
        let y = 0;
        for(var i = 0; i < grid.count; i++){
            // grid.unit
            let val = drawingData.table[i];
            let bb = grid.getColRowIndexes(i);
            let color = "#ffffff";
            if (val === 1) color = "#000000";
            let col = bb[0];
            let row = bb[1];
            context.fillStyle = color;
            context.fillRect(x, y, 1, 1);
            x++;
            if (x === grid.unit) {
                x = 0;
                y++;
            }
        }
        let dataUp = this.canvasToData(canvas);
        const img = document.createElement("img");
        img.src = dataUp.dataURL;
        const yy = document.getElementById("images");
        yy.appendChild(img);
        drawingsIN.add(drawingData.table.slice());
        drawingsIN.addSorted(letterinput.value, drawingData.table.slice());
    // console.log(letterinput.value);
    }
}


// this handles painting the canvas element
// does not hold data
class $8bc14a862f808636$export$1456a3a40643b727 {
    constructor({ canvas: canvas, context: context, grid: grid, width: width, height: height }){
        this.canvas = canvas;
        this.context = context;
        this.grid = grid;
        this.width = width;
        this.height = height;
    }
    // drawAtIndex_CM({index, gridUnit, width, height, context, color}) {
    drawAtIndex(index, color = "#aa00ff") {
        let bb = this.grid.getColRowIndexes(index);
        // console.log("pre count", ciiy*gridCount);
        // drawAtIndex_ColRow(bb[0], bb[1], gridUnit, width, height, context, color);
        this.drawAtIndex_ColRow({
            col: bb[0],
            row: bb[1],
            color: color
        });
    }
    // drawAtIndex_ColRow(col, row, gridUnit, width, height, context, color) {
    drawAtIndex_ColRow({ col: col, row: row, color: color }) {
        const width = this.width;
        const height = this.height;
        const gridUnit = this.grid.unit;
        const context = this.context;
        let sizeX = width / gridUnit;
        let sizeY = height / gridUnit;
        let x = width / gridUnit * row % width;
        let y = height / gridUnit * col % height;
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
        let sizeX = width / gridUnit;
        let sizeY = height / gridUnit;
        let gridCount = gridUnit ** 2;
        // we just step the grid instead of nested loops
        let yy = -1;
        let xx = 0;
        for(var rr = 0; rr < gridCount; rr++){
            let xx = width / gridUnit * rr % width;
            if (xx === 0) yy++;
            let y = height / gridUnit * yy % height;
            context.fillStyle = `#${dataIn[rr]}`;
            // we know colorVector was updated
            context.fillRect(xx, y, sizeX, sizeY);
        }
    }
    drawGuides() {
        const ctx = this.context;
        const grid = this.grid;
        ctx.strokeStyle = "#aaaaaa";
        ctx.beginPath(grid.width / 2, 0); // Start a new path
        ctx.moveTo(grid.width / 2, 0); // Move the pen to (30, 50)
        ctx.lineTo(grid.width / 2, grid.height); // Draw a line to (150, 100)
        ctx.lineWidth = 1;
        ctx.stroke(); // Render the path
        ctx.beginPath(0, grid.height / 2); // Start a new path
        ctx.moveTo(0, grid.height / 2); // Move the pen to (30, 50)
        ctx.lineTo(grid.width, grid.height / 2); // Draw a line to (150, 100)
        ctx.lineWidth = 1;
        ctx.stroke(); // Render the path
    }
}


function $609fc5ca7c3ba2f6$var$clamp(val, min, max) {
    return Math.max(min, Math.min(val, max));
}
class $609fc5ca7c3ba2f6$export$c977b3e384af9ae1 {
    x = 0;
    y = 0;
    constructor(x = 0, y = 0){
        this.x = x;
        this.y = y;
    }
    // 
    // copy(vector){
    // 
    // }
    dot(v) {
        return this.x * v.x + this.y * v.y;
    }
    // this was in Vector3
    angleTo(v) {
        const denominator = Math.sqrt(this.lengthSq() * v.lengthSq());
        if (denominator === 0) return Math.PI / 2;
        const theta = this.dot(v) / denominator;
        // clamp, to handle numerical problems
        return Math.acos($609fc5ca7c3ba2f6$var$clamp(theta, -1, 1));
    }
    set(x, y) {
        this.x = x;
        this.y = y;
        return this;
    }
    add(v) {
        this.x += v.x;
        this.y += v.y;
        return this;
    }
    sub(v) {
        this.x -= v.x;
        this.y -= v.y;
        return this;
    }
    copy(v) {
        this.x = v.x;
        this.y = v.y;
        return this;
    }
    multiplyScalar(val) {
        this.x *= val;
        this.y *= val;
        return this;
    }
    rotateAround(center, angle) {
        const c = Math.cos(angle), s = Math.sin(angle);
        const x = this.x - center.x;
        const y = this.y - center.y;
        this.x = x * c - y * s + center.x;
        this.y = x * s + y * c + center.y; // they dont -s here gonna add it in cause thats stupid
        return this;
    }
    addScalar(val) {
        this.x += val;
        this.y += val;
        return this;
    }
    divideScalar(val) {
        this.x /= val;
        this.y /= val;
        return this;
    }
    lerp(v, alpha) {
        this.x += (v.x - this.x) * alpha;
        this.y += (v.y - this.y) * alpha;
        return this;
    }
    lerpVectors(v1, v2, alpha) {
        this.x = v1.x + (v2.x - v1.x) * alpha;
        this.y = v1.y + (v2.y - v1.y) * alpha;
        return this;
    }
    clone() {
        return new $609fc5ca7c3ba2f6$export$c977b3e384af9ae1().copy(this);
    }
    addVectors() {}
    equals(v) {
        return v.x === this.x && v.y === this.y;
    }
    clampLength(min, max) {
        const length = this.length();
        return this.divideScalar(length || 1).multiplyScalar(Math.max(min, Math.min(max, length)));
    }
    divideScalar(scalar) {
        return this.multiplyScalar(1 / scalar);
    }
    negate() {
        this.x = -this.x;
        this.y = -this.y;
        return this;
    }
    multiplyScalar(scalar) {
        this.x *= scalar;
        this.y *= scalar;
        return this;
    }
    lengthSq() {
        return this.x * this.x + this.y * this.y;
    }
    length() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    normalize() {
        return this.divideScalar(this.length() || 1);
    }
}


class $341be3bdb8eb5bc7$export$f5a84b1eb2f20112 {
    // unit shoudl be size really
    constructor({ unit: unit = 4, width: width = 40, height: height = 40, power: power = 2, count: count } = {}){
        this.unit = unit;
        this.width = width;
        this.height = height;
        this.size = new (0, $609fc5ca7c3ba2f6$export$c977b3e384af9ae1)(width / unit, height / unit);
        this.count = count || unit ** power;
    // this.count = count;
    // this.rows = rows;
    // this.columns = columns;
    }
    reflow({ unit: unit, width: width, height: height, power: power, count: count } = {}) {}
    // raise each row col index 1 to handle 0 index
    // for every row we have say gridUnit 8
    // minus the remainder for the total for a row
    // 2 * 8 - (8-7)
    // let atIndex = ( (iiy + 1) * gridUnit ) - (gridUnit - iix);
    // console.log("atIndex", atIndex);
    // col is y, row is x
    // 0 : col, 1: row
    _colRow = [
        -1,
        -1
    ];
    getColRowIndexes(index, gridUnit) {
        let unit = gridUnit || this.unit;
        // debugger
        let col = Math.floor(index / unit);
        // console.log("col", col);
        let row = Math.floor(index - col * unit);
        this._colRow[0] = col;
        this._colRow[1] = row;
        return this._colRow;
    }
    // from a vector2 like a mouse, return the index from the flat array
    getIndexAtMouse(mouse) {
        const gridUnit = this.unit;
        let iix = Math.max(0, Math.floor(mouse.x / this.width * gridUnit));
        let iiy = Math.max(0, Math.floor(mouse.y / this.height * gridUnit));
        // console.log(iix, iiy);
        // raise each row col index 1 to handle 0 index
        // for ever row we have gridUnit 8
        // minus the remainder for the total for a row
        // 2 * 8 - (8-7)
        let atIndex = (iiy + 1) * gridUnit - (gridUnit - iix);
        return atIndex;
    }
    _rect = {
        min: new (0, $609fc5ca7c3ba2f6$export$c977b3e384af9ae1)(),
        max: new (0, $609fc5ca7c3ba2f6$export$c977b3e384af9ae1)(),
        width: 0,
        height: 0,
        position: new (0, $609fc5ca7c3ba2f6$export$c977b3e384af9ae1)(),
        center: new (0, $609fc5ca7c3ba2f6$export$c977b3e384af9ae1)(),
        radius: 0
    };
    // min max and position are in world space
    // center is local
    getRectAtIndex(index) {
        let indexes = this.getColRowIndexes(index);
        // console.log(indexes);
        let rect = this._rect;
        rect.width = this.width / this.unit;
        rect.height = this.height / this.unit;
        rect.min.x = rect.width * indexes[1];
        rect.min.y = rect.height * indexes[0];
        rect.max.x = rect.min.x + rect.width;
        rect.max.y = rect.min.y + rect.height;
        rect.position.x = rect.max.x - rect.width / 2;
        rect.position.y = rect.max.y - rect.height / 2;
        rect.center.x = rect.width / 2;
        rect.center.y = rect.height / 2;
        rect.radius = rect.width / 2;
        // console.log(indexes);
        // console.log(rect);
        // debugger
        return rect;
    }
}




//  From https://www.jeffreythompson.org/collision-detection/license.php
// for book from jeffreythompson
// https://www.jeffreythompson.org/collision-detection/line-rect.php
// 
// LINE/RECTANGLE
// export function lineRect(float x1, float y1, float x2, float y2, float rx, float ry, float rw, float rh) {
function $ad7cde77bb761eee$export$e774a7b266484560(x1, y1, x2, y2, rx, ry, rw, rh) {
    // check if the line has hit any of the rectangle's sides
    // uses the Line/Line function below
    let left = $ad7cde77bb761eee$export$80bc757e3cbd5507(x1, y1, x2, y2, rx, ry, rx, ry + rh);
    let right = $ad7cde77bb761eee$export$80bc757e3cbd5507(x1, y1, x2, y2, rx + rw, ry, rx + rw, ry + rh);
    let top = $ad7cde77bb761eee$export$80bc757e3cbd5507(x1, y1, x2, y2, rx, ry, rx + rw, ry);
    let bottom = $ad7cde77bb761eee$export$80bc757e3cbd5507(x1, y1, x2, y2, rx, ry + rh, rx + rw, ry + rh);
    // if ANY of the above are true, the line
    // has hit the rectangle
    if (left || right || top || bottom) return true;
    return false;
}
function $ad7cde77bb761eee$export$80bc757e3cbd5507(x1, y1, x2, y2, x3, y3, x4, y4) {
    // calculate the direction of the lines
    let uA = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1));
    let uB = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1));
    // if uA and uB are between 0-1, lines are colliding
    if (uA >= 0 && uA <= 1 && uB >= 0 && uB <= 1) // // optionally, draw a circle where the lines meet
    // let intersectionX = x1 + (uA * (x2-x1));
    // let intersectionY = y1 + (uA * (y2-y1));
    // fill(255,0,0);
    // noStroke();
    // ellipse(intersectionX, intersectionY, 20, 20);
    return true;
    return false;
}
function $ad7cde77bb761eee$export$fa8b9feb43cbc643(x1, y1, x2, y2, cx, cy, r) {
    // is either end INSIDE the circle?
    // if so, return true immediately
    const inside1 = $ad7cde77bb761eee$export$71aabd9f55b4bc5f(x1, y1, cx, cy, r);
    const inside2 = $ad7cde77bb761eee$export$71aabd9f55b4bc5f(x2, y2, cx, cy, r);
    if (inside1 || inside2) return true;
    // get length of the line
    let distX = x1 - x2;
    let distY = y1 - y2;
    const len = Math.sqrt(distX * distX + distY * distY);
    // get dot product of the line and circle
    const dot = ((cx - x1) * (x2 - x1) + (cy - y1) * (y2 - y1)) / Math.pow(len, 2);
    // find the closest point on the line
    const closestX = x1 + dot * (x2 - x1);
    const closestY = y1 + dot * (y2 - y1);
    // is this point actually on the line segment?
    // if so keep going, but if not, return false
    const onSegment = $ad7cde77bb761eee$export$57b4425bdc8e0067(x1, y1, x2, y2, closestX, closestY);
    if (!onSegment) return false;
    // // optionally, draw a circle at the closest
    // // point on the line
    // fill(255,0,0);
    // noStroke();
    // ellipse(closestX, closestY, 20, 20);
    // get distance to closest point
    distX = closestX - cx;
    distY = closestY - cy;
    const distance = Math.sqrt(distX * distX + distY * distY);
    if (distance <= r) return true;
    return false;
}
function $ad7cde77bb761eee$var$dist(x1, y1, x2, y2) {
    let distX = x1 - x2;
    let distY = y1 - y2;
    return Math.sqrt(distX * distX + distY * distY);
}
function $ad7cde77bb761eee$export$57b4425bdc8e0067(x1, y1, x2, y2, px, py) {
    // get distance from the point to the two ends of the line
    const d1 = $ad7cde77bb761eee$var$dist(px, py, x1, y1);
    const d2 = $ad7cde77bb761eee$var$dist(px, py, x2, y2);
    // get the length of the line
    const lineLen = $ad7cde77bb761eee$var$dist(x1, y1, x2, y2);
    // since floats are so minutely accurate, add
    // a little buffer zone that will give collision
    const buffer = 0.1; // higher # = less accurate
    // if the two distances are equal to the line's
    // length, the point is on the line!
    // note we use the buffer here to give a range,
    // rather than one #
    if (d1 + d2 >= lineLen - buffer && d1 + d2 <= lineLen + buffer) return true;
    return false;
}
function $ad7cde77bb761eee$export$71aabd9f55b4bc5f(px, py, cx, cy, r) {
    // get distance between the point and circle's center
    // using the Pythagorean Theorem
    let distX = px - cx;
    let distY = py - cy;
    let distance = Math.sqrt(distX * distX + distY * distY);
    // if the distance is less than the circle's
    // radius the point is inside!
    if (distance <= r) return true;
    return false;
}


class $3d9b526b66b21985$export$e2d8573b1adc266f {
    canvasIdName = "";
    grid = null;
    gridCount = 0;
    brushSize = 1;
    resolution = 400;
    gridUnit = 28;
    drawingsDatabase = null;
    drawingData = null;
    canvas = null;
    canvasPainter = null;
    ctx = null;
    IS_DOWN = false;
    clientRect = null;
    currentColor = null;
    currentColorHex = "#0000ff";
    // 0: previous, 1: current
    autoFillMousePositions = [
        new (0, $609fc5ca7c3ba2f6$export$c977b3e384af9ae1)(),
        new (0, $609fc5ca7c3ba2f6$export$c977b3e384af9ae1)()
    ];
    exporter = null;
    drawings = new (0, $8132b21bff19b719$export$b3b683065954d4c7)();
    constructor(params){
        const { brushSize: brushSize, resolution: resolution, gridUnit: gridUnit, canvasIdName: canvasIdName, currentColorHex: currentColorHex = "#0000ff" } = params;
        this.brushSize = brushSize;
        this.resolution = resolution;
        this.gridUnit = gridUnit;
        this.canvasIdName = canvasIdName;
        this.currentColorHex = currentColorHex;
        this.gridCount = gridUnit ** 2;
        // after this gridUnit is not used again, grid.unit should be the bases, but needs refactor
        this.grid = new (0, $341be3bdb8eb5bc7$export$f5a84b1eb2f20112)({
            unit: gridUnit,
            width: resolution,
            height: resolution,
            count: this.gridCount
        }) //.computeRowsColumns(resolution, resolution);
        ;
        this.drawingData = new (0, $8132b21bff19b719$export$b12212111e5a3769)(this.grid.unit);
        this.setupCanvas();
        this.canvasPainter = new (0, $8bc14a862f808636$export$1456a3a40643b727)({
            canvas: this.canvas,
            context: this.ctx,
            grid: this.grid,
            width: this.grid.width,
            height: this.grid.height
        });
        this.exporter = new (0, $06a759a80ee4afa0$export$a46f15a9a9fee68a)();
    }
    drawFill_222(ev) {
        // mouseToCanvas(ev,autoFillMousePositions[0]);
        (0, $60d029dc6af41112$export$7ac26ea692ac2fe0)(ev, this.autoFillMousePositions[1], this.clientRect);
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
        for(var i = 0; i < grid.count; i++){
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
            let isInCircle = (0, $ad7cde77bb761eee$export$fa8b9feb43cbc643)(start.x, start.y, stop.x, stop.y, vv.position.x, vv.position.y, vv.radius * this.brushSize);
            // console.log("isInCircle", isInCircle);
            if (isInCircle) {
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
        this.canvasBuffer = document.createElement("canvas");
        this.canvasBuffer.width = resolution;
        this.canvasBuffer.height = resolution;
        this.ctxBuffer = this.canvasBuffer.getContext("2d");
        // ctx.fillStyle = "#0000ff";
        ctx.fillStyle = (0, $60d029dc6af41112$export$fd6e24a0caf3e4cb)(Math.random(), 1, 1);
        // ctx.fillRect(0,0,390, 20);
        ctx.fillRect(0, 0, resolution, resolution);
        console.log("\xbf");
        let yy = -1;
        let xx = 0;
        for(var rr = 0; rr < grid.count; rr++){
            let xx = grid.width / grid.unit * rr % grid.width;
            // console.log(xx);
            // console.log(width/gridUnit*(rr+1));
            // console.log("=========");
            if (xx === 0) yy++;
            let y = grid.height / grid.unit * yy % grid.height;
            // console.log(rr/gridCount);
            // ctx.fillStyle = HSVtoRGBString(0.2,1,rr/gridCount);
            ctx.fillStyle = (0, $60d029dc6af41112$export$fd6e24a0caf3e4cb)(Math.random(), 1, 1);
            // we know colorVector was updated
            this.drawingData.assignColor(rr, (0, $60d029dc6af41112$export$517d98b40c45ffec)());
            // ctx.fillRect(xx, y, gridUnit, gridUnit);
            ctx.fillRect(xx, y, grid.size.x, grid.size.y);
        }
    }
    // handles drawing and database fixing
    clearScreen_CM(color = "#eeeeee") {
        this.ctx.fillStyle = color;
        this.ctx.fillRect(0, 0, this.resolution, this.resolution);
        this.canvasPainter.drawGuides();
        this.drawingData.clearTable();
    }
    saveToFileAsDataSize() {
        this.exporter.saveToFileAsDataSize(this.grid, this.drawingData);
    }
    saveToFile() {
        this.exporter.saveToFile(this.canvas);
    }
    generateDataImage() {
        this.exporter.generateDataImage(this.grid, this.drawingData, this.drawings);
    }
}


export {$3d9b526b66b21985$export$e2d8573b1adc266f as PainterApp};
//# sourceMappingURL=painterAppModule.1.0.js.map
