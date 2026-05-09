import { MIN_WIDTH, MIN_HEIGHT } from '../constants/constants';

class CanvasLogic {
  constructor(canvas) {
    this.canvas = canvas;
  }

  resizeToViewport() {
    const dpr = window.devicePixelRatio || 1;

    const width = window.visualViewport.width * dpr;
    const height = window.visualViewport.height * dpr;

    this.resizeCanvas(width, height);
  }

  resizeCanvas(width, height) {
    this.canvas.height = height;
    this.canvas.width = Math.min(width, height * 0.55);

    if (this.canvas.width < MIN_WIDTH || this.canvas.height < MIN_HEIGHT) {
      throw new Error(
        'Viewport size is too small for the game to run properly. Change your zoom level or use a device with a larger screen.',
      );
    }
  }
}

export default CanvasLogic;
