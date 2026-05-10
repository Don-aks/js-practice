import InputManager from '../services/InputManager';
import BackgroundLogic from '../logic/BackgroundLogic';
import Ground from '../objects/Ground';

class Menu {
  #images = {};
  isHidden = false;

  #game;
  #logo;
  #playBtn;

  constructor(canvas, images) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.#images = images;
    this.#initGround();
    this.#initBackground();
    this.#initMenuElements();

    this.speed = this.canvas.clientWidth * 0.006;
  }

  setupEventListeners() {
    InputManager.setupEventListeners(this.#handleTap);
  }

  show() {
    this.isHidden = false;
    this.update();
  }

  draw() {
    this.backgroundLogic.draw(this.ctx);
    this.ground.draw(this.ctx);

    this.#drawLogo();
    this.#drawButton();
  }

  update() {
    if (this.isHidden) return;

    this.draw();
    this.backgroundLogic.update();
    this.ground.update(this.speed);

    requestAnimationFrame(() => this.update());
  }

  set game(gameInstance) {
    this.#game = gameInstance;
  }

  // --- Initialization --- //

  #initGround() {
    this.ground = new Ground(this.#images.ground, this.canvas.clientHeight, 0);
  }

  #initBackground() {
    this.backgroundLogic = new BackgroundLogic(this.#images);
    this.backgroundLogic.init(this.canvas);
  }

  #initMenuElements() {
    const logoImg = this.#images.logo;
    const playImg = this.#images.playBtn;

    this.#logo = {
      img: logoImg,
      width: this.canvas.clientWidth * 0.7,
    };
    this.#playBtn = {
      img: playImg,
      width: this.canvas.clientWidth * 0.3,
    };

    this.#logo.height = (logoImg.height / logoImg.width) * this.#logo.width;
    this.#playBtn.height =
      (playImg.height / playImg.width) * this.#playBtn.width;
  }

  // --- Logic --- //

  #handleTap = () => {
    InputManager.removeEventListeners();
    this.isHidden = true;

    this.#game.addEventListeners();
    this.#game.start();
  };

  // --- Drawing --- //

  #drawLogo() {
    this.ctx.drawImage(
      this.#logo.img,
      (this.canvas.clientWidth - this.#logo.width) / 2,
      this.canvas.clientHeight * 0.15,
      this.#logo.width,
      this.#logo.height,
    );
  }

  #drawButton() {
    this.ctx.drawImage(
      this.#playBtn.img,
      (this.canvas.clientWidth - this.#playBtn.width) / 2,
      this.canvas.clientHeight * 0.5,
      this.#playBtn.width,
      this.#playBtn.height,
    );
  }
}

export default Menu;
