import { Injectable } from '@angular/core';
import { Diary } from 'src/app/models/diary';
import { Storage } from "@ionic/storage";
import { env } from 'src/app/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class DiaryDaoService {

  constructor(
    private storage: Storage
  ) { }

  teste() {
    console.log('teste');
  }

  async save(diary: Diary): Promise<void> {
    let authRequest = await this.storage.get("auth-data")
    let token: string = "Bearer " + authRequest['token'];
    let userId: string = authRequest['userId'];

    fetch(env.url('graphql'), {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Authorization": token
      },
      body: JSON.stringify({
        query: `
          mutation {
            saveDiary(diaryInput: {
              portion:${diary.portion}
              foodId:"${diary.foodId}"
              menu:"${diary.menu}"
              userId:"${userId}"
            }) {
              date, portion, protein, carbohydrate, fat, calories, menu
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
}
