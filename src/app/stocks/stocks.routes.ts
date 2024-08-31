import { Routes } from '@angular/router';

import { StockService } from './services';

export const stockRoutes: Routes = [
  {
    path: '',
    providers: [StockService],
    children: [
      {
        path: '',
        pathMatch: 'full',
        loadComponent: () => import('./stocks.component').then((c) => c.StocksComponent),
      },
    ],
  },
];
