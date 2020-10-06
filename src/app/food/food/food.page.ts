import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-food',
  templateUrl: './food.page.html',
  styleUrls: ['./food.page.scss'],
})
export class FoodPage implements OnInit {

  constructor(
    private router: Router
  ) {

  }

  cancel() {
    this.router.navigate(['foods']);
  }

  ngOnInit() {
  }

}
