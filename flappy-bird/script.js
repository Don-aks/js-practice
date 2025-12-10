import CanvasManager from './game/services/CanvasManager.js';
import AssetsManager from './game/services/AssetsManager.js';
import Menu from './game/scenes/Menu.js';
import Game from './game/scenes/Game.js';

const [result, canvas] = CanvasManager.init('#gameCanvas');
if (!result) throw new Error('Cannot set canvas size');

AssetsManager.loadWithLoader(canvas).then((images) => {
  const menu = new Menu(canvas, images);
  const game = new Game(menu, canvas, images);
  menu.game = game;
  menu.setupEventListeners();
  menu.show();
});
