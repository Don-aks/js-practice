import CanvasLogic from '../logic/CanvasLogic';

class CanvasManager {
  init(canvasSelector) {
    this.canvas = document.querySelector(canvasSelector);
    this.canvasLogic = new CanvasLogic(this.canvas);

    try {
      this.canvasLogic.resizeToViewport();
    } catch (error) {
      alert(error.message);
      return [false, this.canvas];
    }
    return [true, this.canvas];
  }
}

export default new CanvasManager();
