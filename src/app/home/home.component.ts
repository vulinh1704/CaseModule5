import { Component, OnInit } from '@angular/core';
import {House} from "../model/house";
import {HouseServiceService} from "../service/house-service.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  houses: House[] = [];
  constructor(private houseServiceService: HouseServiceService) {
  }

  ngOnInit(): void {
    this.showAll();
  }

  showAll() {
    this.houseServiceService.findAll().subscribe((houses) => {
      this.houses = houses;

      console.log('house', houses);
    }, error => {
      console.log(error);
    })
  }
}
