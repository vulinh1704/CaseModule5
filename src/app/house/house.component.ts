import {Component, OnInit} from '@angular/core';
import {House} from "../model/house";
import {HouseServiceService} from "../service/house-service.service";

@Component({
  selector: 'app-house',
  templateUrl: './house.component.html',
  styleUrls: ['./house.component.css']
})
export class HouseComponent implements OnInit {
  houses: House[] = [];
  house: any;

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
