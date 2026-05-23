import CanvasLogic from '../logic/CanvasLogic';

class CanvasManager {
  init(canvasSelector) {
    this.canvas = document.querySelector(canvasSelector);
    this.canvasLogic = new CanvasLogic(this.canvas);

    this.canvasLogic.resizeToViewport();
    return this.canvas;
  }
}

export default new CanvasManager();
