let offset = 0;
let fishermanImg;
let krogImg;
let krog;
let skraldImg = [];
let skrald = [];
let backgroundImg;
let fisk = [];
let fiskImg = [];
const hookLevel = 400;
const skraldAntal = 75;
const fiskAntal = 50;

function preload() {
  skraldImg.push(loadImage("assets/Trash/straw.png"));
  skraldImg.push(loadImage("assets/Trash/tire.png"));
  skraldImg.push(loadImage("assets/Trash/trashbag.png"));
  // skraldImg = loadImage("assets/fisk.png");

  fiskImg.push(loadImage("assets/Fisk/deadfish1.png"));
  fiskImg.push(loadImage("assets/Fisk/deadfish2.png"));

  fishermanImg = loadImage("assets/fisherman.png");
  krogImg = loadImage("assets/Hook.png");
  backgroundImg = loadImage("assets/background.png");
}
function setup() {
  createCanvas(640, 800);

  for (let i = 0; i < skraldAntal; i++) {
    skrald.push(
      new Skrald(
        skraldImg,
        random(width),
        random(800, 10240),
        Math.floor(random(skraldImg.length))
      )
    );
  }
  for (let i = 0; i < fiskAntal; i++) {
    fisk.push(
      new Fisk(
        fiskImg,
        random(width),
        random(800, 10240),
        Math.floor(random(fiskImg.length))
      )
    );
  }

  krog = new Krog(krogImg, 320, hookLevel);
  // noLoop();
}

function draw() {
  background(0);

  offset -= 2;
  image(backgroundImg, 0, 0 + offset);

  image(fishermanImg, 290, 450 + offset);

  for (let i = 0; i < skrald.length; i++) {
    skrald[i].tick();
    skrald[i].show();
  }
  krog.show();

  fisk.forEach((item) => {
    item.tick();
    item.show();
  });

  strokeWeight(2);
  line(305, 495 + offset, mouseX + 5, hookLevel + 17);
}

function mousePressed() {
  print(mouseX, mouseY);
}
