import Pipe from './Pipe';
import PipePairLogic from '../logic/PipePairLogic';

class PipePair {
  isPassed = false;
  #logic;

  constructor(
    images,
    screenWidth,
    screenHeight,
    groundHeight,
    previous,
    isGenerateHeight = true
  ) {
    this.#logic = new PipePairLogic(screenWidth, screenHeight, groundHeight);

    this.top = new Pipe(images.pipeTop, true, this.#logic.pipeWidth);
    this.bottom = new Pipe(images.pipeBottom, false, this.#logic.pipeWidth);

    this.x = this.#logic.getInitialX(previous);
    if (isGenerateHeight) {
      this.#applyNewHeights(previous?.top.height);
    }
  }

  // --- Public --- //

  draw(ctx) {
    this.top.draw(ctx, this.x);
    this.bottom.draw(ctx, this.x);
  }

  update(speed) {
    this.x -= speed;
  }

  isOffscreen() {
    return this.x + this.top.width < 0;
  }

  moveToNextPosition(previous) {
    this.x = this.#logic.getInitialX(previous);
    this.#applyNewHeights(previous?.top.height);
    this.isPassed = false;
  }

  checkPassed(bird) {
    if (this.isPassed) return false;

    const width = this.top.width;
    const isBirdBetween = bird.x >= this.x && bird.x <= this.x + width;

    if (isBirdBetween && bird.x >= this.x + width / 2) {
      this.isPassed = true;
      return true;
    }
  }

  // --- Getters --- //

  get width() {
    return this.top.width;
  }

  get gap() {
    return this.#logic.gap;
  }

  get renderCoeff() {
    return this.#logic.renderCoeff;
  }

  // --- Private --- //

  #applyNewHeights(previousTopHeight) {
    const h = this.#logic.getPipeHeights(previousTopHeight);
    const coeff = this.#logic.renderCoeff;

    this.top.height = h.top;
    this.top.renderedHeight = this.top.img.height * coeff;
    this.top.y = this.top.height - this.top.renderedHeight;

    this.bottom.height = h.bottom;
    this.bottom.renderedHeight = this.bottom.img.height * coeff;
    this.bottom.y = h.bottomY;
  }
}

export default PipePair;
