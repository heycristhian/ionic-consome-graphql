import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './services/guards/auth-guard.service';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'diaries',
    loadChildren: () => import('./pages/diary/diaries/diaries.module').then( m => m.DiariesPageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'diary',
    loadChildren: () => import('./pages/diary/diary/diary.module').then( m => m.DiaryPageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'food',
    loadChildren: () => import('./pages/food/food/food.module').then( m => m.FoodPageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'foods',
    loadChildren: () => import('./pages/food/foods/foods.module').then( m => m.FoodsPageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile/profile.module').then( m => m.ProfilePageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'profile-edit',
    loadChildren: () => import('./pages/profile/profile-edit/profile-edit.module').then( m => m.ProfileEditPageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/auth/login/login.module').then( m => m.LoginPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
