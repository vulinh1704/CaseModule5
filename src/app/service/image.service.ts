import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

const API_URL = 'http://localhost:8080/images'
@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private httpClient: HttpClient) { }
  save(image: any): Observable<any>{
    return this.httpClient.post(API_URL , image);
  }
  findByIdHouse(id: any):Observable<any>{
    return this.httpClient.get(API_URL + `/house/${id}`);
  }
  showFullImage(id: any):Observable<any>{
    return this.httpClient.get(API_URL + `/${id}`);
  }
}
