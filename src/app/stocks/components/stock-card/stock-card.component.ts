import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, HostBinding, input, model } from '@angular/core';
import { FormControlsModule } from '@mb/shared/form-controls';

import { Stock, STOCK_TYPE_COLOR_MAP, StockColor } from '../../models';

@Component({
  selector: 'mb-stock-card',
  standalone: true,
  imports: [CommonModule, FormControlsModule],
  templateUrl: './stock-card.component.html',
  styleUrl: './stock-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StockCardComponent {
  $stock = input.required<Stock>({ alias: 'stock' });
  $isActive = model<boolean>(true, { alias: 'isActive' });

  @HostBinding('class') get hostCSSClass(): StockColor {
    return this.$isActive() ? STOCK_TYPE_COLOR_MAP[this.$stock().statistics.type] : 'gray';
  }
}
