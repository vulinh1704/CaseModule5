import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {OrderService} from "../service/order.service";
import {HouseServiceService} from "../service/house-service.service";
import {Category} from "../model/category";
import {User} from "../model/user";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  orderForm: FormGroup = new FormGroup({
    startTime: new FormControl(),
    endTime: new FormControl(),
  })
  idHouse: number = 0;
  house: any;
  houseEdit: any;
  order: any;
  startTimeRent: any;
  endTimeRent: any;
  total: any;

  constructor(private orderService: OrderService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private houseServiceService: HouseServiceService) {
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      // @ts-ignore
      this.idHouse = +paramMap.get('id');
      this.getHouse(this.idHouse);
    });
  }

  add() {
    this.order = {
      house: {
        id: this.idHouse
      },
      customer: {
        id: localStorage.getItem('ID')
      },
      startTime: this.orderForm.value.startTime,
      endTime: this.orderForm.value.endTime,
      total: this.total,
      status: 1
    }
    this.orderService.save(this.order).subscribe(() => {
      this.houseEdit = {
        name: this.house.name,
        category: {
          id: this.house.category.id
        },
        address: this.house.address,
        bedroom: this.house.bedroom,
        bathroom: this.house.bathroom,
        description: this.house.description,
        price: this.house.price,
        owner: {
          id: this.house.owner.id
        },
        status: 3
      }
      this.houseServiceService.edit(this.house.id, this.houseEdit).subscribe(() => {
      })
      this.router.navigate(['']);
    });

  }

  getHouse(id: number) {
    return this.houseServiceService.findById(id).subscribe((house) => {
      this.house = house;
    })
  }

  check: boolean = false;

  rent() {
    this.startTimeRent = new Date(this.orderForm.value.startTime);
    this.endTimeRent = new Date(this.orderForm.value.endTime)
    this.total = this.house.price * this.period(Number(new Date(this.orderForm.value.startTime)), Number(new Date(this.orderForm.value.endTime)))
    this.check = true;
  }

  period(startTime: number, endTime: number) {
    const diffInMs = Math.abs(endTime - startTime);
    return diffInMs / (1000 * 60 * 60 * 24);
  }
}
