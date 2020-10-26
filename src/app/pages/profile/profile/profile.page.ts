import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserDaoService } from 'src/app/services/user/user-dao.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  private user: User = new User();

  constructor(
    private router: Router,
    private service: UserDaoService
  ) { 
  }

  ngOnInit() {
  }

  async ionViewWillEnter() {
    await this.load();
  }

  edit() {
    this.router.navigate(['profile-edit'])
  }

  goBack() {
    this.router.navigate(['home']);
  }

  async load() {
    await this.service.findUser().subscribe((user) => {
      this.user = user;
    });
  }
}
