import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-foods',
  templateUrl: './foods.page.html',
  styleUrls: ['./foods.page.scss'],
})
export class FoodsPage implements OnInit {

  constructor(
    private router:Router
  ) { }

  ngOnInit() {
  }

  edit() {
    console.log('Editar clicado')
  }

  add() {
    this.router.navigate(['food'])
  }

}
