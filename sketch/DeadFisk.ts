/// <reference path="WaterItems.ts"/>

class DeadFisk extends WaterItems {
  constructor(img: p5.Image, x: number, y: number, id: number) {
    super(x, y, id, img);
    this.points = -1;
  }
}
