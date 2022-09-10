declare function loadSound(path: string): p5.SoundFile;

let offset: number = -250;
let fishermanImg: p5.Image;
let krogImg: p5.Image;
let hook: Krog;
let skraldImg: p5.Image[] = [];
let skrald: Skrald[] = [];
let backgroundImg: p5.Image;
let fisk: Fisk[] = [];
let fiskImg: Array<p5.Image>[] = [];
let deadFiskImg: p5.Image[] = [];
let deadFisk: DeadFisk[] = [];
let startImg: p5.Image[] = [];
//TODO fix frame
let maxFrame1: number = 59;
let maxFrame2: number = 60;
let maxFrame3: number = 60;
let currentFrame: number = 0;

let mySound: p5.SoundFile;
const hookLevel: number = 400;
const skraldAntal: number = 75;
const fiskAntal: number = 50;
const deadAntal: number = 50;
const hitboxShow: boolean = true;
enum playStateList {
  menu = 0,
  play = 1,
  startLoading = 2,
  gameLoading = 3,
  revsegameLoading = 4,
}
let playState: playStateList = playStateList.startLoading;
let knap: Knap;
function preload() {
  mySound = loadSound("sketch/assets/Music/bagground.mp3");

  startImg.push(loadImage("sketch/assets/Start/start1.png"));
  startImg.push(loadImage("sketch/assets/Start/start2.png"));
  startImg.push(loadImage("sketch/assets/Start/start0.gif"));
  startImg.push(loadImage("sketch/assets/Start/start3.gif"));
  startImg.push(loadImage("sketch/assets/Start/start4.gif"));

  skraldImg.push(loadImage("sketch/assets/Trash/oil barrel.png"));
  skraldImg.push(loadImage("sketch/assets/Trash/tire.png"));
  skraldImg.push(loadImage("sketch/assets/Trash/trashbag.png"));
  skraldImg.push(loadImage("sketch/assets/Trash/straw.png"));
  skraldImg.push(loadImage("sketch/assets/Trash/plastich bag.png"));

  deadFiskImg.push(loadImage("sketch/assets/Fisk/Deadfish/dead fish1.png"));
  deadFiskImg.push(loadImage("sketch/assets/Fisk/Deadfish/dead fish2.png"));
  deadFiskImg.push(loadImage("sketch/assets/Fisk/Deadfish/dead fish3.png"));
  deadFiskImg.push(loadImage("sketch/assets/Fisk/Deadfish/dead fish4.png"));
  deadFiskImg.push(loadImage("sketch/assets/Fisk/Deadfish/dead turtle.png"));

  let fisk1: p5.Image[] = [];
  fisk1.push(loadImage("sketch/assets/Fisk/Livefish/fish1 animation.gif"));
  fisk1.push(loadImage("sketch/assets/Fisk/Livefish/fish1 animationflip.gif"));
  fiskImg.push(fisk1);

  let fisk2: p5.Image[] = [];
  fisk2.push(loadImage("sketch/assets/Fisk/Livefish/fish2 animation.gif"));
  fisk2.push(loadImage("sketch/assets/Fisk/Livefish/fish2 animationflip.gif"));
  fiskImg.push(fisk2);

  let fisk3: p5.Image[] = [];
  fisk3.push(loadImage("sketch/assets/Fisk/Livefish/fish3 animation.gif"));
  fisk3.push(loadImage("sketch/assets/Fisk/Livefish/fish3 animationflip.gif"));
  fiskImg.push(fisk3);

  let turtle: p5.Image[] = [];
  turtle.push(loadImage("sketch/assets/Fisk/Livefish/turtle animation.gif"));
  turtle.push(
    loadImage("sketch/assets/Fisk/Livefish/turtle animationflip.gif")
  );
  fiskImg.push(turtle);

  fishermanImg = loadImage("sketch/assets/fisherman.png");
  krogImg = loadImage("sketch/assets/Hook.gif");
  backgroundImg = loadImage("sketch/assets/background.png");
}
function setup() {
  createCanvas(640, 800);
  setupTrash();
  knap = new Knap(243, 294, 176, 84);
  hook = new Krog(krogImg, 640 / 2, hookLevel);
  // noLoop();
}

