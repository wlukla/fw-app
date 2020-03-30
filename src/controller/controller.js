/* eslint-disable no-else-return */
import Frame from '../model/frame';
import Impost from '../model/impost';
import Sash from '../model/sash';

class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    const frameButtonHandler = () => {
      this.model.tool = 0;
    };

    const impostButtonHandler = () => {
      this.model.tool = 1;
    };

    const sashButtonHandler = () => {
      this.model.tool = 2;
    };

    const canvasHandler = () => {
      const { tool } = this.model;
      if (tool === 1) {
        this.model.addImpost(new Impost());
      } if (tool === 2) {
        this.model.addSash(new Sash());
      }
      this.model.frame.draw();
    };

    this.init = () => {
      this.model.addFrame(new Frame());
      this.view.initFrameButtonListener(frameButtonHandler);
      this.view.initImpostButtonListener(impostButtonHandler);
      this.view.initSashButtonListener(sashButtonHandler);
      this.view.initCanvasListener(canvasHandler);
    };
  }
}

export default Controller;
