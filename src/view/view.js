class View {
  constructor() {
    this.frameButton = document.querySelector('.frame-button');
    this.impostButton = document.querySelector('.impost-button');
    this.sashButton = document.querySelector('.sash-button');

    this.widthInput = document.querySelector('.width');
    this.heightInput = document.querySelector('.height');
    this.borderInput = document.querySelector('.border');

    this.submitButton = document.querySelector('.submit');
    this.drawButton = document.querySelector('.draw');

    this.canvas = document.querySelector('.canvas');
    this.ctx = this.canvas.getContext('2d');

    this.inputsContainer = document.querySelector('.inputs');

    this.setDrawingLine();
    this.disableDefault();
  }

  disableDefault() {
    this.buttons = document.querySelectorAll('button');
    for (let i = 0; i < this.buttons.length; i += 1) {
      this.buttons[i].addEventListener('click', (e) => {
        e.preventDefault();
      });
    }
  }

  setDrawingLine() {
    this.ctx.strokeStyle = 'rgba(0, 0, 0, 1)';
  }

  initFrameButtonListener(callback) {
    this.frameButton.addEventListener('click', callback);
  }

  initImpostButtonListener(callback) {
    this.impostButton.addEventListener('click', callback);
  }

  initSashButtonListener(callback) {
    this.sashButton.addEventListener('click', callback);
  }

  initCanvasListener(callback) {
    this.canvas.addEventListener('click', callback);
  }

  drawImposts() {
    const { ctx, canvas } = this;

    const canvasH = canvas.height;

    for (let i = 0; i < this.imposts.length; i += 1) {
      const x = this.imposts[i].x - this.imposts[i].width / 2;
      const y = (canvasH - this.height) / 2 + this.borderWidth;
      const { width } = this.imposts[i];
      const height = this.height - this.borderWidth * 2;

      ctx.clearRect(x - 5, y + 1, width + 10, height - 2);
      ctx.strokeRect(x, y, width, height);

      // draw vertical left
      ctx.beginPath();
      ctx.moveTo(x - 5, y + 5);
      ctx.lineTo(x - 5, y + height - 5);
      ctx.stroke();
      ctx.closePath();

      // draw vertical right
      ctx.beginPath();
      ctx.moveTo(x + this.imposts[i].width + 5, y + 5);
      ctx.lineTo(x + this.imposts[i].width + 5, y + height - 5);
      ctx.stroke();
      ctx.closePath();

      // draw depth
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x - 5, y + 5);
      ctx.stroke();
      ctx.closePath();

      ctx.beginPath();
      ctx.moveTo(x + width, y);
      ctx.lineTo(x + width + 5, y + 5);
      ctx.stroke();
      ctx.closePath();

      ctx.beginPath();
      ctx.moveTo(x, y + height);
      ctx.lineTo(x - 5, y + height - 5);
      ctx.stroke();
      ctx.closePath();

      ctx.beginPath();
      ctx.moveTo(x + width, y + height);
      ctx.lineTo(x + width + 5, y + height - 5);
      ctx.stroke();
      ctx.closePath();
    }
  }

  drawSashes() {
    const { ctx, canvas } = this;
    const canvasH = canvas.height;

    for (let i = 0; i < this.sashes.length; i += 1) {
      if (this.sashes[i]) {
        const { padding } = this.sashes[i];

        const sashH = this.sashes[i].height - padding * 2;
        const sashW = this.sashes[i].width + padding - this.borderWidth;
        const x = this.borderWidth + this.sashes[i].x - padding;
        const y = (canvasH - sashH) / 2;

        ctx.clearRect(x, y, sashW - padding, sashH);

        // build outer
        ctx.strokeRect(x, y, sashW - padding, sashH);

        // build inner
        ctx.strokeRect(x + padding, y + padding,
          sashW - padding * 3, sashH - padding * 2);

        // build depth
        ctx.strokeRect(x + padding + 5, y + padding + 5,
          sashW - padding * 3 - 10, sashH - (padding + 5) * 2);

        // show depth
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + padding + 5, y + padding + 5);
        ctx.stroke();
        ctx.closePath();

        ctx.beginPath();
        ctx.moveTo(x + sashW - padding, y);
        ctx.lineTo(x + sashW - 5 - padding * 2, y + 5 + padding);
        ctx.stroke();
        ctx.closePath();

        ctx.beginPath();
        ctx.moveTo(x, y + sashH);
        ctx.lineTo(x + 5 + padding, y + sashH - 5 - padding);
        ctx.stroke();
        ctx.closePath();

        ctx.beginPath();
        ctx.moveTo(x + sashW - padding, y + sashH);
        ctx.lineTo(x + sashW - 5 - padding * 2, y + sashH - 5 - padding);
        ctx.stroke();
        ctx.closePath();

        // draw open side
        if (this.sashes[i].openSide === 1) {
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(x + sashW - padding, y + sashH / 2);
          ctx.stroke();
          ctx.closePath();

          ctx.beginPath();
          ctx.moveTo(x, y + sashH);
          ctx.lineTo(x + sashW - padding, y + sashH / 2);
          ctx.stroke();
          ctx.closePath();
        } else if (this.sashes[i].openSide === 0) {
          ctx.beginPath();
          ctx.moveTo(x, y + sashH);
          ctx.lineTo(x + sashW / 2, y);
          ctx.stroke();
          ctx.closePath();

          ctx.beginPath();
          ctx.moveTo(x + sashW - padding, y + sashH);
          ctx.lineTo(x + sashW / 2, y);
          ctx.stroke();
          ctx.closePath();
        } else if (this.sashes[i].openSide === 3) {
          ctx.beginPath();
          ctx.moveTo(x + sashW - padding, y);
          ctx.lineTo(x, y + sashH / 2);
          ctx.stroke();
          ctx.closePath();

          ctx.beginPath();
          ctx.moveTo(x + sashW - padding, y + sashH);
          ctx.lineTo(x, y + sashH / 2);
          ctx.stroke();
          ctx.closePath();
        }

        // draw handle
        if (this.sashes[i].handleSide === 1) {
          const x1 = this.sashes[i].x + this.sashes[i].width - 17.5;
          const y1 = canvasH / 2 - 5;

          ctx.strokeRect(x1, y1, 5, 10);
        }
      }
    }
  }

  buildOuter() {
    const { ctx, canvas } = this;
    const canvasH = canvas.height;

    const frameW = this.width;
    const frameH = this.height;

    const x1 = 0;
    const y1 = (canvasH - frameH) / 2;
    const width = frameW;
    const height = canvasH - y1 * 2;

    ctx.strokeRect(x1, y1, width, height);
  }

  draw() {
    const { ctx, canvas } = this;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#000000';

    this.buildOuter();
    this.buildInner();
    this.buildDepth();
    this.joinOuterDepth();
    this.drawImposts();
    this.drawSashes();
  }
}

export default View;
