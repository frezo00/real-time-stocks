import { NgModule } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Stock, StockResponse } from '../models';
import { StockService } from '../services';

export const stockResponseMocks: StockResponse[] = [
  {
    name: 'AAPL',
    price: 229.1,
    dayLowPrice: 227.48,
    dayHighPrice: 230.4,
    week52LowPrice: 164.08,
    week52HighPrice: 237.23,
  },
  {
    name: 'GOOG',
    price: 165.11,
    dayLowPrice: 163.41,
    dayHighPrice: 165.25,
    week52LowPrice: 121.46,
    week52HighPrice: 193.31,
  },
  {
    name: 'MSFT',
    price: 417.14,
    dayLowPrice: 412.13,
    dayHighPrice: 417.45,
    week52LowPrice: 309.45,
    week52HighPrice: 278.98,
  },
  {
    name: 'TSLA',
    price: 214.11,
    dayLowPrice: 207.03,
    dayHighPrice: 214.57,
    week52LowPrice: 138.8,
    week52HighPrice: 237.23,
  },
];

export const stockMocks = stockResponseMocks.map((stockResponse) => new Stock(stockResponse));

const stockServiceMock = <StockService>{
  getStocks$(): Observable<Stock[]> {
    return of(stockMocks);
  },
};

@NgModule({
  providers: [{ provide: StockService, useValue: stockServiceMock }],
})
export class StockMockModule {}
