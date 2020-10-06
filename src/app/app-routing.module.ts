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
  {
    path: 'foods',
    loadChildren: () => import('./food/foods/foods.module').then( m => m.FoodsPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'profile-edit',
    loadChildren: () => import('./profile/profile-edit/profile-edit.module').then( m => m.ProfileEditPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
