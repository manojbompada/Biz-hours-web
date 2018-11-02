import { Injectable } from '@angular/core';
import { Business } from "../classes/business";
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ListBusinessService {

  constructor(public httpClient: HttpClient) { }

  list: Business[] = [
  ];

  getBusinessList(dayId?, openTime?, closeTime?) {
    let url = environment.APP.API_URL + '/businesses'+'?';
    if(dayId && dayId>0) {
      url = url + 'dayId=' + dayId +'&';
    }
    if(openTime && openTime>0) {
      url = url + 'openTime=' + openTime+'&';
    }
    if(closeTime && closeTime>0) {
      url = url + 'closeTime=' + closeTime ;
    }

    this.httpClient.get(url)
      .subscribe((data: any) => {
      this.list = data;
    });
  }
}
