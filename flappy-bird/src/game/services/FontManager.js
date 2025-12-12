import { FONT, FONT_SRC } from '../constants/constants';

class FontManager {
  loadAll() {
    const font = new FontFace(FONT, FONT_SRC);
    return font.load().then((loadedFont) => {
      document.fonts.add(loadedFont);
    });
  }
}

export default new FontManager();
