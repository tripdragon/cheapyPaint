

export function lerp( x, y, t ) {
  return ( 1 - t ) * x + t * y;
}




const colorVector = {r:0,g:0,b:0};


export function HSVtoRGB(h, s, v, vector) {
  // if using 256 color space
  // HSVtoRGB(i/256,1,1, colorVector);
  // ctx.fillStyle = `rgb(${colorVector.r},${colorVector.g},${colorVector.b})`;

  var r, g, b, i, f, p, q, t;
  if (arguments.length === 1) {
      s = h.s, v = h.v, h = h.h;
  }
  i = Math.floor(h * 6);
  f = h * 6 - i;
  p = v * (1 - s);
  q = v * (1 - f * s);
  t = v * (1 - (1 - f) * s);
  switch (i % 6) {
      case 0: r = v, g = t, b = p; break;
      case 1: r = q, g = v, b = p; break;
      case 2: r = p, g = v, b = t; break;
      case 3: r = p, g = q, b = v; break;
      case 4: r = t, g = p, b = v; break;
      case 5: r = v, g = p, b = q; break;
  }
  vector.r = Math.round(r * 255);
  vector.g = Math.round(g * 255);
  vector.b = Math.round(b * 255);
  
}


export function HSVtoRGBString(h,s,v){
  // returns 255 space vector string
  
  HSVtoRGB(h,s,v,colorVector);
  return `rgb(${colorVector.r},${colorVector.g},${colorVector.b})`;
}



// function getColorAtMouse(context, mouse) {
// 
//   var rect = context.canvas.getBoundingClientRect();
//   var p = context.getImageData(mouse.x - rect.x, mouse.y - rect.y, 1, 1).data; 
//   var hex = ("000000" + rgbToHex(p[0], p[1], p[2])).slice(-6);
//   // $('#status').html(coord + "<br>" + hex);
//   // console.log("hex", hex);
//   return hex;
// }

// its in 255 space
// a = ("000000" + rgbToHex(100,255,2)).slice(-6);

export function rgbToHex(r, g, b) {
    if (r > 255 || g > 255 || b > 255)
        throw "Invalid color component";
    return ((r << 16) | (g << 8) | b).toString(16);
}

// ???
export function hexFromRGBCache(){
  return ("000000" + rgbToHex(colorVector.r,colorVector.g,colorVector.b)).slice(-6);
}


export function mouseToCanvas(ev,vectorIn,clientRect) {
  vectorIn.x=ev.clientX-clientRect.left;
  vectorIn.y=ev.clientY-clientRect.top;
}


export function randomHexString(size = 6){
  let result = [];
  let hexRef = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];

  for (let n = 0; n < size; n++) {
    result.push(hexRef[Math.floor(Math.random() * 16)]);
  }
  return "#"+result.join('');
}
