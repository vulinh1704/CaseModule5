import {Component, OnInit} from '@angular/core';
import {House} from "../model/house";
import {HouseServiceService} from "../service/house-service.service";
import {ImageService} from "../service/image.service";
import {ActivatedRoute, ParamMap} from "@angular/router";
import * as stream from "stream";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  houses: House[] = [];
  image: any;
  images: any[] = [];

  constructor(private houseServiceService: HouseServiceService,
              private imageService: ImageService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.showAll();
    this.showTop5();
  }


  showAll() {
    this.houseServiceService.findAll().subscribe((houses) => {
      this.houses = houses;
      for (let i = 0; i < houses.length; i++) {
        this.imageService.findByIdHouse(houses[i].id).subscribe((image) => {
          this.images.push(image.image);
        }, error => {
          console.log(error)
        })
      }
      console.log('house', houses)
    }, error => {
      console.log(error);
    })
  }

  top5Houses: any;
  imagesTop5: any[] = [];

  showTop5() {
    this.houseServiceService.findTop5().subscribe((houses) => {
      this.top5Houses = houses;
      for (let i = 0; i < houses.length; i++) {
        this.imageService.findByIdHouse(houses[i].id).subscribe((image) => {
          this.imagesTop5.push(image.image);
          console.log(this.imagesTop5)
        }, error => {
          console.log(error)
        })
      }
    }, error => {
      console.log(error)
    })
  }

  searchForm = new FormGroup({
    address: new FormControl,
    start: new FormControl,
    end: new FormControl,
    bathroom: new FormControl,
    bedroom: new FormControl,
    cus_begin: new FormControl,
    cus_end: new FormControl
  })
  houseSearch: any[] = [];
  search() {        console.log(this.searchForm.value)
    this.houseServiceService.searchByAll(this.searchForm.value.address, this.searchForm.value.start, this.searchForm.value.end, this.searchForm.value.bathroom,
      this.searchForm.value.bedroom, this.searchForm.value.cus_begin, this.searchForm.value.cus_end).subscribe((houses) => {
        this.houseSearch = houses;

        console.log('h',this.houseSearch)
    })
  }
}

