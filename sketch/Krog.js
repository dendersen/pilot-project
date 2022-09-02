class Krog {
  constructor(img, x, y) {
    this.img = img;
    this.x = x;
    this.y = y;
    this.w = 128;
    this.h = 128;
  }
  show() {
    image(this.img, mouseX - 75 / 2, this.y, 75, 75);
  }
}
