import { FRAME_COUNT_TO_TOGGLE_DAY_NIGHT } from '../constants/constants';
import Background from '../objects/Background';

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
      this.#canvas.clientWidth,
      this.#canvas.clientHeight,
      this.isStartAsDay,
    );
  }

  draw(ctx) {
    this.#background.draw(
      ctx,
      this.#canvas.clientWidth,
      this.#canvas.clientHeight,
    );
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
