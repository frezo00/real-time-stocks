import { ChangeDetectionStrategy, Component, HostBinding, HostListener, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StopPropagationDirective } from '@mb/shared/common';

import { AbstractValueAccessor, controlProvider } from '../../utils';

@Component({
  selector: 'mb-switch',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './switch.component.html',
  styleUrl: './switch.component.scss',
  providers: [controlProvider(SwitchComponent)],
  hostDirectives: [StopPropagationDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SwitchComponent extends AbstractValueAccessor<boolean> {
  $onText = input('on', { alias: 'onText' });
  $offText = input('off', { alias: 'offText' });

  @HostBinding('tabIndex') tabIndex = 0;
  @HostBinding('class.active') get isActive(): boolean {
    return !!this.$value();
  }

  @HostListener('keydown', ['$event'])
  onKeydown($event: KeyboardEvent): void {
    if ($event.key === 'Enter') {
      this.writeValue(!this.$value());
    }
  }
}
