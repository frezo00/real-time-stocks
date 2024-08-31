import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, HostBinding, input, output } from '@angular/core';

import { Stock, STOCK_TYPE_COLOR_MAP } from '../../models';

@Component({
  selector: 'mb-stock-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stock-card.component.html',
  styleUrl: './stock-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StockCardComponent {
  $stock = input.required<Stock>({ alias: 'stock' });
  $toggle = output<boolean>({ alias: 'toggle' });

  @HostBinding('class') get hostCSSClass(): string {
    return STOCK_TYPE_COLOR_MAP[this.$stock().statistics.type];
  }
}
