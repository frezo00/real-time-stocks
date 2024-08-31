import { ComponentFixture, TestBed } from '@angular/core/testing';

import { stockMocks } from '../../mocks';
import { StockCardComponent } from './stock-card.component';

describe('StockCardComponent', () => {
  let component: StockCardComponent;
  let fixture: ComponentFixture<StockCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StockCardComponent],
    }).runInInjectionContext(() => {
      fixture = TestBed.createComponent(StockCardComponent);
      fixture.componentRef.setInput('stock', stockMocks[0]);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
