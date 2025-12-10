import soundSrcs from '../../assets/_sounds.js';

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

    entries.forEach(([key, src]) => {
      const audio = this.#loadSound(src);
      this.sounds[key].push(audio);
    });
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
    const audio = new Audio();
    audio.src = `assets/sounds/${src}`;
    return audio;
  }

  #isPlaying(audio) {
    return !audio.paused;
  }
}

export default new SoundManager();
