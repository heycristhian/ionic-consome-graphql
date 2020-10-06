import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'diaries',
    loadChildren: () => import('./diary/diaries/diaries.module').then( m => m.DiariesPageModule)
  },
  {
    path: 'diary',
    loadChildren: () => import('./diary/diary/diary.module').then( m => m.DiaryPageModule)
  },
  {
    path: 'food',
    loadChildren: () => import('./food/food/food.module').then( m => m.FoodPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
