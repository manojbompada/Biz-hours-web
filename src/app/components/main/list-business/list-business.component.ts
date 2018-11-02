import { Component, OnInit } from '@angular/core';
import {ListBusinessService} from "../../../services/list-business.service";
import {BusinessScheduler} from "../../../constants/BusinessScheduler";

@Component({
  selector: 'app-list-business',
  templateUrl: './list-business.component.html',
  styleUrls: ['./list-business.component.less']
})
export class ListBusinessComponent implements OnInit {

  dayConstant = BusinessScheduler.dayConstant;

  constructor(public listBusinessService: ListBusinessService) { }

  ngOnInit() {
    this.listBusinessService.getBusinessList();
  }

}
