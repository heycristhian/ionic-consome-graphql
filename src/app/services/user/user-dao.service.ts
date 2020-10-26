import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { from } from 'rxjs/internal/observable/from';
import { env } from 'src/app/environments/environments';
import { User } from 'src/app/models/user';
import { Storage } from "@ionic/storage";

@Injectable({
  providedIn: 'root'
})
export class UserDaoService {

  user: User = new User;

  constructor(
    private storage: Storage
  ) { }

  findUser(): Observable<User> {
    const observable = from(this.findUserById());
    return observable;
  }

  async findUserById(): Promise<User> {
    let authRequest = await this.storage.get("auth-data")
    let token: string = "Bearer " + authRequest['token'];
    let id: string = authRequest['userId'];

    fetch(env.url('graphql'), {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Authorization": token
      },
      body: JSON.stringify({
        query: `
          query {
            user(id:"${id}") {
              username, age, height, weight, recommendedCalories
            }
          }
        `
      })
    })
      .then(res => res.json())
      .then(data => {
        this.user = data.data.user;
        console.log(this.user)
        return this.user
      });
    return this.user
  }
}
