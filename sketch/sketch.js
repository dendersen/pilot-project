let offset = -250;
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

let hitboxShow = false;

function preload() {
  skraldImg.push(loadImage("assets/Trash/straw.png"));
  skraldImg.push(loadImage("assets/Trash/tire.png"));
  skraldImg.push(loadImage("assets/Trash/trashbag.png"));
  // skraldImg = loadImage("assets/fisk.png");

  fiskImg.push(loadImage("assets/Fisk/Deadfish/dead fish1.png"));
  fiskImg.push(loadImage("assets/Fisk/Deadfish/dead fish2.png"));
  fiskImg.push(loadImage("assets/Fisk/Deadfish/dead fish3.png"));
  fiskImg.push(loadImage("assets/Fisk/Deadfish/dead fish4.png"));
  fiskImg.push(loadImage("assets/Fisk/Deadfish/dead turtle.png"));

  fiskImg.push(loadImage("assets/Fisk/Livefish/fish1 animation.gif"));
  fiskImg.push(loadImage("assets/Fisk/Livefish/fish2 animation.gif"));
  fiskImg.push(loadImage("assets/Fisk/Livefish/fish3 animation.gif"));
  fiskImg.push(loadImage("assets/Fisk/Livefish/turtle animation.gif"));

  fishermanImg = loadImage("assets/fisherman.png");
  krogImg = loadImage("assets/Hook.gif");
  backgroundImg = loadImage("assets/background.png");
}
function setup() {
  createCanvas(640, 800);
  setupTrash();
  krog = new Krog(krogImg, 640 / 2, hookLevel);
  // noLoop();
}

function draw() {
  background(0);
  checkHook();
  image(backgroundImg, 0, 0 + offset);

  image(fishermanImg, 290, 450 + offset);

  for (let i = 0; i < skrald.length; i++) {
    skrald[i].tick();
    skrald[i].show();
    if (skrald[i].collect(krog)) {
      krog.addHook(skrald[i]);
      skrald.splice(i, 1);
    }
  }
  for (let i = 0; i < fisk.length; i++) {
    fisk[i].tick();
    fisk[i].show();
    if (fisk[i].collect(krog)) {
      krog.addHook(fisk[i]);
      fisk.splice(i, 1);
    }
  }

  krog.tick();
  krog.show();

  for (let i = 0; i < krog.hooked.length; i++) {
    krog.hooked[i].tick();
    krog.hooked[i].show();
  }

  push();
  textSize(75);
  let txt = countPoints();
  rect(
    300 - textWidth(`${txt}`) / 2 - 10,
    360 + offset,
    textWidth(`${txt}`) + 20,
    75
  );
  text(txt, 300 - textWidth(`${txt}`) / 2, 426 + offset);
  pop();
  console.log(skrald.length);
}

function mousePressed() {
  console.log(mouseX, mouseY);
}

function checkHook() {
  if (offset > -250) return;
  if (krog.hooked.length > 0) {
    offset += 5;
  } else {
    offset -= 2;
  }
}

function countPoints() {
  let sum = 0;
  for (let i = 0; i < krog.hooked.length; i++) {
    sum += krog.hooked[i].points;
  }
  return sum;
}

function setupTrash() {
  for (let i = -1; i < skraldAntal; i++) {
    skrald.push(
      new Skrald(
        skraldImg,
        random(width - 64),
        random(799, 10240),
        Math.floor(random(skraldImg.length))
      )
    );
  }
  for (let i = -1; i < fiskAntal; i++) {
    fisk.push(
      new Fisk(
        fiskImg,
        random(width - 64),
        random(799, 10240),
        Math.floor(random(fiskImg.length))
      )
    );
  }
}
