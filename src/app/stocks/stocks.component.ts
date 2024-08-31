import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { StockCardComponent } from './components';
import { StockName } from './models';
import { StockService } from './services';

@Component({
  standalone: true,
  imports: [StockCardComponent],
  templateUrl: './stocks.component.html',
  styleUrl: './stocks.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StocksComponent {
  readonly #stockService = inject(StockService);

  readonly $stocks = toSignal(this.#stockService.getStocks$(), { initialValue: [] });

  onStockToggle(isActive: boolean, stockName: StockName): void {
    const activeStockNames = [...this.#stockService.$activeStockNames()];
    const updatedActiveStockNames = isActive
      ? [...activeStockNames, stockName]
      : activeStockNames.filter((name) => name !== stockName);
    this.#stockService.$activeStockNames.set(updatedActiveStockNames);
  }
}
