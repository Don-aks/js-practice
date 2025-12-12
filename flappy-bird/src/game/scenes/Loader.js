import {
  LOADER_FRAMES_DELAY_TO_SHOW,
  COLOR_LOADER_BG,
  GRAVITY,
} from '../constants/constants';
import PipePair from '../objects/PipePair';
import Bird from '../objects/Bird';

class Loader {
  isHidden = false;

  #canvas;
  #ctx;
  #halfCanvasHeight;

  #bird;
  #birdPower;

  #pipePair;
  #pipePairStartX;
  #pipePairEndX;
  #isPipePairGoesRight = true;

  #images = {};

  #framesDelayToShow = LOADER_FRAMES_DELAY_TO_SHOW;
  #frames = 0;

  constructor(canvas, images) {
    this.#canvas = canvas;
    this.#halfCanvasHeight = canvas.height / 2;
    this.#images = images;
    this.#ctx = canvas.getContext('2d');
    this.speed = this.#canvas.width * 0.006;
  }

  start() {
    this.#bird = new Bird(this.#images.bird, this.#canvas.height, 0);
    this.#bird.x = this.#canvas.width * 0.3;
    this.#bird.y = this.#halfCanvasHeight;
    this.#birdPower = this.#bird.flapPower;

    this.#pipePair = new PipePair(
      this.#images,
      this.#canvas.width,
      this.#canvas.height,
      0,
      null,
      false
    );
    this.#pipePair.x = this.#canvas.width / 2;
    this.#pipePairStartX = this.#pipePair.x;
    this.#pipePairEndX = this.#canvas.width - this.#pipePair.width;

    const pipeHeight = this.#halfCanvasHeight - this.#pipePair.gap;
    this.#pipePair.top.height = pipeHeight;
    this.#pipePair.bottom.height = pipeHeight;

    const topImgHeight = this.#pipePair.top.img.height;
    const bottomImgHeight = this.#pipePair.bottom.img.height;
    const topPipeRenderHeight = topImgHeight * this.#pipePair.renderCoeff;
    const bottomPipeRenderHeight = bottomImgHeight * this.#pipePair.renderCoeff;

    this.#pipePair.top.renderedHeight = topPipeRenderHeight;
    this.#pipePair.bottom.renderedHeight = bottomPipeRenderHeight;
    this.#pipePair.top.y = pipeHeight - this.#pipePair.top.renderedHeight;
    this.#pipePair.bottom.y = pipeHeight + this.#pipePair.gap;

    this.update();
  }

  stop() {
    this.isHidden = true;
  }

  update() {
    const continueUpdating = () => requestAnimationFrame(() => this.update());

    if (this.isHidden) return;
    if (this.#frames < this.#framesDelayToShow) {
      continueUpdating();
      this.#frames += 1;
      return;
    }

    const birdY = this.#bird.y;
    const power = this.#birdPower;

    if (birdY >= this.#halfCanvasHeight - power) {
      this.#bird.flap();
    }

    this.#bird.update(GRAVITY);
    if (this.#isPipePairGoesRight) {
      let newPipeX = this.#pipePair.x + this.speed;

      if (newPipeX > this.#pipePairEndX) {
        this.#isPipePairGoesRight = false;
        newPipeX = this.#pipePair.x - this.speed;
      }

      this.#pipePair.x = newPipeX;
    } else {
      let newPipeX = this.#pipePair.x - this.speed;

      if (newPipeX < this.#pipePairStartX) {
        this.#isPipePairGoesRight = true;
        newPipeX = this.#pipePair.x + this.speed;
      }

      this.#pipePair.x = newPipeX;
    }

    this.draw();
    continueUpdating();
  }

  draw() {
    this.#ctx.fillStyle = COLOR_LOADER_BG;
    this.#ctx.fillRect(0, 0, this.#canvas.width, this.#canvas.height);
    this.#bird.draw(this.#ctx);
    this.#pipePair.draw(this.#ctx);

    const logo = this.#images.logo;
    const logoWidth = this.#canvas.width * 0.7;
    const logoHeight = (logo.height * logoWidth) / logo.width;
    this.#ctx.drawImage(
      logo,
      (this.#canvas.width - logoWidth) / 2,
      this.#canvas.height * 0.15,
      logoWidth,
      logoHeight
    );
  }
}

export default Loader;
