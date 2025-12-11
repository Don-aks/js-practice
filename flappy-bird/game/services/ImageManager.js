import imageSrcs from '../../assets/_images.js';
import { LOADER_REQUIRED_IMAGE_KEYS } from '../constants/constants.js';

class ImageManager {
  images = {};
  #firstToLoad = LOADER_REQUIRED_IMAGE_KEYS;

  async loadInitial() {
    await Object.entries(imageSrcs, true);
    return this.images;
  }

  async loadRest() {
    await this.#loadImages(imageSrcs);
    return this.images;
  }

  async #loadImages(imageSrcs, isInitialLoad = false) {
    let entries = Object.entries(imageSrcs);

    if (isInitialLoad) {
      entries = entries.filter(([key]) => this.#firstToLoad.includes(key));
    }

    const promises = entries.map(async ([key, src]) => {
      await this.#loadImage(key, src);
    });
    await Promise.all(promises);
  }

  #loadImage(key, src) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = `assets/${src}`;

      this.images[key] = img;
    });
  }
}

export default new ImageManager();
