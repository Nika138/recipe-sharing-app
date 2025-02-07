import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Output,
} from '@angular/core';

@Directive({
  selector: '[clickOutside]',
  standalone: true,
})
export class ClickOutsideDirective {
  // define an Output property to emit an event when a click happens outside the element
  @Output() clickOutside = new EventEmitter<void>();

  // constructor with a private parameter of type ElementRef, which will allow us to access the DOM element
  constructor(private elementRef: ElementRef) {}

  // hostListener listens to a 'click' event on the document and receives the target element of the click
  @HostListener('document:click', ['$event.target'])
  public onClick(targetElement: HTMLElement) {
    const clickedInside = this.elementRef.nativeElement.contains(targetElement);
    if (!clickedInside) {
      this.clickOutside.emit();
    }
  }
}
