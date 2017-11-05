import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { CanvaScene } from './shape/canva.scene';
import { CanvaRect } from './shape/canva.shape.rect';

@Component({
  selector: 'canva',
  templateUrl: './canva.component.html',
  styleUrls: ['./canva.component.css'],
  host: {
    '(window:resize)': 'onResize($event)'
  }
})
export class CanvaComponent implements AfterViewInit {
  public id:string = 'canvas1';
  public width:number = 800;
  public height:number = 400;

  @ViewChild('canva')
  private canva:ElementRef = null;
  private $canvas:HTMLCanvasElement = null;
  private ctx:CanvasRenderingContext2D = null;

  ngAfterViewInit() {
    let me = this;

    me.$canvas = me.canva.nativeElement;
    me.ctx = me.$canvas.getContext('2d');

    me.onResize()
      .draw();
  }

  draw() {
    let me = this,
      scene = new CanvaScene(me.$canvas, me.ctx, me.width, me.height);

    scene.add(new CanvaRect({
      width: 150,
      height: 150,
      lineWidth: 1,
      fillStyle: 'blue',
      draggable: true
    }));
  }

  onResize(): CanvaComponent {
    let me = this,
      $canvas = me.$canvas,
      rect = $canvas.getBoundingClientRect();

    $canvas.style.marginLeft = (window.innerWidth - rect.width)/2 + 'px';
    $canvas.style.marginTop = (window.innerHeight - rect.height)/2 + 'px';

    return me;
  }
}
