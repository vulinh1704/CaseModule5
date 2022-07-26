import {Component, OnInit} from '@angular/core';
import {HouseServiceService} from "../service/house-service.service";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {CategoryService} from "../service/category.service";
import {ImageService} from "../service/image.service";

@Component({
  selector: 'app-house-detail',
  templateUrl: './house-detail.component.html',
  styleUrls: ['./house-detail.component.css']
})
export class HouseDetailComponent implements OnInit {
  id: number = 0;
  listCategory: any[] = [];
  house: any;
  statusHouse: any;

  constructor(private houseServiceService: HouseServiceService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private categoryService: CategoryService,
              private imageService: ImageService) {
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      // @ts-ignore
      this.id = +paramMap.get('id');
      this.getHouse(this.id);
      this.getImages(this.id);
      this.categoryService.findAll().subscribe((categories) => {
        this.listCategory = categories;
      })
    });
  }

  getHouse(id: number) {
    return this.houseServiceService.findById(id).subscribe((house) => {
      this.house = house;
      if (this.house.status == 1) {
        this.statusHouse = 'Sẵn sàng';
      }
      if (this.house.status == 2) {
        this.statusHouse = 'Đang nâng cấp';
      }
      if (this.house.status == 3) {
        this.statusHouse = 'Đang được thuê';
      }
      console.log(house)
    })
  }

  images: any[] = [];
  getImages(id: number) {
    this.imageService.showFullImage(id).subscribe((images) => {
      this.images = images;
    })
  }
}
