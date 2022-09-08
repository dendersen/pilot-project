let offset: number = -250;
let fishermanImg: p5.Image;
let krogImg: p5.Image;
let krog: Krog;
let skraldImg: p5.Image[] = [];
let skrald: Skrald[] = [];
let backgroundImg: p5.Image;
let fisk: Fisk[] = [];
let fiskImg: p5.Image[] = [];
const hookLevel: number = 400;
const skraldAntal: number = 75;
const fiskAntal: number = 50;

let hitboxShow: boolean = false;

function preload() {
  skraldImg.push(loadImage("sketch/assets/Trash/oil barrel.png"));
  skraldImg.push(loadImage("sketch/assets/Trash/tire.png"));
  skraldImg.push(loadImage("sketch/assets/Trash/trashbag.png"));

  fiskImg.push(loadImage("sketch/assets/Fisk/Deadfish/dead fish1.png"));
  fiskImg.push(loadImage("sketch/assets/Fisk/Deadfish/dead fish2.png"));
  fiskImg.push(loadImage("sketch/assets/Fisk/Deadfish/dead fish3.png"));
  fiskImg.push(loadImage("sketch/assets/Fisk/Deadfish/dead fish4.png"));
  fiskImg.push(loadImage("sketch/assets/Fisk/Deadfish/dead turtle.png"));

  fiskImg.push(loadImage("sketch/assets/Fisk/Livefish/fish1 animation.gif"));
  fiskImg.push(loadImage("sketch/assets/Fisk/Livefish/fish2 animation.gif"));
  fiskImg.push(loadImage("sketch/assets/Fisk/Livefish/fish3 animation.gif"));
  fiskImg.push(loadImage("sketch/assets/Fisk/Livefish/turtle animation.gif"));

  fishermanImg = loadImage("sketch/assets/fisherman.png");
  krogImg = loadImage("sketch/assets/Hook.gif");
  backgroundImg = loadImage("sketch/assets/background.png");
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
  textSize(30);
  let txt = countPoints();
  text(txt, 300 - textWidth(`${txt}`) / 2, 426 + offset);
  pop();
}

function mousePressed() {
  console.log("NON-offset", mouseX, mouseY);
  console.log("offset", mouseX, mouseY - offset);
}

function checkHook() {
  if (offset > -250) {
    // console.log(countPoints());
    return;
  }
  if (krog.hooked.length > 0) {
    offset += 5;
  } else {
    offset -= 2;
  }
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

function countPoints(): number {
  let sum: number = 0;
  krog.hooked.forEach((item) => {
    sum += item.points;
  });
  return sum;
}
