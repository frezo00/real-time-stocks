export const stockNames = ['AAPL', 'GOOG', 'MSFT', 'TSLA'] as const;

export type StockName = (typeof stockNames)[number];

export type StockType = 'lower' | 'higher' | 'neutral';

export const STOCK_TYPE_COLOR_MAP: Record<StockType, 'red' | 'green' | 'gray'> = {
  lower: 'red',
  higher: 'green',
  neutral: 'gray',
};

export type StockResponse = {
  name: StockName;
  price: number;
  dayLowPrice: number;
  dayHighPrice: number;
  week52LowPrice: number;
  week52HighPrice: number;
};

export class Stock {
  name: StockName;
  price: number;
  day: DateRangePrice;
  week52: DateRangePrice;
  statistics: StockStatistics;

  constructor(stock: StockResponse) {
    const { name, price, dayLowPrice, dayHighPrice, week52LowPrice, week52HighPrice } = stock;

    this.name = name;
    this.price = price + (Math.random() * 10 - 5);
    this.day = new DateRangePrice(dayLowPrice, dayHighPrice);
    this.week52 = new DateRangePrice(week52LowPrice, week52HighPrice);
    this.statistics = new StockStatistics(dayLowPrice, this.price);
  }
}

export class StockStatistics {
  #priceDiff: number;
  #percentageDiff: number;
  type: StockType;
  priceDiff: string;
  percentageDiff: string;

  constructor(startPrice: number, endPrice: number) {
    this.#priceDiff = startPrice - endPrice;
    this.#percentageDiff = (this.#priceDiff / (startPrice || 1)) * 100;
    this.type = this.#priceDiff ? (this.#priceDiff < 0 ? 'lower' : 'higher') : 'neutral';
    this.priceDiff = this.#addPrefix(this.#priceDiff);
    this.percentageDiff = `${this.#addPrefix(this.#percentageDiff)}%`;
  }

  #addPrefix(value: number, decimal = 2): string {
    const prefix = this.type === 'higher' ? '+' : '';
    return `${prefix}${value.toFixed(decimal)}`;
  }
}

class DateRangePrice {
  constructor(
    public low: number,
    public high: number,
  ) {}
}
