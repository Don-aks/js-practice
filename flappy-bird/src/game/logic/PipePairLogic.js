class PipePairLogic {
  constructor(screenWidth, screenHeight, groundHeight) {
    this.screenWidth = screenWidth;
    this.screenHeight = screenHeight;
    this.groundHeight = groundHeight;

    this.pipeWidth = screenWidth * 0.18;
    this.minHeight = screenHeight * 0.12;
    this.spaceBetween = this.pipeWidth + screenWidth * 0.7;

    this.gap = screenHeight * 0.18;
    this.minOffset = screenHeight * 0.17;
    this.maxOffset = screenHeight * 0.35;

    this.renderCoeff = screenHeight * 0.0008;
  }

  getInitialX(previous) {
    return (previous?.x ?? this.screenWidth * 0.5) + this.spaceBetween;
  }

  getPipeHeights(previousTopHeight) {
    const [min, max] = this.#getValidTopRange(previousTopHeight);
    const topHeight = this.#randomBetween(min, max);
    const bottomHeight = this.screenHeight - topHeight - this.gap;

    return {
      top: topHeight,
      bottom: bottomHeight,
      topY: 0,
      bottomY: topHeight + this.gap,
    };
  }

  // --- Private --- //

  #getValidTopRange(previousHeight) {
    const minH = this.minHeight;
    const min = minH;
    const max = this.screenHeight - this.gap - minH * 2 - this.groundHeight;

    if (!previousHeight) return [min, max];

    const up = [
      Math.max(previousHeight - this.maxOffset, min),
      previousHeight - this.minOffset,
    ];

    const downStart = up[1] + this.gap + this.minOffset;

    const down = [
      Math.min(downStart, max),
      Math.min(downStart + this.maxOffset, max),
    ];

    return this.#chooseRange(up, down, min, max);
  }

  #chooseRange(up, down, min, max) {
    const upSize = up[1] - up[0];
    const downSize = down[1] - down[0];

    const upValid = up[0] > min;
    const downValid = down[1] < max;

    if (upSize > downSize && upValid) return up;
    if (upSize < downSize && downValid) return down;

    return upSize >= downSize ? up : down;
  }

  #randomBetween(min, max) {
    return Math.random() * (max - min) + min;
  }
}

export default PipePairLogic;
