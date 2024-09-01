import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[mbStopPropagation]',
  standalone: true,
})
export class StopPropagationDirective {
  @HostListener('click', ['$event'])
  onClick(event: MouseEvent) {
    event.stopPropagation();
  }
}
