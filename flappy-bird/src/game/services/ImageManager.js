import { PRELOAD_IMAGES, RUNTIME_IMAGES } from '@/assets/images';

class ImageManager {
  images = {};

  async loadInitial() {
    await this.#loadImages(PRELOAD_IMAGES);
    return this.images;
  }

  async loadRest() {
    await this.#loadImages(RUNTIME_IMAGES);
    return this.images;
  }

  async #loadImages(imageSrcs) {
    let entries = Object.entries(imageSrcs);

    const promises = entries.map(async ([key, src]) => {
      await this.#loadImage(key, src);
    });
    await Promise.all(promises);
  }

  #loadImage(key, src) {
    return new Promise((resolve, reject) => {
      const img = new Image();

      img.onload = () => resolve(img);
      img.onerror = () => {
        console.error('Image load error:', img.src);
        reject(new Error(`Cannot load ${img.src}`));
      };
      img.src = src;

      this.images[key] = img;
    });
  }
}

export default new ImageManager();
