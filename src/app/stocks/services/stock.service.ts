import { Injectable, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { combineLatest, filter, map, Observable, of, switchMap, tap, timer, withLatestFrom } from 'rxjs';

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
    return timer(0, 3000).pipe(
      withLatestFrom(toObservable(this.$activeStockNames)),
      filter(([_, activeStockNames]) => activeStockNames.includes(stockName)),
      switchMap(() => of(this._getStockByName(stockName))),
    );
  }

  private _getStockByName(stockName: StockName): Stock | null {
    const stockRaw = stockResponseMocks.find(({ name }) => name === stockName);
    return stockRaw ? new Stock(stockRaw) : null;
  }
}
