let capture;


function setup(){
 createCanvas(400,400);
 capture = createCapture(VIDEO);
 capture.size(width,height);
 capture.hide();

}

function draw(){
  image(capture,0,0);
  // capture.loadPixels();
  // background(220);
}
