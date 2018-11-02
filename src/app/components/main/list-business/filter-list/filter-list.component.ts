import { Component, OnInit } from '@angular/core';
import {ListBusinessService} from "../../../../services/list-business.service";

@Component({
  selector: 'app-filter-list',
  templateUrl: './filter-list.component.html',
  styleUrls: ['./filter-list.component.less']
})
export class FilterListComponent implements OnInit {

  constructor(public listBusinessService: ListBusinessService) { }

  dayId: number;
  openTimeValue: number;
  closeTimeValue: number;
  openTimeOffset: number = 0;
  closeTimeOffset: number = 12;

  ngOnInit() {
  }

  onDayChange(value) {
    this.dayId = parseInt(value, 10)
  }

  onOpenTimeChange(value) {
    this.openTimeValue = parseInt(value, 10);
  }

  onCloseTimeChange(value) {
    this.closeTimeValue = parseInt(value, 10)
  }

  onOpenTimeAmPmChange(value) {
    value && value === 'am' ? this.openTimeOffset = 0 : this.openTimeOffset = 12;
  }

  onCloseTimeAmPmChange(value) {
    value && value === 'am' ? this.closeTimeOffset = 0 : this.closeTimeOffset = 12;
  }

  apply() {
    let openTime;
    let closeTime;

      openTime = this.openTimeValue + this.openTimeOffset;
      closeTime = this.closeTimeValue + this.closeTimeOffset;
      this.listBusinessService.getBusinessList(this.dayId, openTime, closeTime);


  }

  reset() {
    console.log("=========reset========");
    this.listBusinessService.getBusinessList();
  }

}
