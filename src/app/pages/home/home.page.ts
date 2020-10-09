import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth/auth-service.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    private router: Router,
    private authRequest: AuthServiceService
    ) {}

  navigateToFoods() {
    this.router.navigate(['foods']);
  }

  navigateToProfile() {
    this.router.navigate(['profile']);
  }

  navigateToDiaries() {
    this.router.navigate(['diaries']);
  }

  async doSair() {
    await this.authRequest.doLogout();
    this.router.navigate(["login"]);
  }
}
