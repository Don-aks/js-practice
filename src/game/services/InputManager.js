class InputManager {
  setupEventListeners(callback) {
    this.callback = callback;

    document.addEventListener('pointerdown', callback);
    document.addEventListener('keydown', this.#runCallbackOnSpacebar);
  }

  removeEventListeners() {
    document.removeEventListener('pointerdown', this.callback);
    document.removeEventListener('keydown', this.#runCallbackOnSpacebar);
  }

  #runCallbackOnSpacebar = (event) => {
    if (event.code === 'Space' || event.key === ' ') {
      this.callback();
    }
  };
}

export default new InputManager();
