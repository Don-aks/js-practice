import Pipe from './Pipe.js';
import PipePairLogic from '../logic/PipePairLogic.js';

class PipePair {
  isPassed = false;

  constructor(images, screenWidth, screenHeight, groundHeight, previous) {
    this.logic = new PipePairLogic(screenWidth, screenHeight, groundHeight);

    this.top = new Pipe(images.pipeTop, true, this.logic.pipeWidth);
    this.bottom = new Pipe(images.pipeBottom, false, this.logic.pipeWidth);

    this.x = this.logic.getInitialX(previous);
    this.#applyNewHeights(previous?.top.height);
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
    this.x = this.logic.getInitialX(previous);
    this.#applyNewHeights(previous?.top.height);
    this.isPassed = false;
  }

  checkPassed() {}

  // --- Private --- //

  #applyNewHeights(previousTopHeight) {
    const h = this.logic.getPipeHeights(previousTopHeight);
    const coeff = this.logic.renderCoeff;

    this.top.height = h.top;
    this.top.renderedHeight = this.top.img.height * coeff;
    this.top.y = this.top.height - this.top.img.height * coeff;

    this.bottom.height = h.bottom;
    this.bottom.renderedHeight = this.bottom.img.height * coeff;
    this.bottom.y = h.bottomY;
  }
}

export default PipePair;
