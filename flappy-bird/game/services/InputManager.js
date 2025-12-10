class InputManager {
  setupEventListeners(callback) {
    this.callback = callback;

    document.addEventListener('touchstart', callback);
    document.addEventListener('mousedown', callback);
    document.addEventListener('keydown', this.#runCallbackOnSpacebar);
  }

  removeEventListeners() {
    document.removeEventListener('touchstart', this.callback);
    document.removeEventListener('mousedown', this.callback);
    document.removeEventListener('keydown', this.#runCallbackOnSpacebar);
  }

  #runCallbackOnSpacebar = (event) => {
    if (event.code === 'Space' || event.key === ' ') {
      this.callback();
    }
  };
}

export default new InputManager();
