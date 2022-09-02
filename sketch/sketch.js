let offset = 0;
let fishermanImg;
let krogImg;
let skraldImg;
let skrald = [];
let backgroundImg;
const skraldAntal = 50;

function preload() {
  fishermanImg = loadImage("assets/fisherman.png");
  krogImg = loadImage("assets/krog.png");
  skraldImg = loadImage("assets/fisk.png");
  backgroundImg = loadImage("assets/background.png");
}
function setup() {
  createCanvas(320, 400);
  backgroundImg.resize(320, 10240);

  for (let i = 0; i < skraldAntal; i++) {
    skrald.push(new Skrald(skraldImg, random(width), random(400, 1000)));
  }
}

function draw() {
  offset--;
  image(backgroundImg, 0, 0);

  image(fishermanImg, 0, 200 + offset, 200, 200);

  for (let i = 0; i < skrald.length; i++) {
    skrald[i].tick();
    skrald[i].show();
  }
}
