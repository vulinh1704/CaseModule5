import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

const API = 'http://localhost:8080/orders'

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private httpClient: HttpClient) {
  }

  save(order: any): Observable<any> {
    return this.httpClient.post(API, order);
  }

  findByMyId(id: any): Observable<any> {
    return this.httpClient.get(API + `/find-by-customer/${id}`)
  }

  update(id: any, order: any): Observable<any> {
    return this.httpClient.put(API + `/${id}`, order);
  }
  findById(id: any): Observable<any> {
    return this.httpClient.get(API + `/${id}`)
  }
}
