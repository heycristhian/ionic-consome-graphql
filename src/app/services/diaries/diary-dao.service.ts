import { Injectable } from '@angular/core';
import { Diary } from 'src/app/models/diary';
import { Storage } from "@ionic/storage";
import { env } from 'src/app/environments/environments';
import { from } from 'rxjs';
import { TotalCalorie } from 'src/app/models/total-calorie';
import { Observable } from 'rxjs/internal/Observable';
import { DiaryInfo } from 'src/app/models/domain/DiaryInfo';

@Injectable({
  providedIn: 'root'
})
export class DiaryDaoService {

  private totalCalorie: TotalCalorie[] = [];
  private diaryInfo: DiaryInfo;

  totalCalories(): Observable<TotalCalorie[]>{
    const observable = from(this.dataTotalCalories());
    return observable;
  }

  async dataTotalCalories(): Promise<TotalCalorie[]> {
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
            totalCalorie(userId:"${id}") {
              recommendedCalorie, total, date    
             }
          }
        `
      })
    })
    .then(res => res.json())
    .then(data => {
      this.totalCalorie = data.data.totalCalorie;
      console.log(this.totalCalorie)
      return this.totalCalorie
    });
    return this.totalCalorie
  }

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

  diaryInfoObservable(date: Date): Observable<DiaryInfo>{
    const observable = from(this.getDiaryInfo(date));
    return observable;
  }


  private async getDiaryInfo(date: Date): Promise<DiaryInfo> {
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
        query { diaryInfo(userId:"${id}", date: "${date}") {diaryDetail { date, protein, carbohydrate, fat, calorie, recommendedCalorie }, diaries { id, date, portion, protein, carbohydrate, fat, calories, menu, food { name } } }}
        `
      })
    })
    .then(res => res.json())
    .then(data => {
      this.diaryInfo = data.data.diaryInfo;
      console.log('this.diaryInfo')
      console.log(this.diaryInfo)
      return this.diaryInfo
    });
    return this.diaryInfo
  }
}
