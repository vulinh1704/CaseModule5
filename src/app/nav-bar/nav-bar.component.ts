import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../service/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  isCheck: any;
  username = localStorage.getItem('USERNAME');
  id: any = localStorage.getItem('ID');
  constructor(private authenticationService: AuthenticationService,
              private router: Router) {
  }

  ngOnInit(): void {
    if (localStorage.getItem('USERNAME') == null) {
      this.isCheck = false;
    } else {
      this.isCheck = true;
    }
  }

  logout(){
    this.authenticationService.logout();
    window.location.replace('http://localhost:4200');
  }

}
