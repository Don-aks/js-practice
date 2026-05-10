import soundSrcs from '@/assets/sounds';

class SoundManager {
  die = 'die';
  flap = 'flap';
  point = 'point';
  hit = 'hit';

  #POOL_SIZE = 5;

  #POOLED_SOUNDS = ['flap'];
  sounds = {};

  async loadAll() {
    const entries = Object.entries(soundSrcs);

    const loadedSounds = await Promise.all(
      entries.map(async ([key, src]) => {
        const sound = this.#isPooled(key)
          ? await this.#loadPool(src)
          : this.#createAudio(src);

        return [key, sound];
      }),
    );

    this.sounds = Object.fromEntries(loadedSounds);
  }

  playSound(name) {
    const sound = this.sounds[name];
    if (!sound) return;

    if (this.#isPooled(name)) {
      this.#playFromPool(sound);
      return;
    }

    this.#playSingle(sound);
  }

  #playSingle(audio) {
    if (this.#isPlaying(audio)) return;

    audio.currentTime = 0;
    audio.play();
  }

  #playFromPool(pool) {
    const audio = pool.find((a) => a.paused || a.ended) || pool[0];

    audio.currentTime = 0;
    audio.play();
  }

  #createAudio(src) {
    const audio = new Audio();
    audio.preload = 'auto';
    audio.src = src;

    return audio;
  }

  #loadPool(src) {
    return Promise.all(
      Array.from({ length: this.#POOL_SIZE }, () => this.#loadAudio(src)),
    );
  }

  #loadAudio(src) {
    return new Promise((resolve, reject) => {
      const audio = this.#createAudio(src);

      audio.onloadeddata = () => resolve(audio);
      audio.onerror = () => {
        console.error('Sound load error:', audio.src);
        reject(new Error(`Cannot load ${audio.src}`));
      };
    });
  }

  #isPooled(name) {
    return this.#POOLED_SOUNDS.includes(name);
  }

  #isPlaying(audio) {
    return !audio.paused && !audio.ended;
  }
}

export default new SoundManager();
