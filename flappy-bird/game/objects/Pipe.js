class Pipe {
  width = 0;
  height = 0;
  renderedHeight = 0;
  y = 0;
  x = 0;

  constructor(img, isTop, width) {
    this.img = img;
    this.isTop = isTop;
    this.width = width;
  }

  draw(ctx, x) {
    this.x = x;
    ctx.drawImage(this.img, this.x, this.y, this.width, this.renderedHeight);
  }

  checkCollision(bird) {
    const birdTop = bird.y - bird.hitboxHalfHeight;
    const birdBottom = bird.y + bird.hitboxHalfHeight;
    const birdLeft = bird.x - bird.hitboxHalfWidth;
    const birdRight = bird.x + bird.hitboxHalfWidth;

    const isFaced = birdRight >= this.x && birdLeft <= this.x + this.width;
    let isVerticalConfronted;

    if (this.isTop) {
      isVerticalConfronted = birdTop <= this.y + this.renderedHeight;
    } else {
      isVerticalConfronted = birdBottom >= this.y;
    }

    return isFaced && isVerticalConfronted;
  }
}

export default Pipe;
