import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { TotalCalorie } from 'src/app/models/total-calorie';
import { DiaryDaoService } from 'src/app/services/diaries/diary-dao.service';

@Component({
  selector: 'app-diaries',
  templateUrl: './diaries.page.html',
  styleUrls: ['./diaries.page.scss'],
})
export class DiariesPage implements OnInit {

  private totalCalorie: TotalCalorie[] = [];

  constructor(
    private router: Router,
    private service: DiaryDaoService
  ) { }

  ngOnInit() {
  }

  async ionViewWillEnter() {
    setTimeout(() => {
      this.load();
    }, 500);
  }

  async load() {
    this.service.totalCalories()
      .subscribe((total) => {
        total.sort((a, b) => (a.date > b.date ? -1 : 1));
        this.totalCalorie = total;
      });
  }

  addNew() {
    this.router.navigate(['diary'])
  }

  async doRefresh(event) {
    this.totalCalorie = [];
    this.load()
      .then(() => {
        setTimeout(() => {
          event.target.complete();
        }, 1000);
      });
  }

  navigateFoodDetail(date: string) {
    
    const extras: NavigationExtras = {
      queryParams: {
        date: date 
      }
    };
    
    this.router.navigate(['diary-detail'], extras);
  }

}
