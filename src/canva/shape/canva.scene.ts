import { CanvaShape } from './canva.shape';

export class CanvaScene {
  private objects = [];
  private draggable = [];
  private _dragging: CanvaShape;

  constructor(
    private $canvas: HTMLCanvasElement,
    private ctx: CanvasRenderingContext2D,
    public width: number,
    public height: number
  ) {
    this.bindDrag();
  }

  add(object: CanvaShape) {
    let me = this;
    me.objects.push(object);
    me.render();

    if(object.draggable) {
      me.addDraggable(object);
    }
  }

  render() {
    let me = this;
    me.ctx.clearRect(0, 0, me.width, me.height);
    me.objects.forEach((obj) => {
      obj.render(me.ctx);
    });
  }

  private addDraggable(object: CanvaShape) {
    let clone: CanvaShape = object.clone();
    clone.draggable = false;
    object.fillStyle = '';
    object['_clone'] = clone;

    this.add(clone);
    this.draggable.push(object);
  }

  private bindDrag() {
    let me = this,
      $canvas = me.$canvas,
      drag = false,
      sx, sy,
      cur;

    $canvas.addEventListener('mousedown', (e) => {
      saveStartPoint(cur = getCanvasPoint(e));
      drag = me.getDraggable(cur.x, cur.y);
    });

    $canvas.addEventListener('mouseup', (e) => {
      if(drag) {
        drag = false;
        me.dragStop();
      }
    });

    $canvas.addEventListener('mousemove', (e) => {
      if(drag) {
        cur = getCanvasPoint(e);
        me.drag(cur.x, cur.y, cur.x - sx, cur.y - sy);
        saveStartPoint(cur);
      }
    });

    function getCanvasPoint(e) {
      var rect = $canvas.getBoundingClientRect(),
        scaleX = $canvas.width / rect.width,
        scaleY = $canvas.height / rect.height;

      return {
        x: (e.clientX - rect.left)*scaleX,
        y: (e.clientY - rect.top)*scaleY
      };
    }

    function saveStartPoint(cur) {
      sx = cur.x;
      sy = cur.y;
      return cur;
    }
  }

  private getDraggable(pageX: number, pageY: number): boolean {
    let me = this;
    me.draggable.forEach(function(object) {
      if(me.objectInPosition(pageX, pageY, object)) {
        me._dragging = object;
        return false;
      }
    });

    return !!me._dragging;
  }

  private objectInPosition(pageX: number, pageY: number, object: CanvaShape) {
    let x = object.x,
      y = object.y,
      w = object.width,
      h = object.height;

    return (pageX > x && pageX < (x + w)) &&
      (pageY > y && pageY < (y + h));
  }

  private drag(pageX: number, pageY: number, dx: number, dy: number) {
    let me = this;

    if(me._dragging) {
      move(me._dragging);
      me.render();
    }

    function move(object) {
      object.x += dx;
      object.y += dy;
    }
  }

  private dragStop() {
    let me = this;
    me._dragging = null;
    me.draggable.forEach(function(object) {
      object['_clone'].set({
        x: object.x,
        y: object.y
      })
    });
    me.render();
  }
}