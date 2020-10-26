import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Diary } from 'src/app/models/diary';
import { Food } from 'src/app/models/food';
import { DiaryDaoService } from 'src/app/services/diaries/diary-dao.service';
import { FoodDaoService } from 'src/app/services/foods/food-dao.service';

@Component({
  selector: 'app-diary',
  templateUrl: './diary.page.html',
  styleUrls: ['./diary.page.scss'],
})
export class DiaryPage implements OnInit {

  private foods: Food[] = [];
  private diary: Diary = new Diary();

  private data: any = {}

  constructor(
    private router: Router,
    private foodService: FoodDaoService,
    private diaryService: DiaryDaoService,
    private toastController: ToastController,
  ) { }

  ngOnInit() {
  }

  async ionViewWillEnter() {
    await this.loadFoods();
  }

  cancel() {
    this.router.navigate(['diaries'])
  }

  async loadFoods() {
    this.foodService.findAll().subscribe((foods) => {
      this.foods = [];
      this.foods = foods.reverse();
    });
  }

  changeFood(event) {
    this.diary.foodId = event.detail.value;
  }

  changeMenu(event) {
    this.diary.menu = event.detail.value;
  }

  save() {
    this.diaryService.save(this.diary).then(() => {
      this.presentToast("Diary saved successfully");
      this.toClean();
      this.router.navigate(['diaries']);
    })
  }

  private async presentToast(message: any) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: "bottom",
    });
    toast.present();
  }

  toClean(): void {
    this.diary.foodId = '';
    this.diary.menu = '';
    this.diary.portion = 0;
    this.diary.userId = '';
  }
}
