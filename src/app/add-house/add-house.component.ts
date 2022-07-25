import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {HouseServiceService} from "../service/house-service.service";
import {Category} from "../model/category";
import {CategoryService} from "../service/category.service";

@Component({
  selector: 'app-add-house',
  templateUrl: './add-house.component.html',
  styleUrls: ['./add-house.component.css']
})
export class AddHouseComponent implements OnInit {
  houseForm: FormGroup = new FormGroup({
    name: new FormControl(),
    categoryId: new FormControl(),
    address: new FormControl(),
    bedroom: new FormControl(),
    bathroom: new FormControl(),
    description: new FormControl(),
    price: new FormControl(),
    status: new FormControl()
  })
  house: any;
  listCategories: Category[] = [];
  constructor(private houseServiceService: HouseServiceService,
              private categoryService: CategoryService) {
  }

  ngOnInit(): void {
    this.showAllCategories()
  }
  showAllCategories(){
    this.categoryService.findAll().subscribe((categories) => {
      this.listCategories = categories;
    }, error => {
      console.log(error)
    })
  }
  add() {
    this.house = {
      name: this.houseForm.value.name,
      category: {
        id: this.houseForm.value.categoryId
      },
      address: this.houseForm.value.address,
      bedroom: this.houseForm.value.bedroom,
      bathroom: this.houseForm.value.bathroom,
      description: this.houseForm.value.description,
      price: this.houseForm.value.price,
      owner:{
        id: localStorage.getItem('ID')
      }
    }
    console.log(this.house)
  }
}
