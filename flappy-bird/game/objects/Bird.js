class Bird {
  // radians
  angle = 0;
  #maxUpAngle = (-35 * Math.PI) / 180;
  #maxDownAngle = (20 * Math.PI) / 180;
  #angleSpeed;

  #flapPower;

  isFalling = true;
  #velocity = 0;

  constructor(image, canvasHeight, groundHeight) {
    this.image = image;

    this.width = canvasHeight * 0.07;
    this.height = (this.image.height / this.image.width) * this.width;
    this.halfWidth = this.width / 2;
    this.halfHeight = this.height / 2;

    this.x = canvasHeight * 0.1 + this.halfWidth;
    this.y = canvasHeight - groundHeight - this.halfHeight - canvasHeight * 0.3;
    this.y += this.halfHeight;

    this.hitboxWidth = this.width * 0.8;
    this.hitboxHeight = this.height * 0.8;
    this.hitboxHalfWidth = this.hitboxWidth / 2;
    this.hitboxHalfHeight = this.hitboxHeight / 2;

    this.hitboxX = this.x - this.hitboxWidth / 2;
    this.hitboxY = this.y - this.hitboxHeight / 2;

    this.#flapPower = canvasHeight * 0.005;
    this.#angleSpeed = canvasHeight * 0.00004;
  }

  draw(ctx) {
    ctx.save();

    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);

    ctx.drawImage(
      this.image,
      -this.halfWidth,
      -this.halfHeight,
      this.width,
      this.height
    );

    ctx.restore();
  }

  update(gravity) {
    this.#velocity += gravity;
    this.y += this.#velocity;

    if (this.isFalling) {
      if (this.angle < this.#maxDownAngle) {
        this.angle += this.#angleSpeed;
      } else {
        this.angle = this.#maxDownAngle;
      }

      return;
    }

    if (this.angle > this.#maxUpAngle) {
      this.angle -= this.#angleSpeed * 3;
    } else {
      this.angle = this.#maxUpAngle;
      this.isFalling = true;
    }
  }

  flap() {
    this.isFalling = false;
    this.#velocity = -this.#flapPower;
  }

  get flapPower() {
    return this.#flapPower;
  }
}

export default Bird;
