import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StopPropagationDirective } from './stop-propagation.directive';

@Component({
  standalone: true,
  imports: [StopPropagationDirective],
  template: `<button nsStopPropagation (click)="onClick()">Click me</button>`,
})
class StopPropagationTestComponent {
  onClick(): void {}
}

describe('StopPropagationDirective', () => {
  let fixture: ComponentFixture<StopPropagationTestComponent>;
  let component: StopPropagationTestComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StopPropagationTestComponent],
    }).runInInjectionContext(() => {
      fixture = TestBed.createComponent(StopPropagationTestComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
