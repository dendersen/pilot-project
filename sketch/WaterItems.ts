class WaterItems {
  img: p5.Image[];
  x: number;
  spawnY: number;
  y: number;
  id: number;
  hooked: boolean;
  w: number;
  h: number;
  points: number;
  constructor(img: p5.Image[], x: number, y: number, id: number) {
    this.img = img;
    this.x = x;
    this.spawnY = y;
    this.y = y;
    this.id = id;
    this.hooked = false;
    this.w = 128;
    this.h = 128;
  }

  tick() {
    if (this.hooked) {
      this.x = krog.hookedX;
      this.y = krog.y;
    } else this.y = offset + this.spawnY;
  }

  show() {
    image(this.img[this.id], this.x, this.y, this.w, this.h);
    if (hitboxShow) ellipse(this.x + 64, this.y + 64, 64);
  }

  collect(obj: Krog) {
    if (dist(this.x, this.y, obj.hookedX, obj.y) < 64) return true;
    return false;
  }
}
