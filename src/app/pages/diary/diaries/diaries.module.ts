import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DiariesPageRoutingModule } from './diaries-routing.module';

import { DiariesPage } from './diaries.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DiariesPageRoutingModule
  ],
  declarations: [DiariesPage]
})
export class DiariesPageModule {}
