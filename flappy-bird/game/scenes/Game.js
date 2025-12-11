import { GRAVITY } from '../constants/constants.js';

import CollisionManager from '../services/CollisionManager.js';
import ScoreManager from '../services/ScoreManager.js';
import InputManager from '../services/InputManager.js';
import SoundManager from '../services/SoundManager.js';

import BackgroundLogic from '../logic/BackgroundLogic.js';
import GameOver from './GameOver.js';

import PipePair from '../objects/PipePair.js';
import Ground from '../objects/Ground.js';
import Bird from '../objects/Bird.js';

class Game {
  PIPES_TO_RENDER = 2;

  isStartAsDay = true;
  gravity = GRAVITY;

  frameCount = 0;
  pipePairs = [];

  isGameOver = false;
  isLockedInput = false;

  #images = {};

  constructor(menu, canvas, images) {
    this.menu = menu;
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.#images = images;
    this.speed = this.canvas.width * 0.006;
  }

  addEventListeners() {
    InputManager.setupEventListeners(this.#handleFlap);
  }

  start() {
    this.isGameOver = false;
    this.isLockedInput = false;

    this.#initBackground();
    this.#initGround();

    this.#initPipes();
    this.#initBird();

    this.update();
  }

  stop() {
    this.isGameOver = true;
    this.frameCount = 0;
    this.pipePairs = [];

    ScoreManager.reset();
  }

  update() {
    if (this.isGameOver) return;

    this.draw();
    this.#updateLogic();
    this.#handleScore();
    this.#handleGameOver();
    this.#handleCollisions();
    this.backgroundLogic.update();

    requestAnimationFrame(() => this.update());
  }

  draw() {
    this.backgroundLogic.draw(this.ctx);

    this.pipePairs.forEach((pipe, index) => {
      pipe.draw(this.ctx);

      if (pipe.isOffscreen()) {
        const prevPipe = this.pipePairs[index + 1] ?? this.pipePairs[0];
        pipe.moveToNextPosition(prevPipe);
      }
    });

    this.ground.draw(this.ctx);
    this.bird.draw(this.ctx);

    ScoreManager.draw(this.ctx, this.canvas.width, this.canvas.height);
  }

  // --- Initialization --- //

  #initGround() {
    this.ground = new Ground(this.#images.ground, this.canvas.height, 0);
  }

  #initBird() {
    this.bird = new Bird(
      this.#images.bird,
      this.canvas.height,
      this.ground.height
    );
  }

  #initBackground() {
    this.backgroundLogic = new BackgroundLogic(this.#images);
    this.backgroundLogic.init(this.canvas);
  }

  #initPipes() {
    for (let i = 0; i < this.PIPES_TO_RENDER; i++) {
      const previous = this.pipePairs[i - 1];

      this.pipePairs.push(
        new PipePair(
          this.#images,
          this.canvas.width,
          this.canvas.height,
          this.ground.height,
          previous
        )
      );
    }
  }

  // --- Logic --- //

  #updateLogic() {
    this.bird.update(this.gravity);
    if (this.isLockedInput) return;

    const speed = this.speed;
    this.pipePairs.forEach((pipe) => pipe.update(speed));
    this.ground.update(speed);
  }

  #handleCollisions() {
    if (this.isLockedInput) return;

    if (CollisionManager.check(this.bird, this.pipePairs, this.ground.y)) {
      SoundManager.playSound(SoundManager.hit);
      ScoreManager.save();

      this.isLockedInput = true;
    }
  }

  #handleScore() {
    if (this.isLockedInput) return;

    this.pipePairs.forEach((pipePair) => {
      if (!pipePair.checkPassed(this.bird)) return;

      SoundManager.playSound(SoundManager.point);
      ScoreManager.increment();
    });
  }

  #handleGameOver() {
    const screenOffset = this.canvas.height * 0.1;
    const birdTopBottom = this.bird.y - this.bird.hitboxHalfHeight;
    const isOutOfScreen = birdTopBottom >= this.canvas.height + screenOffset;

    if (this.isLockedInput && isOutOfScreen) {
      SoundManager.playSound(SoundManager.die);
      this.gameOverScreen = new GameOver(
        this.canvas,
        this.#images,
        ScoreManager.score,
        ScoreManager.record ?? ScoreManager.score,
        ScoreManager.medalName
      );
      this.stop();

      this.gameOverScreen.show();
    }
  }

  // --- Handlers --- //

  #handleFlap = () => {
    if (this.isLockedInput && this.isGameOver) {
      this.gameOverScreen.hide();
      this.menu.show();

      InputManager.removeEventListeners();
      this.menu.setupEventListeners();
      return;
    } else if (this.isLockedInput) {
      return;
    }

    SoundManager.playSound(SoundManager.flap);
    this.bird.flap(this.canvas.width);
  };
}

export default Game;
