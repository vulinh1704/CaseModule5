import { Component, OnInit } from '@angular/core';
import {House} from "../../models/house";
import {HouseService} from "../../service/house.service";

@Component({
  selector: 'app-find-all-house',
  templateUrl: './find-all-house.component.html',
  styleUrls: ['./find-all-house.component.css']
})
export class FindAllHouseComponent implements OnInit {
  houses: House[] | any ;
  constructor(private houseService: HouseService) { }
  ngOnInit(): void {
    this.getAllHouse();
  }
  getAllHouse() {
    this.houseService.getAllHouse().subscribe(result => {
      this.houses = result.content;
      console.log(result);
    }, error => {
      console.log(error);
    })
  }
}
