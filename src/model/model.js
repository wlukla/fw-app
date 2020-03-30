class Model {
  constructor() {
    this.frame = null;
    this.tool = 0;
  }

  addFrame(frame) {
    this.frame = frame;
  }

  addImpost(impost) {
    this.frame.addImpost(impost);
  }

  addSash(sash) {
    this.frame.addSash(sash);
  }
}

export default Model;
