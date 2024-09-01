import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockMockModule } from './mocks';
import { StocksComponent } from './stocks.component';

describe('StocksComponent', () => {
  let component: StocksComponent;
  let fixture: ComponentFixture<StocksComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StocksComponent, StockMockModule],
    }).runInInjectionContext(() => {
      fixture = TestBed.createComponent(StocksComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
