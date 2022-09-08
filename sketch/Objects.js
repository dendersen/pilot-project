class Objects {
  constructor(img, x, y, id) {
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

  collect(obj) {
    if (dist(this.x, this.y, obj.hookedX, obj.y) < 64) return true;
    return false;
  }
}
