/// <reference path="WaterItems.ts"/>
class Fisk extends WaterItems {
  points: number;
  constructor(img: p5.Image[], x: number, y: number, id: number) {
    super(img, x, y, id);
    this.points = -1;
  }
}
