import { MIN_WIDTH, MIN_HEIGHT } from '../constants/constants';

class CanvasLogic {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
  }

  resizeToViewport() {
    const viewport = window.visualViewport ?? {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    const width = Math.max(viewport.width, MIN_WIDTH);
    const height = Math.max(viewport.height, MIN_HEIGHT);

    const cssWidth = Math.min(width, height * 0.55);
    const cssHeight = height;
    this.setCanvasCSSSize(cssWidth, cssHeight);

    const dpr = Math.round(window.devicePixelRatio || 1);
    this.resizeCanvas(cssWidth, cssHeight, dpr);
  }

  setCanvasCSSSize(width, height) {
    this.canvas.style.width = `${width}px`;
    this.canvas.style.height = `${height}px`;
  }

  resizeCanvas(width, height, dpr) {
    this.canvas.height = height * dpr;
    this.canvas.width = width * dpr;
    this.ctx.scale(dpr, dpr);
  }
}

export default CanvasLogic;
