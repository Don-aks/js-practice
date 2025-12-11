import InputManager from '../services/InputManager.js';
import BackgroundLogic from '../logic/BackgroundLogic.js';
import Ground from '../objects/Ground.js';

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

    this.speed = this.canvas.width * 0.006;
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
    this.ground = new Ground(this.#images.ground, this.canvas.height, 0);
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
      width: this.canvas.width * 0.7,
    };
    this.#playBtn = {
      img: playImg,
      width: this.canvas.width * 0.3,
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
      (this.canvas.width - this.#logo.width) / 2,
      this.canvas.height * 0.35,
      this.#logo.width,
      this.#logo.height
    );
  }

  #drawButton() {
    this.ctx.drawImage(
      this.#playBtn.img,
      (this.canvas.width - this.#playBtn.width) / 2,
      this.canvas.height * 0.5,
      this.#playBtn.width,
      this.#playBtn.height
    );
  }
}

export default Menu;
