import { Component, OnInit } from '@angular/core';
import {House} from "../../models/house";
import {HouseService} from "../../service/house.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-top5',
  templateUrl: './top5.component.html',
  styleUrls: ['./top5.component.css']
})
export class Top5Component implements OnInit {
  houses: House[] | any ;
  constructor(private houseService: HouseService,
              private router: Router) { }

  ngOnInit(): void {
    this.getTop5();
  }
  getTop5(){
    this.houseService.getTop5().subscribe(result => {
      this.houses = result;
    }, error => {
      console.log("error");
    })
  }

}
