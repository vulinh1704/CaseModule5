import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {HouseServiceService} from "../service/house-service.service";
import {Category} from "../model/category";
import {CategoryService} from "../service/category.service";
import {Router} from "@angular/router";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {finalize} from "rxjs";
import {ImageService} from "../service/image.service";

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
              private categoryService: CategoryService,
              private router: Router,
              private storage: AngularFireStorage,
              private imageService: ImageService) {
  }

  ngOnInit(): void {
    this.showAllCategories()
  }

  showAllCategories() {
    this.categoryService.findAll().subscribe((categories) => {
      this.listCategories = categories;
    }, error => {
      console.log(error)
    })
  }

  idHouseImage: any;
  image: any;

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
      owner: {
        id: localStorage.getItem('ID')
      },
      status: this.houseForm.value.status
    }
    this.houseServiceService.save(this.house).subscribe((house) => {
      this.idHouseImage = house.id;
      for (let i = 0; i < this.images.length; i++) {
        this.image = {
          house: {
            id: this.idHouseImage
          },
          image: this.images[i]
        }
        this.imageService.save(this.image).subscribe()
      }
      this.router.navigate(['']);
    })
  }


  title = "cloudsSorage";
  // @ts-ignore
  selectedFile: File = null;
  // @ts-ignore
  fb;
  // @ts-ignore
  downloadURL: Observable<string>;
  selectedImages: any[] = [];
  images: any[] = []

  onFileSelected() {
    if (this.selectedImages.length !== 0) {
      for (let i = 0; i < this.selectedImages.length; i++) {
        let selectedImage = this.selectedImages[i];
        var n = Date.now();
        const filePath = `RoomsImages/${n}`;
        const fileRef = this.storage.ref(filePath);
        this.storage.upload(filePath, selectedImage).snapshotChanges().pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe(url => {
              // const image: Image = {
              //   linkImg: url,
              //   postId: data.id
              // };
              // console.log('image', url);
              this.images.push(url);
              // this.imageService.create(image).subscribe(() => {
              //   console.log('SUCCESSFULLY CREATE')
              // });
            });
          })
        ).subscribe();
      }
    }
  }

  showPreview(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImages = event.target.files;
      console.log(this.selectedImages);
    } else {
      this.selectedImages = [];
    }
    this.onFileSelected()
  }
}
