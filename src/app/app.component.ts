import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'loginjwt';
  isCheck: any;
  houses: any
  constructor() {
  }

  ngOnInit(): void {
    if (localStorage.getItem('USERNAME') == null) {
      this.isCheck = false;
    } else {
      this.isCheck = true;
    }
  }
}
