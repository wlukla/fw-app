export default class Frame {
  constructor(width, height, scale) {
    this.width = width / scale;
    this.height = height / scale;
    this.borderWidth = 40 / scale;

    this.spaces = [0];

    this.imposts = [];
    this.sashes = [];

    this.scale = scale;

    this.type = null;
    this.glassType = null;
    this.color = null;
  }

  updateInputs() {
    for (let i = 0; i < this.sashes.length; i += 1) {
      this.sashes[i].input.value = this.sashes[i].width * this.sashes[i].scale;
    }
  }

  addImpost(impost) {
    const index = !this.imposts.length ? 0 : this.imposts.length;
    this.spaces.push(0);

    this.imposts[index] = impost;
    this.imposts[index].height = this.height;

    for (let i = 0; i < this.imposts.length; i += 1) {
      this.imposts[i].x = (this.width / this.spaces.length) * (i + 1);
    }

    for (let i = 0; i < this.sashes.length; i += 1) {
      if (this.sashes[i]) {
        this.sashes[i].width = this.width / this.spaces.length;
        this.sashes[i].x = this.sashes[i].width * i;
      }
    }

    this.updateInputs();
  }

  addSash(sash) {
    const space = this.spaces.indexOf(0);
    this.spaces[space] = 1;

    // inherit height
    this.sashes[space] = sash;
    this.sashes[space].height = this.height;

    // set width
    if (space === 0) {
      this.sashes[space].x = 0;
      this.sashes[space].width = this.spaces.length === 1 ? this.width : this.imposts[space].x;
    } else if (space + 1 === this.spaces.length) {
      this.sashes[space].x = this.imposts[space - 1].x;
      this.sashes[space].width = this.width - this.imposts[space - 1].x;
    } else {
      const prevX = this.imposts[space - 1].x;
      const nextX = this.imposts[space].x;

      this.sashes[space].x = prevX;
      this.sashes[space].width = nextX - prevX;
    }

    if (this.spaces.length === 1) {
      this.sashes[space].x = 0;
      this.sashes[space].width = this.width;
    }

    // add input to sash
    // const input = document.createElement('input');
    // input.setAttribute('type', 'text');
    // input.setAttribute('width', '100');
    // input.setAttribute('height', '20');
    // input.setAttribute('value', this.sashes[space].width * this.sashes[space].scale);
    // this.sashes[space].input = input;

    // inputsContainer.appendChild(this.sashes[space].input);
  }

  buildInner() {
    const frameW = this.width;
    const frameH = this.height;

    const x1 = 0 + this.borderWidth;
    const y1 = (canvasH - frameH) / 2 + this.borderWidth;
    const width = frameW - this.borderWidth * 2;
    const height = canvasH - y1 * 2;

    ctx.strokeRect(x1, y1, width, height);
  }

  buildDepth() {
    const frameW = this.width;
    const frameH = this.height;

    const x1 = 0 + this.borderWidth + 5;
    const y1 = (canvasH - frameH) / 2 + this.borderWidth + 5;
    const x2 = frameW - (this.borderWidth + 5) * 2;
    const y2 = canvasH - y1 * 2;

    ctx.strokeRect(x1, y1, x2, y2);
  }

  joinOuterDepth() {
    const frameW = this.width;
    const frameH = this.height;

    let x1 = 0;
    let y1 = (canvasH - frameH) / 2;
    let x2 = x1 + this.borderWidth + 5;
    let y2 = y1 + this.borderWidth + 5;

    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.closePath();

    x1 = frameW;
    y1 = (canvasH - frameH) / 2;
    x2 = x1 - this.borderWidth - 5;
    y2 = y1 + this.borderWidth + 5;

    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.closePath();

    x1 = frameW;
    y1 += frameH;
    x2 = x1 - this.borderWidth - 5;
    y2 = y1 - this.borderWidth - 5;

    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.closePath();

    x1 = 0;
    y1 = canvasH - (canvasH - frameH) / 2;
    x2 = x1 + this.borderWidth + 5;
    y2 = y1 - this.borderWidth - 5;

    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.closePath();
  }


}
