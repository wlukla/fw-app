export default class Sash {
  constructor(scale, type) {
    this.type = type || null;
    this.width = null;
    this.height = null;
    this.x = null;

    this.padding = 10; // padding from frame border

    this.openSide = 1; // initially opens from right to left
    this.handleSide = 1; // 0 - right, 1 - left
    this.scale = scale;
    this.type = null;
  }
}
