
// Global utilities
const UTILS = {
  getRand255() {
    return Math.floor(Math.random() * 255);
  },

  getRandomRGB() {
    return {R: this.getRand255(), G: this.getRand255(), B: this.getRand255()};
  },

  getRandomRGB_A() {
    return {R: this.getRand255(), G: this.getRand255(), B: this.getRand255(), alpha: Math.random()};
  }

}