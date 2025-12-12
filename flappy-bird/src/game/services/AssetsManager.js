import ImageManager from './ImageManager';
import SoundManager from './SoundManager';
import FontManager from './FontManager';

import Loader from '../scenes/Loader';

class AssetsManager {
  async loadWithLoader(canvas) {
    console.log('+');
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
