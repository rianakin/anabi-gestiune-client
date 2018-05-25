import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomeModule',
  },
  {
    path: 'assets',
    loadChildren: './assets/assets.module#AssetsModule',
  },
  {
    path: 'dictionaries',
    loadChildren: './dictionaries/dictionaries.module#DictionariesModule',
  },
  {
    path: 'reports',
    loadChildren: './reports/reports.module#ReportsModule',
  },
  {
    path: 'search',
    loadChildren: './search/search.module#SearchModule',
  },
  {
    path: '**',
    redirectTo: '/home',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, useHash: true }),
  ],
  exports: [
    RouterModule,
  ],
})
export class AppRoutingModule {}