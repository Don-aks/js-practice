import { FONT, MEDALS, STORAGE_RECORD_KEY } from '../constants/constants.js';

class ScoreManager {
  record = null;
  #score = 0;
  #storageRecordKey = STORAGE_RECORD_KEY;

  constructor() {
    this.record = this.#getRecordFromLocalStorage();
  }

  draw(ctx, canvasWidth, canvasHeight) {
    ctx.fillStyle = this.scoreColor;
    ctx.font = `${canvasWidth * 0.2}px ${FONT}`;
    ctx.textAlign = 'center';
    ctx.shadowColor = '#000000';
    ctx.lineWidth = canvasHeight * 0.02;
    ctx.strokeText(this.#score, canvasWidth / 2, canvasHeight * 0.13);
    ctx.fillText(this.#score, canvasWidth / 2, canvasHeight * 0.13);
  }

  check(bird, pipePairs) {
    return pipePairs.some((pipePair) => {
      if (pipePair.isPassed) return false;

      const pipeX = pipePair.x;
      const pipeWidth = pipePair.top.width;
      const isBirdBetween = bird.x >= pipeX && bird.x <= pipeX + pipeWidth;

      if (isBirdBetween && bird.x >= pipeX + pipeWidth / 2) {
        pipePair.isPassed = true;
        return true;
      }
    });
  }

  get score() {
    return this.#score;
  }

  get medalName() {
    return this.calculateMedalName(this.#score);
  }

  get scoreColor() {
    return MEDALS[this.medalName]?.color || '#ffffff';
  }

  increment() {
    this.#score += 1;
  }

  reset() {
    this.#score = 0;
  }

  save() {
    this.record = this.#getRecordFromLocalStorage();

    if (!this.record || this.#score > Number(this.record)) {
      localStorage.setItem(this.#storageRecordKey, this.#score);
      this.record = this.#score;
    }
  }

  getColor(medalName) {
    return MEDALS[medalName]?.color ?? '#ffffff';
  }

  calculateMedalName(score) {
    const medalsArray = Object.entries(MEDALS);
    const medalEntry = medalsArray
      .reverse()
      .find(([, { threshold }]) => score >= threshold);

    return medalEntry ? medalEntry[0] : 'noMedal';
  }

  #getRecordFromLocalStorage() {
    return localStorage.getItem(this.#storageRecordKey) || 0;
  }
}

export default new ScoreManager();
