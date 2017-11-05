import { CanvaShape } from './canva.shape';

export class CanvaRect extends CanvaShape {
  constructor(props: Object) {
    super(props);
  }

  render(ctx: CanvasRenderingContext2D) {
    let me = this;

    ctx.beginPath();
    ctx.lineWidth = me.lineWidth;
    ctx.strokeStyle = me.strokeStyle;
    ctx.rect(me.x, me.y, me.width, me.height);

    if(me.fillStyle) {
      ctx.fillStyle = me.fillStyle;
      ctx.fill();
    } else {
      ctx.stroke();
    }
  }

  clone(): CanvaRect {
    return new CanvaRect(this.props);
  }
}