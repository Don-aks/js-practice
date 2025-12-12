class Background {
  isChanging = false;
  upperOpacity = 1;
  lowerOpacity = 0;

  constructor(images, canvasWidth, canvasHeight, isDay = true) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.isDay = isDay;

    const { day, night } = images;
    this.current = isDay ? day : night;
    this.lower = isDay ? night : day;
  }

  change() {
    this.isChanging = true;
    this.isDay = !this.isDay;
  }

  draw(ctx) {
    if (this.isChanging) {
      this.#drawCoveredImage(ctx, this.current, this.upperOpacity);
      this.#drawCoveredImage(ctx, this.lower, this.lowerOpacity);

      this.upperOpacity -= 0.02;
      this.lowerOpacity += 0.02;

      if (this.lowerOpacity >= 1) {
        this.isChanging = false;
        this.upperOpacity = 1.0;
        this.lowerOpacity = 0.0;

        const temp = this.current;
        this.current = this.lower;
        this.lower = temp;
      }
      return;
    }

    this.#drawCoveredImage(ctx, this.current, this.upperOpacity);
  }

  #drawCoveredImage(ctx, img, opacity) {
    const canvasW = this.canvasWidth;
    const canvasH = this.canvasHeight;
    const imgW = img.width;
    const imgH = img.height;

    const scale = Math.max(canvasW / imgW, canvasH / imgH);
    const scaledW = imgW * scale;
    const scaledH = imgH * scale;

    const offsetX = (canvasW - scaledW) / 2;
    const offsetY = (canvasH - scaledH) / 2;

    ctx.globalAlpha = opacity;
    ctx.drawImage(img, offsetX, offsetY, scaledW, scaledH);
    ctx.globalAlpha = 1.0;
  }
}

export default Background;
