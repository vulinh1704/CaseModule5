import {Component, OnInit} from '@angular/core';
import {OrderService} from "../service/order.service";
import {ActivatedRoute, ParamMap} from "@angular/router";
import * as stream from "stream";

@Component({
  selector: 'app-my-order',
  templateUrl: './my-order.component.html',
  styleUrls: ['./my-order.component.css']
})
export class MyOrderComponent implements OnInit {
  id: any;
  listOrder: any[] = [];

  constructor(private orderService: OrderService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      // @ts-ignore
      this.id = +paramMap.get('id');
      this.getListOrder(this.id);
    });
  }

  getListOrder(id: any) {
    return this.orderService.findByMyId(id).subscribe((orders) => {
      this.listOrder = orders;
      for (let i = 0; i < orders.length; i++) {
        this.calculateTheDate(orders[i].startTime);
        console.log(this.total)
        if (this.total < 2) {
          this.check.push(true)
        } else {
          this.check.push(false);
        }
      }
      console.log(this.check)
    }, error => {
      console.log(error);
    })
  }

  check: boolean[] = [];
  startTimeCal: any;
  endTimeCal: any;
  total: any;
  calculateTheDate(startTime: any) {
    this.startTimeCal = new Date(startTime);
    var today = new Date();
    this.endTimeCal = new Date(today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate());
    this.total = this.period(Number(this.startTimeCal), Number(this.endTimeCal));
  }

  period(startTime: number, endTime: number) {
    const diffInMs = Math.abs(endTime - startTime);
    return diffInMs / (1000 * 60 * 60 * 24);
  }

  order:any;
  updateOrder(id: any){
    this.orderService.findById(id).subscribe((order) =>  {
      this.order = {
        house: {
          id: order.house.id
        },
        customer: {
          id: order.customer.id
        },
        startTime: order.startTime,
        endTime: order.endTime,
        total: order.total,
        status: 2
      }
      this.orderService.update(order.id , this.order).subscribe(() => {
      })
    }, error => {
      console.log(error)
    })
  }
}
