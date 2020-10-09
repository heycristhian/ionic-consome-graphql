import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FoodPageRoutingModule } from './food-routing.module';

import { FoodPage } from './food.page';
import { Router } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FoodPageRoutingModule
  ],
  declarations: [FoodPage]
})
export class FoodPageModule {
 
}
