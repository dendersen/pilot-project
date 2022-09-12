/// <reference path="WaterItems.ts"/>
class Fisk extends WaterItems {
  points: number;
  xVec: number;
  flipImg: p5.Image[];
  constructor(img: p5.Image[], x: number, y: number, id: number) {
    super(x, y, id, img[1]);
    this.flipImg = img;
    this.points = -2;
    this.xVec = 1;
  }

  move() {
    if (this.x >= width - this.w / 2 + 10) {
      this.xVec *= -1;
      this.Flip();
    }
    if (this.x <= 0 - 10) {
      this.xVec *= -1;
      this.Flip();
    }
    this.x += this.xVec;
  }

  private Flip() {
    if (this.xVec > 0) {
      this.img = this.flipImg[1];
    } else {
      this.img = this.flipImg[0];
    }
  }
}
