/// <reference path="WaterItems.ts"/>
class Skrald extends WaterItems {
  points: number;

  constructor(img: p5.Image, x: number, y: number, id: number) {
    super(x, y, id, img);
    this.points = 1;
  }
}
