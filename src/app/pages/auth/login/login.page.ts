import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  data: any = {
    username: '',
    password: ''
  };

  constructor(
    private router: Router,
    private authService: AuthServiceService
  ) { }

  ngOnInit() {
  }

  doConfirmar(): void {
    console.log(this.data);
    this.authService.doLogin(this.data).subscribe((result) => {
      console.log('result: ' + result);
      this.router.navigate(['home']);
    })
    this.doLimpar();
  }

  doLimpar(): void {
    this.data = {};
  }

}
