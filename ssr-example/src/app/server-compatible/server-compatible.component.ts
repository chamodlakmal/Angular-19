import {
  afterNextRender,
  afterRender,
  AfterViewInit,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
@Component({
  selector: 'app-server-compatible',
  imports: [],
  templateUrl: './server-compatible.component.html',
  styleUrl: './server-compatible.component.css',
})
export class ServerCompatibleComponent implements AfterViewInit {
  @ViewChild('content') contentRef!: ElementRef;

  constructor() {
    //console.log(
    //  'content height: ' + this.contentRef.nativeElement.scrollHeight
    //);
    //afterNextRender(() => {
    //  // Safe to check `scrollHeight` because this will only run in the browser, not the server.
    //  console.log(
    //    'content height: ' + this.contentRef.nativeElement.scrollHeight
    //  );
    //});

    afterRender(() => {
      // Safe to check `scrollHeight` because this will only run in the browser, not the server.
      console.log(
        'content height: ' + this.contentRef.nativeElement.scrollHeight
      );
    });
  }

  ngAfterViewInit() {
    // Safe to check `scrollHeight` because this will only run in the browser, not the server.
    console.log(
      'content height: ' + this.contentRef.nativeElement.scrollHeight
    );
  }
}
