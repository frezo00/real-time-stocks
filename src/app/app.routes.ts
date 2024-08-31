import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'stocks',
  },
  {
    path: 'stocks',
    loadChildren: () => import('@mb/stocks').then((m) => m.stockRoutes),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
