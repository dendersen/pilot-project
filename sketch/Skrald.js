class Skrald {
  constructor(img, x, y, id) {
    this.img = img;
    this.x = x;
    this.spawnY = y;
    this.y = y;
    this.h = 128;
    this.w = 128;
    this.id = id;
  }

  tick() {
    this.y = offset + this.spawnY;
  }

  show() {
    image(this.img[this.id], this.x, this.y, this.w, this.h);
  }
}

class Fisk {
  constructor(img, x, y, id) {
    this.img = img;
    this.x = x;
    this.y = y;
    this.spawnY = y;
    this.w = 128;
    this.h = 128;
    this.id = id;
  }

  tick() {
    // this.y++;
    this.y = offset + this.spawnY;
  }

  show() {
    image(this.img[this.id], this.x, this.y);
  }
}
