

export class CanvaShape {
  public lineWidth: number = 2;
  public strokeStyle: string = 'blue';
  public fillStyle: string = '';
  public width: number = 150;
  public height: number = 150;
  public x: number = 50;
  public y: number = 50;
  public draggable: boolean = false;

  constructor(protected props: Object) {
    this.set(props);
  }

  set(props: Object) {
    let me = this;
    Object.keys(props).forEach((prop) => {
      me[prop] = props[prop];
    });
  }

  clone(): CanvaShape {
    return new CanvaShape(this.props);
  }

  render(ctx: CanvasRenderingContext2D) {
  }
}