import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AddBusinessService {

  constructor(public http: HttpClient) { }

  addBusiness(business) {
    const headers = this.getHeaders();
    let url = environment.APP.API_URL + '/businesses';
    return this.http
      .post(url, business, { headers });
  }

  getHeaders() {
    let headers = { 'Content-Type': 'application/json' };
    return headers;
  }
}
