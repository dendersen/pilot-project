class Knap {
  x: number;
  y: number;
  w: number;
  h: number;
  img: p5.Image[];
  imgIndex: number;

  constructor(x: number, y: number, w: number, h: number, img?: p5.Image[]) {
    this.img = img;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.imgIndex = 0;
  }

  hover() {
    if (mouseX > this.x && mouseX < this.x + this.w) {
      if (mouseY > this.y && mouseY < this.y + this.h) {
        this.imgIndex = 1;
      } else {
        this.imgIndex = 0;
      }
    } else {
      this.imgIndex = 0;
    }
  }

  //TODO make switch to animation
  clicked() {
    if (mouseX > this.x && mouseX < this.x + this.w) {
      if (mouseY > this.y && mouseY < this.y + this.h) {
        playState = playStateList.gameLoading;
        mySound.play();
      }
    }
  }

  bagground() {
    return this.imgIndex;
  }
}
