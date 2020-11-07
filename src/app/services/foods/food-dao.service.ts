import { Injectable } from '@angular/core';
import { Food } from 'src/app/models/food';
import { env } from '../../environments/environments';
import { Storage } from "@ionic/storage";
import { from, Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class FoodDaoService {
  private foods: Food[] = [];

  constructor(
    private storage: Storage
  ) { }

  findAll(): Observable<Food[]> {
    const observable = from(this.dataFindAll());
    return observable;
  }

  async delete(id: string): Promise<boolean> {
    let validateDelete = false;
    let authRequest = await this.storage.get("auth-data")
    let token: string = "Bearer " + authRequest['token'];

    fetch(env.url('graphql'), {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Authorization": token
      },
      body: JSON.stringify({
        query: `
          mutation {
            deleteFood(id:"${id}")
          }
        `
      })
    })
    .then(res => res.json())
    .then(data => {
      validateDelete = data.deleteFood;
      return validateDelete;
    });
    return validateDelete;
  }

  async save(food: Food): Promise<void> {
    let authRequest = await this.storage.get("auth-data")
    let token: string = "Bearer " + authRequest['token'];

    fetch(env.url('graphql'), {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Authorization": token
      },
      body: JSON.stringify({
        query: `
          mutation {
            saveFood(foodInput: {
              id:"${food.id}"
              name:"${food.name}"
              protein:${food.protein}
              carbohydrate:${food.carbohydrate}
              fat:${food.fat}
              portion:${food.portion}
            }) {
              name, protein, carbohydrate, fat, portion
            }
          }
        `
      })
    })
    .then(res => res.json())
    .then(data => {
      console.log('data');
      console.log(data);
    });
  }

  async dataFindAll(): Promise<Food[]> {
    let authRequest = await this.storage.get("auth-data")
    let token: string = "Bearer " + authRequest['token'];

    fetch(env.url('graphql'), {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Authorization": token
      },
      body: JSON.stringify({
        query: `
          query {
            foods {
              id, name, protein, carbohydrate, fat, portion
            }
          }
        `
      })
    })
    .then(res => res.json())
    .then(data => {
      this.foods = data.data.foods;
      console.log(this.foods)
      return this.foods
    });
    return this.foods
  }
}

