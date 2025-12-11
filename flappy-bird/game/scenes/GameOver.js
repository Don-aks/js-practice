import { COLOR_TEXT_SHADOW, FONT } from '../constants/constants.js';
import ScoreManager from '../services/ScoreManager.js';

class GameOver {
  isHidden = false;

  constructor(canvas, images, score, record, medalName) {
    this.canvas = canvas;
    this.images = images;
    this.score = score;
    this.record = record;
    this.medalName = medalName;

    this.ctx = canvas.getContext('2d');
  }

  show() {
    if (this.isHidden) return;

    this.draw();
    requestAnimationFrame(() => this.show());
  }

  hide() {
    this.isHidden = true;
  }

  draw() {
    const panelImg = this.images.gameOverScreen;
    const panelWidth = this.canvas.width * 0.7;
    const panelHeight = (panelImg.height / panelImg.width) * panelWidth;
    const panelX = this.canvas.width / 2 - panelWidth / 2;
    const panelY = this.canvas.height / 2 - panelWidth / 2;
    this.ctx.drawImage(panelImg, panelX, panelY, panelWidth, panelHeight);

    this.ctx.fillStyle = ScoreManager.getColor(this.medalName);
    this.ctx.font = `${panelWidth * 0.1}px ${FONT}`;
    this.ctx.textAlign = 'right';
    this.ctx.shadowColor = COLOR_TEXT_SHADOW;
    this.ctx.lineWidth = panelWidth * 0.03;
    const scoreX = panelX + panelWidth * 0.89;
    const scoreY = panelY + panelHeight * 0.42;

    this.ctx.strokeText(this.score, scoreX, scoreY);
    this.ctx.fillText(this.score, scoreX, scoreY);

    if (this.record === null) return;
    this.ctx.fillStyle = ScoreManager.getColor(
      ScoreManager.calculateMedalName(Number(this.record))
    );
    const recordX = panelX + panelWidth * 0.89;
    const recordY = panelY + panelHeight * 0.77;
    this.ctx.strokeText(this.record, recordX, recordY);
    this.ctx.fillText(this.record, recordX, recordY);

    if (this.medalName === 'noMedal') return;
    const medalImg = this.images[`${this.medalName}Medal`];
    const medalWidth = panelWidth * 0.2;
    const medalX = panelX + panelWidth * 0.12;
    const medalY = panelY + panelHeight * 0.37;
    this.ctx.drawImage(medalImg, medalX, medalY, medalWidth, medalWidth);
  }
}

export default GameOver;
