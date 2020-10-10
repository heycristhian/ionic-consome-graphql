import { HttpClient } from '@angular/common/http';
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
    private http: HttpClient,
    private storage: Storage
  ) { }

  /*
  async findAll(): Promise<Food[]> {
    let authRequest = await this.storage.get("auth-data")
    let token: string = "Bearer " + authRequest['token'];

    fetch(env.url('graphql'), {
      method: 'POST',
      headers: {"Content-Type": "application/json",
                "Authorization": token},
      body: JSON.stringify({
        query: `
          query {
            foods {
              name, protein, carbohydrate, fat, portion
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
    return this.foods;
  }*/

  findAll(): Observable<Food[]> {
    const observable = from(this.data());
    return observable;
  }

  async data(): Promise<Food[]> {
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
              name, protein, carbohydrate, fat, portion
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

