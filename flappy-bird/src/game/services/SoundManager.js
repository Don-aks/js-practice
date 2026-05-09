import soundSrcs from '@/assets/sounds';

class SoundManager {
  die = 'die';
  flap = 'flap';
  point = 'point';
  hit = 'hit';

  sounds = {
    die: [],
    flap: [],
    point: [],
    hit: [],
  };

  async loadAll() {
    const entries = Object.entries(soundSrcs);

    await Promise.all(
      entries.map(async ([key, src]) => {
        const audio = await this.#loadSound(src);
        this.sounds[key].push(audio);
      }),
    );
  }

  playSound(name) {
    if (
      Object.hasOwn(this.sounds, name) &&
      this.#isPlaying(this.sounds[name][0])
    ) {
      const cloneAudio = this.sounds[name][0].cloneNode();
      cloneAudio.play();
      return;
    }

    this.sounds[name].slice(0, 1);
    this.sounds[name][0].play();
  }

  #loadSound(src) {
    return new Promise((resolve, reject) => {
      const audio = new Audio();

      audio.oncanplaythrough = () => resolve(audio);
      audio.onerror = () => {
        console.error('Sound load error:', audio.src);
        reject(new Error(`Cannot load ${audio.src}`));
      };

      audio.src = `/sounds/${src}`;
    });
  }

  #isPlaying(audio) {
    return !audio.paused;
  }
}

export default new SoundManager();
