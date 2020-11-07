import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DiaryInfo } from 'src/app/models/domain/DiaryInfo';
import { DiaryDaoService } from 'src/app/services/diaries/diary-dao.service';

@Component({
  selector: 'app-diary-detail',
  templateUrl: './diary-detail.page.html',
  styleUrls: ['./diary-detail.page.scss'],
})
export class DiaryDetailPage implements OnInit {

  private data: any = {};
  private diaryInfo: any = {};
  private teste = ['teste', 'teste2', 'teste3'];

  constructor(
    private route: ActivatedRoute,
    private service: DiaryDaoService,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      if (params && Object.keys(params).length > 0) {
        this.data = Object.assign({}, params);
      }
    });
  }

  async ionViewWillEnter() {
    setTimeout(() => {
      this.load();
    }, 500);
  }

  async load() {
    this.service.diaryInfoObservable(this.data.date)
      .subscribe((diaryInfo) => {
        this.diaryInfo = diaryInfo;
        console.log('diaryInfo.diaries');
        console.log(diaryInfo?.diaries);
      });
  }

  async doRefresh(event) {
    this.load()
      .then(() => {
        setTimeout(() => {
          event.target.complete();
        }, 1000);
      });
  }

  goBack() {
    this.router.navigate(['diaries']);
  }

}
