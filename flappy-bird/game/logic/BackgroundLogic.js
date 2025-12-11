import { FRAME_COUNT_TO_TOGGLE_DAY_NIGHT } from '../constants/constants.js';
import Background from '../objects/Background.js';

class BackgroundLogic {
  frameCountToToggleDayNight = FRAME_COUNT_TO_TOGGLE_DAY_NIGHT;
  isStartAsDay = true;
  #frameCount = 0;
  #images = {};

  #background;
  #canvas;

  constructor(images) {
    this.#images = images;
  }

  init(canvas) {
    this.#canvas = canvas;
    this.#background = new Background(
      { day: this.#images.backgroundDay, night: this.#images.backgroundNight },
      this.#canvas.width,
      this.#canvas.height,
      this.isStartAsDay
    );
  }

  draw(ctx) {
    this.#background.draw(ctx, this.#canvas.width, this.#canvas.height);
  }

  update() {
    this.#frameCount += 1;

    if (this.#frameCount >= this.frameCountToToggleDayNight) {
      this.#background.change();
      this.#frameCount = 0;
    }
  }

  get isChanging() {
    return this.#background.isChanging;
  }
}

export default BackgroundLogic;
