import { LOADER_FRAMES_DELAY } from '../constants/constants.js';
import PipePair from '../objects/PipePair.js';
import Bird from '../objects/Bird.js';

class Loader {
  isHidden = false;

  framesDelayToShow = LOADER_FRAMES_DELAY;
  #frames = 0;

  constructor(canvas, images) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.images = images;
  }

  start() {
    console.log('start');
    this.update();
  }

  stop() {
    console.log('stop');
    this.isHidden = true;
  }

  update() {
    if (this.isHidden) return;

    if (this.#frames < this.framesDelayToShow) {
      this.#frames += 1;
      return;
    }

    this.draw();

    requestAnimationFrame(() => this.update());
  }

  draw() {}
}

export default Loader;
