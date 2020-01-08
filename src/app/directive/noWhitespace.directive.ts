
import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[NoWhitespace]'
})
export class NoWhitespace {

  constructor(private el: ElementRef) { }

  @Input() NoWhitespace: boolean;

  @HostListener('keydown', ['$event']) onKeyDown(event) {
    const e = <KeyboardEvent> event;
    if (this.NoWhitespace) {
      if (e.keyCode === 32) {
          e.preventDefault();
      }
    }
  }
}
