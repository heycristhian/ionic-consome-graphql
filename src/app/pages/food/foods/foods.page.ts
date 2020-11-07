import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Food } from 'src/app/models/food';
import { FoodDaoService } from 'src/app/services/foods/food-dao.service';

@Component({
  selector: 'app-foods',
  templateUrl: './foods.page.html',
  styleUrls: ['./foods.page.scss'],
})
export class FoodsPage implements OnInit {

  private foods: Food[] = [];

  constructor(
    private router: Router,
    private service: FoodDaoService,
    private toastController: ToastController
  ) { }

  ngOnInit() {
  }

  async ionViewWillEnter() {
    await this.load();
  }

  async load() {
    this.service.findAll().subscribe((foods) => {
      this.foods = [];
      this.foods = foods.reverse();
    });
  }

  async edit(food: Food) {
    const extras: NavigationExtras = {
      queryParams: {
        id: food.id,
        name: food.name,
        protein: food.protein,
        carbohydrate: food.carbohydrate,
        fat: food.fat,
        portion: food.portion
      }
    };

    this.router.navigate(['food'], extras);
  }

  async delete(food: Food) {
    this.service.delete(food.id).then((value) => {
      this.presentToast("Food successfully removed");
      this.foods = this.foods.filter(f => f.name != food.name);
    });
  }

  add() {
    this.router.navigate(['food'])
  }

  private async presentToast(message: any) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: "bottom",
    });
    toast.present();
  }

  async doRefresh(event) {
    this.foods = [];
    this.load()
      .then(() => {
        setTimeout(() => {
          event.target.complete();
        }, 1000);
      });
  }
}
