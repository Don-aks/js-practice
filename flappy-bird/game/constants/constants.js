export const LOADER_FRAMES_DELAY_TO_SHOW = 0;
export const LOADER_REQUIRED_IMAGE_KEYS = [
  'bird',
  'logo',
  'pipeTop',
  'pipeBottom',
];

export const MIN_WIDTH = 320;
export const MIN_HEIGHT = 480;

export const GRAVITY = 0.15;

export const FRAME_COUNT_TO_TOGGLE_DAY_NIGHT = 600;
export const STORAGE_RECORD_KEY = 'record';

export const COLOR_LOADER_BG = '#4ec0ca';
export const COLOR_TEXT_DEFAULT = '#ffffff';
export const COLOR_TEXT_SHADOW = '#000000';

export const FONT = 'FlappyBird';
export const FONT_SRC = "url('assets/fonts/FlappyBird.woff2') format('woff2')";

export const MEDALS = {
  bronze: {
    color: '#F8B347',
    threshold: 10,
    imageKey: 'bronzeMedal',
  },
  silver: {
    color: '#9D9898',
    threshold: 20,
    imageKey: 'silverMedal',
  },
  gold: {
    color: '#F9DE62',
    threshold: 30,
    imageKey: 'goldMedal',
  },
  platinum: {
    color: '#D0CECE',
    threshold: 40,
    imageKey: 'platinumMedal',
  },
};
