import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

const API_URL = 'http://localhost:8080/home'

@Injectable({
  providedIn: 'root'
})
export class HouseServiceService {

  constructor(private httpClient: HttpClient) {
  }

  findAll(): Observable<any> {
    return this.httpClient.get(API_URL);
  }
  save(house: any): Observable<any>{
    return this.httpClient.post(API_URL , house);
  }
}
