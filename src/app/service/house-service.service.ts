import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

const API_URL = 'http://localhost:8080/home'
const API = 'http://localhost:8080/houses'

@Injectable({
  providedIn: 'root'
})
export class HouseServiceService {

  constructor(private httpClient: HttpClient) {
  }

  findAll(): Observable<any> {
    return this.httpClient.get(API_URL);
  }

  save(house: any): Observable<any> {
    return this.httpClient.post(API, house);
  }

  findById(id: any): Observable<any> {
    return this.httpClient.get(API_URL + `/house/${id}`);
  }

  edit(id: any, house: any): Observable<any> {
    return this.httpClient.put(API + `/${id}`, house);
  }

  findTop5(): Observable<any> {
    return this.httpClient.get(API + `/by-price-top2`);
  }

  searchByAll(address: any, start: any, end: any, bathroom: any, bedroom: any, cus_begin: any, cus_end: any): Observable<any>{
    return this.httpClient.get(API_URL + `/search-by-all?${address}?${start}?${end}?${bathroom}?${bedroom}?${cus_begin}?${cus_end}`)}
}
