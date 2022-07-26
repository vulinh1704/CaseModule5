import {Component, OnInit} from '@angular/core';
import {House} from "../model/house";
import {HouseServiceService} from "../service/house-service.service";
import {ImageService} from "../service/image.service";
import {ActivatedRoute, ParamMap} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  houses: House[] = [];
  image:any;
  images: any[] = [];
  constructor(private houseServiceService: HouseServiceService,
              private imageService: ImageService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.showAll();
  }


  showAll() {
    this.houseServiceService.findAll().subscribe((houses) => {
      this.houses = houses;
      for (let i = 0 ; i < houses.length; i++)
      this.imageService.findByIdHouse(houses[i].id).subscribe((image) => {
        this.images.push(image.image);
      }, error => {
        console.log(error)
      })
      console.log('house', houses)
    }, error => {
      console.log(error);
    })
  }
}
