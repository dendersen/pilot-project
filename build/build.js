var WaterItems = (function () {
    function WaterItems(img, x, y, id) {
        this.img = img;
        this.x = x;
        this.spawnY = y;
        this.y = y;
        this.id = id;
        this.hooked = false;
        this.w = 128;
        this.h = 128;
    }
    WaterItems.prototype.tick = function () {
        if (this.hooked) {
            this.x = krog.hookedX;
            this.y = krog.y;
        }
        else
            this.y = offset + this.spawnY;
    };
    WaterItems.prototype.show = function () {
        image(this.img[this.id], this.x, this.y, this.w, this.h);
        if (hitboxShow)
            ellipse(this.x + 64, this.y + 64, 64);
    };
    WaterItems.prototype.collect = function (obj) {
        if (dist(this.x, this.y, obj.hookedX, obj.y) < 64)
            return true;
        return false;
    };
    return WaterItems;
}());
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Fisk = (function (_super) {
    __extends(Fisk, _super);
    function Fisk(img, x, y, id) {
        var _this = _super.call(this, img, x, y, id) || this;
        _this.points = -1;
        return _this;
    }
    return Fisk;
}(WaterItems));
var Krog = (function () {
    function Krog(img, x, y) {
        this.hooked = [];
        this.img = img;
        this.x = x;
        this.hookedX = x;
        this.y = y;
        this.w = 128;
        this.h = 128;
    }
    Krog.prototype.tick = function () {
        if (mouseX > width - 64) {
            this.x = width - 64;
        }
        else if (mouseX < 0 + 64) {
            this.x = 0;
        }
        else {
            this.x = mouseX - 75 / 2;
        }
        this.hookedX = this.x - 32;
    };
    Krog.prototype.show = function () {
        push();
        strokeWeight(2);
        line(305, 495 + offset, this.x + 40, hookLevel + 17);
        image(this.img, this.x, this.y, 75, 75);
        pop();
        if (hitboxShow)
            ellipse(this.hookedX + 64, this.y + 64, 64);
    };
    Krog.prototype.addHook = function (obj) {
        obj.hooked = true;
        this.hooked.push(obj);
    };
    return Krog;
}());
var Skrald = (function (_super) {
    __extends(Skrald, _super);
    function Skrald(img, x, y, id) {
        var _this = _super.call(this, img, x, y, id) || this;
        _this.points = 1;
        return _this;
    }
    return Skrald;
}(WaterItems));
var offset = -250;
var fishermanImg;
var krogImg;
var krog;
var skraldImg = [];
var skrald = [];
var backgroundImg;
var fisk = [];
var fiskImg = [];
var hookLevel = 400;
var skraldAntal = 75;
var fiskAntal = 50;
var hitboxShow = false;
function preload() {
    skraldImg.push(loadImage("sketch/assets/Trash/oil barrel.png"));
    skraldImg.push(loadImage("sketch/assets/Trash/tire.png"));
    skraldImg.push(loadImage("sketch/assets/Trash/trashbag.png"));
    fiskImg.push(loadImage("sketch/assets/Fisk/Deadfish/dead fish1.png"));
    fiskImg.push(loadImage("sketch/assets/Fisk/Deadfish/dead fish2.png"));
    fiskImg.push(loadImage("sketch/assets/Fisk/Deadfish/dead fish3.png"));
    fiskImg.push(loadImage("sketch/assets/Fisk/Deadfish/dead fish4.png"));
    fiskImg.push(loadImage("sketch/assets/Fisk/Deadfish/dead turtle.png"));
    fiskImg.push(loadImage("sketch/assets/Fisk/Livefish/fish1 animation.gif"));
    fiskImg.push(loadImage("sketch/assets/Fisk/Livefish/fish2 animation.gif"));
    fiskImg.push(loadImage("sketch/assets/Fisk/Livefish/fish3 animation.gif"));
    fiskImg.push(loadImage("sketch/assets/Fisk/Livefish/turtle animation.gif"));
    fishermanImg = loadImage("sketch/assets/fisherman.png");
    krogImg = loadImage("sketch/assets/Hook.gif");
    backgroundImg = loadImage("sketch/assets/background.png");
}
function setup() {
    createCanvas(640, 800);
    setupTrash();
    krog = new Krog(krogImg, 640 / 2, hookLevel);
}
function draw() {
    background(0);
    checkHook();
    image(backgroundImg, 0, 0 + offset);
    image(fishermanImg, 290, 450 + offset);
    for (var i = 0; i < skrald.length; i++) {
        skrald[i].tick();
        skrald[i].show();
        if (skrald[i].collect(krog)) {
            krog.addHook(skrald[i]);
            skrald.splice(i, 1);
        }
    }
    for (var i = 0; i < fisk.length; i++) {
        fisk[i].tick();
        fisk[i].show();
        if (fisk[i].collect(krog)) {
            krog.addHook(fisk[i]);
            fisk.splice(i, 1);
        }
    }
    krog.tick();
    krog.show();
    for (var i = 0; i < krog.hooked.length; i++) {
        krog.hooked[i].tick();
        krog.hooked[i].show();
    }
    push();
    textSize(30);
    var txt = countPoints();
    text(txt, 300 - textWidth("" + txt) / 2, 426 + offset);
    pop();
}
function mousePressed() {
    console.log("NON-offset", mouseX, mouseY);
    console.log("offset", mouseX, mouseY - offset);
}
function checkHook() {
    if (offset > -250) {
        return;
    }
    if (krog.hooked.length > 0) {
        offset += 5;
    }
    else {
        offset -= 2;
    }
}
function setupTrash() {
    for (var i = -1; i < skraldAntal; i++) {
        skrald.push(new Skrald(skraldImg, random(width - 64), random(799, 10240), Math.floor(random(skraldImg.length))));
    }
    for (var i = -1; i < fiskAntal; i++) {
        fisk.push(new Fisk(fiskImg, random(width - 64), random(799, 10240), Math.floor(random(fiskImg.length))));
    }
}
function countPoints() {
    var sum = 0;
    krog.hooked.forEach(function (item) {
        sum += item.points;
    });
    return sum;
}
//# sourceMappingURL=build.js.map