function draw() {
  if (playState === playStateList.startLoading) {
    image(startImg[playState], 0, 0);
    if (currentFrame === maxFrame1 - 1) {
      playState = playStateList.menu;
      currentFrame = 0;
      return;
    }
    currentFrame++;
    return;
  }

  if (playState === playStateList.menu) {
    background(220);
    image(startImg[knap.bagground()], 0, 0);
    knap.hover();
    return;
  }

  if (playState === playStateList.gameLoading) {
    image(startImg[playState], 0, 0);
    if (currentFrame === maxFrame2) {
      playState = playStateList.play;
      currentFrame = 0;

      return;
    }
    currentFrame++;
    return;
  }

  if (playState === playStateList.revsegameLoading) {
    image(startImg[playState], 0, 0);
    if (currentFrame === maxFrame3) {
      playState = playStateList.menu;
      currentFrame = 0;

      return;
    }
    currentFrame++;
    return;
  }

  checkHook();
  image(backgroundImg, 0, 0 + offset);

  image(fishermanImg, 290, 450 + offset);

  for (let i = 0; i < skrald.length; i++) {
    skrald[i].tick();
    skrald[i].show();
    if (skrald[i].collect(hook)) {
      hook.addHook(skrald[i]);
      skrald.splice(i, 1);
    }
  }
  for (let i = 0; i < fisk.length; i++) {
    fisk[i].tick();
    fisk[i].move();
    fisk[i].show();
    if (fisk[i].collect(hook)) {
      hook.addHook(fisk[i]);
      fisk.splice(i, 1);
    }
  }
  for (let i = 0; i < deadFisk.length; i++) {
    deadFisk[i].tick();
    deadFisk[i].show();
    if (deadFisk[i].collect(hook)) {
      hook.addHook(deadFisk[i]);
      deadFisk.splice(i, 1);
    }
  }
  hook.tick();
  hook.show();

  for (let i = 0; i < hook.hooked.length; i++) {
    hook.hooked[i].tick();
    hook.hooked[i].show();
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
}

function mousePressed() {
  knap.clicked();

  //TODO remove

  console.log("NON-offset", mouseX, mouseY);
  console.log("offset", mouseX, mouseY - offset);
}

function keyPressed() {
  if (playState === playStateList.play)
    if (keyCode === 32) {
      skrald = [];
      deadFisk = [];
      fisk = [];
      setupTrash();
      hook.clearHook();
      offset = -250;
      playState = playStateList.revsegameLoading;
    }
}

function checkHook() {
  if (offset > -250) {
    mySound.stop();
    return;
  }
  if (offset < -9600) hook.up = true;
  if (hook.hooked.length > 0) hook.up = true;
  hook.up ? (offset += 5) : (offset -= 3);
}

function setupTrash() {
  for (let i = 0; i < skraldAntal; i++) {
    let ran = Math.floor(random(skraldImg.length));

    skrald.push(
      new Skrald(skraldImg[ran], random(width - 64), random(799, 10240), ran)
    );
  }
  for (let i = 0; i < fiskAntal; i++) {
    let ran = Math.floor(random(fiskImg.length));
    fisk.push(
      new Fisk(fiskImg[ran], random(width - 64), random(799, 10240), ran)
    );
  }
  for (let i = 0; i < deadAntal; i++) {
    let ran = Math.floor(random(deadFiskImg.length));
    deadFisk.push(
      new DeadFisk(
        deadFiskImg[ran],
        random(width - 64),
        random(799, 10240),
        ran
      )
    );
  }
}

function countPoints(): number {
  let sum: number = 0;
  hook.hooked.forEach((item) => {
    sum += item.points;
  });
  return sum;
}
