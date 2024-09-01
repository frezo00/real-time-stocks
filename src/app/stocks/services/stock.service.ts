import { Injectable, signal } from '@angular/core';
import { combineLatest, filter, map, Observable, of, switchMap, tap, timer } from 'rxjs';

import { stockResponseMocks } from '../mocks';
import { Stock, StockName, stockNames } from '../models';

@Injectable()
export class StockService {
  readonly $activeStockNames = signal<readonly StockName[]>([]);

  getStocks$(): Observable<Stock[]> {
    return this._getAvailableStockNames$().pipe(
      switchMap((stockNames) => {
        const stockStreams$ = stockNames.map((stockName) => this._getStockData$(stockName));
        return combineLatest(stockStreams$);
      }),
      map((stocks) => stocks.filter((stock) => !!stock)),
    );
  }

  private _getAvailableStockNames$(): Observable<readonly StockName[]> {
    return of(stockNames).pipe(tap((availableStockNames) => this.$activeStockNames.set(availableStockNames)));
  }

  private _getStockData$(stockName: StockName): Observable<Stock | null> {
    return timer(0, 2000).pipe(
      filter(() => this.$activeStockNames().includes(stockName)),
      switchMap(() => of(this._getMockStockByName(stockName))),
    );
  }

  // Mocks API call
  private _getMockStockByName(stockName: StockName): Stock | null {
    const stockRaw = stockResponseMocks.find(({ name }) => name === stockName);
    return stockRaw ? new Stock(stockRaw) : null;
  }
}
