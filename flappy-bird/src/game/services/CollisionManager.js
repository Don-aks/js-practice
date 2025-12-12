class CollisionManager {
  check(bird, pipePairs, groundY) {
    this.bird = bird;
    this.groundY = groundY;
    this.pipePairs = pipePairs;

    return (
      this.#checkCeilingCollision() ||
      this.#checkGroundCollision() ||
      this.#checkPipePairsCollisions()
    );
  }

  #checkCeilingCollision() {
    return this.bird.y - this.bird.hitboxHalfHeight <= 0;
  }

  #checkGroundCollision() {
    return this.bird.y + this.bird.hitboxHalfHeight >= this.groundY;
  }

  #checkPipePairsCollisions() {
    return this.pipePairs.some(
      (pipePair) =>
        pipePair.top.checkCollision(this.bird) ||
        pipePair.bottom.checkCollision(this.bird)
    );
  }
}

export default new CollisionManager();
