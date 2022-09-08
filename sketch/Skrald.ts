/// <reference path="WaterItems.ts"/>
class Skrald extends WaterItems {
  points: number;

  constructor(img: p5.Image[], x: number, y: number, id: number) {
    super(img, x, y, id);
    this.points = 1;
  }
}
