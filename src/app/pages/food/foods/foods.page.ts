import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    private router:Router,
    private service: FoodDaoService,
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.doCarregar();
  }

  doCarregar() {
    this.service.findAll().subscribe((foods) => {
      this.foods = foods;
    });
  }

  async edit() {
    console.log('editar clicado');
  }

  add() {
    this.router.navigate(['food'])
  }

}
