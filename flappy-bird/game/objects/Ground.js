class Ground {
  constructor(img, canvasHeight, startX) {
    this.img = img;
    this.height = canvasHeight * 0.1;
    this.y = canvasHeight - this.height;
    this.x = startX;

    this.negativeHalfImgWidth = -this.img.width / 2;
  }

  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.img.width, this.height);
  }

  update(speed) {
    this.x -= speed;

    if (this.x <= this.negativeHalfImgWidth) {
      this.x = 0;
    }
  }
}

export default Ground;
