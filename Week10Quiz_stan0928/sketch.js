let song;
let fft;

function preload() {
  // Fill in the url for audio asset
  song = loadSound('sample-visualisation.mp3');
}

function setup() {
  createCanvas(600, 600);
  // Create a new FFT analysis object
  fft = new p5.FFT();  
  // Add the song (sample) into the FFT's input
  song.amp(0.2);  
}

function draw() {
  background(0);  

  // Creating a grid background with lines
  stroke(50);  
  strokeWeight(1);  
  for (let i = 20; i < width; i += 20) {
    line(i, 0, i, height);  
    line(0, i, width, i);  
  }

  // Drawing multiple concentric circles with a gradient
  noFill();  
  strokeWeight(10);  
  for (let i = 0; i < 10; i++) {
    let radius = 150 - i * 10;
    let alpha = 255 - i * 25;  
    stroke(0, 255 - i * 25, 255, alpha);  
    ellipse(width / 2, height / 2, radius, radius);  
  }

  // Request fresh data from the FFT analysis
  let spectrum = fft.analyze();  
  noStroke();  
  fill(0, 255, 255);  

  // Draw the spectrum analysis as rectangles
  for (let i = 0; i< spectrum.length; i++){
    let angle = map(i, 0, spectrum.length, 0, 360);
    let amp = spectrum[i];
    let r = map(amp, 0, 256, 100, 250);  
    let x = width / 2 + r * cos(angle);
    let y = height / 2 + r * sin(angle);
    rectMode(CENTER);  
    rect(x, y, 10, 10);  
  }

  // Give the user a hint on how to interact with the sketch
  fill(0, 255, 255);
  textSize(20);
  textAlign(CENTER, CENTER);
  text('Click to play or pause music', width / 2, height - 30);
}

// Toggle playback on or off with a mouse click
function mouseClicked() {
  if (song.isPlaying()) {
    song.pause();  
  } else {
    song.loop();  
  }
}
