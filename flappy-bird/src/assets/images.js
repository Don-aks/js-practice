import backgroundDay from '/assets/background-day.webp';
import backgroundNight from '/assets/background-night.webp';

import logo from '/assets/logo.webp';
import playBtn from '/assets/play-btn.webp';

import bird from '/assets/bird.webp';
import pipeTop from '/assets/pipe-top.webp';
import pipeBottom from '/assets/pipe-bottom.webp';
import ground from '/assets/ground.webp';

import gameOver from '/assets/game-over.webp';
import gameOverScreen from '/assets/game-over-screen.webp';
import bronzeMedal from '/assets/medals/bronze.webp';
import silverMedal from '/assets/medals/silver.webp';
import goldMedal from '/assets/medals/gold.webp';
import platinumMedal from '/assets/medals/platinum.webp';

export const PRELOAD_IMAGES = { bird, logo, pipeTop, pipeBottom };

export const RUNTIME_IMAGES = {
  // --- Backgrounds --- //
  backgroundDay,
  backgroundNight,

  // --- Menu --- //
  playBtn,

  // --- Game --- //
  ground,

  // --- Game over screen --- //
  gameOver,
  gameOverScreen,
  bronzeMedal,
  silverMedal,
  goldMedal,
  platinumMedal,
};
