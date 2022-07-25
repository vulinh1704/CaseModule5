import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isCheck: any;
  constructor() { }

  ngOnInit(): void {
    if (localStorage.getItem('USERNAME') == null) {
      this.isCheck = false;
    } else {
      this.isCheck = true;
    }
  }

}
