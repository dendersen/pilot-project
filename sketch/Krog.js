class Krog {
  constructor(img, x, y) {
    this.img = img;
    this.x = x;
    this.hookedX = x;
    this.y = y;
    this.w = 128;
    this.h = 128;
    this.hooked = [];
  }

  tick() {
    if (mouseX > width - 64) {
      this.x = width - 64;
    } else if (mouseX < 0 + 64) {
      this.x = 0;
    } else {
      this.x = mouseX - 75 / 2;
    }
    this.hookedX = this.x - 32;
  }

  show() {
    push();
    strokeWeight(2);
    line(305, 495 + offset, this.x + 40, hookLevel + 17);
    image(this.img, this.x, this.y, 75, 75);
    pop();
    if (hitboxShow) ellipse(this.hookedX + 64, this.y + 64, 64);
  }

  addHook(obj) {
    obj.hooked = true;
    this.hooked.push(obj);
  }
}
