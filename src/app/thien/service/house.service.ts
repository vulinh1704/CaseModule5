import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
const API_URL = 'http://localhost:8081'
@Injectable({
  providedIn: 'root'
})
export class HouseService {
  constructor(private httpClient: HttpClient) { }
  getTop5(): Observable<any> {
    return this.httpClient.get(API_URL + '/houses/by-price-top2');
  }
  getAllHouse(): Observable<any> {
    return this.httpClient.get(API_URL + '/home');
  }
}
