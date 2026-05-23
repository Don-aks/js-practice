import CanvasManager from './game/services/CanvasManager';
import AssetsManager from './game/services/AssetsManager';
import Menu from './game/scenes/Menu';
import Game from './game/scenes/Game';
import './style.css';

const canvas = CanvasManager.init('#gameCanvas');

AssetsManager.loadWithLoader(canvas).then((images) => {
  const menu = new Menu(canvas, images);
  const game = new Game(menu, canvas, images);
  menu.game = game;
  menu.setupEventListeners();
  menu.show();
});
