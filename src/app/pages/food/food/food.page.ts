import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Food } from 'src/app/models/food';
import { FoodDaoService } from 'src/app/services/foods/food-dao.service';

@Component({
  selector: 'app-food',
  templateUrl: './food.page.html',
  styleUrls: ['./food.page.scss'],
})
export class FoodPage implements OnInit {

  private data: any = {};

  constructor(
    private router: Router,
    private service: FoodDaoService,
    private toastController: ToastController,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      if (params && Object.keys(params).length > 0) {
        this.data = Object.assign({}, params);
      }
    });
  }

  cancel() {
    this.router.navigate(['foods']);
  }

  save(): void {
    const food: Food = Food.parse(this.data);
    console.log('id:' + food.id);
    food.toString();

    this.service.save(food).then((food) => {
      this.presentToast("Food saved successfully");
      this.toClean();
      this.router.navigate(['foods']);
    });
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
    this.data = {};
  }

}
