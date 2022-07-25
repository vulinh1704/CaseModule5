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
  save(house: any): Observable<any>{
    return this.httpClient.post(API , house);
  }

  findById(id: any):Observable<any>{
    return this.httpClient.get(API_URL + `/house/${id}`);
  }
  edit(id:any , house: any){
    return this.httpClient.put(API + `/${id}`, house);
  }
}
