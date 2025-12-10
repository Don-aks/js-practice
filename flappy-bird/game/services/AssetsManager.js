import ImageManager from './ImageManager.js';
import SoundManager from './SoundManager.js';
import FontManager from './FontManager.js';

import Loader from '../scenes/Loader.js';

class AssetsManager {
  async loadWithLoader(canvas) {
    const imagesForLoader = await ImageManager.loadInitial();
    const loader = new Loader(canvas, imagesForLoader);

    loader.start();
    this.images = await ImageManager.loadRest();
    await SoundManager.loadAll();
    await FontManager.loadAll();
    loader.stop();

    return this.images;
  }
}

export default new AssetsManager();
