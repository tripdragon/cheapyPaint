

//  From https://www.jeffreythompson.org/collision-detection/license.php
// for book from jeffreythompson
// https://www.jeffreythompson.org/collision-detection/line-rect.php
// 

// LINE/RECTANGLE
// export function lineRect(float x1, float y1, float x2, float y2, float rx, float ry, float rw, float rh) {
export function lineIntersectsRect(x1, y1, x2, y2, rx, ry, rw, rh) {

  // check if the line has hit any of the rectangle's sides
  // uses the Line/Line function below
  let left   = lineLine(x1,y1,x2,y2, rx,ry,rx, ry+rh);
  let right  = lineLine(x1,y1,x2,y2, rx+rw,ry, rx+rw,ry+rh);
  let top    = lineLine(x1,y1,x2,y2, rx,ry, rx+rw,ry);
  let bottom = lineLine(x1,y1,x2,y2, rx,ry+rh, rx+rw,ry+rh);

  // if ANY of the above are true, the line
  // has hit the rectangle
  if (left || right || top || bottom) {
    return true;
  }
  return false;
}


// LINE/LINE
export function lineLine(x1, y1, x2, y2, x3, y3, x4, y4) {

  // calculate the direction of the lines
  let uA = ((x4-x3)*(y1-y3) - (y4-y3)*(x1-x3)) / ((y4-y3)*(x2-x1) - (x4-x3)*(y2-y1));
  let uB = ((x2-x1)*(y1-y3) - (y2-y1)*(x1-x3)) / ((y4-y3)*(x2-x1) - (x4-x3)*(y2-y1));

  // if uA and uB are between 0-1, lines are colliding
  if (uA >= 0 && uA <= 1 && uB >= 0 && uB <= 1) {

    // // optionally, draw a circle where the lines meet
    // let intersectionX = x1 + (uA * (x2-x1));
    // let intersectionY = y1 + (uA * (y2-y1));
    // fill(255,0,0);
    // noStroke();
    // ellipse(intersectionX, intersectionY, 20, 20);

    return true;
  }
  return false;
}



/// https://www.jeffreythompson.org/collision-detection/line-circle.php
// LINE/CIRCLE
export function lineCircle(x1, y1, x2, y2, cx, cy, r) {

  // is either end INSIDE the circle?
  // if so, return true immediately
  const inside1 = pointCircle(x1,y1, cx,cy,r);
  const inside2 = pointCircle(x2,y2, cx,cy,r);
  if (inside1 || inside2) return true;

  // get length of the line
  let distX = x1 - x2;
  let distY = y1 - y2;
  const len = Math.sqrt( (distX*distX) + (distY*distY) );

  // get dot product of the line and circle
  const dot = ( ((cx-x1)*(x2-x1)) + ((cy-y1)*(y2-y1)) ) / Math.pow(len,2);

  // find the closest point on the line
  const closestX = x1 + (dot * (x2-x1));
  const closestY = y1 + (dot * (y2-y1));

  // is this point actually on the line segment?
  // if so keep going, but if not, return false
  const onSegment = linePoint(x1,y1,x2,y2, closestX,closestY);
  if (!onSegment) return false;

  // // optionally, draw a circle at the closest
  // // point on the line
  // fill(255,0,0);
  // noStroke();
  // ellipse(closestX, closestY, 20, 20);

  // get distance to closest point
  distX = closestX - cx;
  distY = closestY - cy;
  const distance = Math.sqrt( (distX*distX) + (distY*distY) );

  if (distance <= r) {
    return true;
  }
  return false;
}

function dist(x1, y1, x2, y2){
  let distX = x1 - x2;
  let distY = y1 - y2;
  return Math.sqrt( (distX*distX) + (distY*distY) );
}

// LINE/POINT
export function linePoint(x1, y1, x2, y2, px, py) {

  // get distance from the point to the two ends of the line
  const d1 = dist(px,py, x1,y1);
  const d2 = dist(px,py, x2,y2);

  // get the length of the line
  const lineLen = dist(x1,y1, x2,y2);

  // since floats are so minutely accurate, add
  // a little buffer zone that will give collision
  const buffer = 0.1;    // higher # = less accurate

  // if the two distances are equal to the line's
  // length, the point is on the line!
  // note we use the buffer here to give a range,
  // rather than one #
  if (d1+d2 >= lineLen-buffer && d1+d2 <= lineLen+buffer) {
    return true;
  }
  return false;
}


// POINT/CIRCLE
export function pointCircle(px, py, cx, cy, r) {

  // get distance between the point and circle's center
  // using the Pythagorean Theorem
  let distX = px - cx;
  let distY = py - cy;
  let distance = Math.sqrt( (distX*distX) + (distY*distY) );

  // if the distance is less than the circle's
  // radius the point is inside!
  if (distance <= r) {
    return true;
  }
  return false;
}
