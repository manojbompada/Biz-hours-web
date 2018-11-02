import { Component, OnInit } from '@angular/core';
import {AddBusinessService} from "../../../services/add-business.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Business} from "../../../classes/business";
import {BusinessSchedules} from "../../../classes/business-schedules";
import {BusinessScheduler} from "../../../constants/BusinessScheduler";
import {ListBusinessService} from "../../../services/list-business.service";

@Component({
  selector: 'app-add-business',
  templateUrl: './add-business.component.html',
  styleUrls: ['./add-business.component.less']
})
export class AddBusinessComponent implements OnInit {

  constructor(public addBusinessService: AddBusinessService, public formBuilder: FormBuilder,
              public listBusinessService: ListBusinessService) { }

  showAddForm: boolean = false;
  business: Business = new Business();
  businessForm: FormGroup;
  submitted: boolean = false;
  businessSchedules: BusinessSchedules[] = [];
  dayState: any = {1 : true, 2 : true, 3 : true, 4 : true, 5 : true, 6 : true, 7 : true};
  openTimeOffset: any = {1 : 0, 2 : 0, 3 : 0, 4 : 0, 5 : 0, 6 : 0, 7 : 0};
  closeTimeOffset: any = {1 : 12, 2 : 12, 3 : 12, 4 : 12, 5 : 12, 6 : 12, 7 : 12};
  dayIds: number[] = [1, 2, 3, 4, 5, 6, 7];
  dayConstant = BusinessScheduler.dayConstant;
  showHoursError: boolean = false;

  ngOnInit() {
    this.businessForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(59), Validators.pattern('^[a-zA-Z 0-9 ]+$')]],
      url: [''],
      phoneNumber: ['', Validators.compose([Validators.required])],

    });
  }

  get biz() { return this.businessForm.controls; }

  addBusiness() {
    this.showAddForm = true;
  }

  cancelForm() {
    this.showAddForm = false;
  }

  onSubmit() {
    this.showHoursError = false;
    this.submitted = true;
    if(!this.canSubmit()) {
      this.showHoursError = true;
      return;
    }
    if (this.businessForm.valid) {
      this.business.name = this.biz.name.value;
      this.business.phoneNumber = this.biz.phoneNumber.value;
      this.business.url = this.biz.url.value;
      this.business.businessSchedules = this.businessSchedules;
      this.addBusinessService.addBusiness(this.business).subscribe((res: any) => {
        if(res) {
          this.listBusinessService.list.push(this.business);
          this.submitted = false;
          this.showAddForm = false;
          this.dayState = {1 : true, 2 : true, 3 : true, 4 : true, 5 : true, 6 : true, 7 : true};
          this.openTimeOffset = {1 : 0, 2 : 0, 3 : 0, 4 : 0, 5 : 0, 6 : 0, 7 : 0};
          this.closeTimeOffset = {1 : 12, 2 : 12, 3 : 12, 4 : 12, 5 : 12, 6 : 12, 7 : 12};
          this.business = new Business();

        }
      }, (error) => {
        console.log(error);
        this.submitted = false;
      });
      console.log(this.business);
    }
  }

  canSubmit(): boolean {
    for (let i = 0 ; i < this.dayIds.length; i++) {
      let id = this.dayIds[i];
      if (this.dayState[id]) {
        if (!this.businessSchedules[i] ||
          this.businessSchedules[i].dayId < 1 ||
          this.businessSchedules[i].openTime < 1 || this.businessSchedules[i].closeTime < 1) {
          return false;
        }
      }
    }
    return true;
  }

  openTimeChange(i, value) {
    console.log('open: ' + i + ' - ' + value );
    if(!this.businessSchedules[i - 1]) this.businessSchedules[i - 1] = new BusinessSchedules();
    this.businessSchedules[i - 1].dayId = i;
    this.businessSchedules[i - 1].openTime = this.openTimeOffset[i] + parseInt(value, 10);
    console.log(this.businessSchedules);
  }

  closeTimeChange(i, value) {
    if(!this.businessSchedules[i - 1]) this.businessSchedules[i - 1] = new BusinessSchedules();
    this.businessSchedules[i - 1].dayId = i;
    this.businessSchedules[i - 1].closeTime = this.closeTimeOffset[i] + parseInt(value, 10);
  }

  openTimeAmPmChange(i, value) {
    value && value === 'am' ? this.openTimeOffset[i] = 0 : this.openTimeOffset[i] = 12;
  }

  closeTimeAmPmChange(i, value) {
    value && value === 'am' ? this.closeTimeOffset[i] = 0 : this.closeTimeOffset[i] = 12;
  }

  onDayStateChange(value, dayId) {
    // BusinessScheduler.dayConstant[]
    value && value === 'open' ?  this.dayState[dayId] = true : this.dayState[dayId] = false;
    if(!this.dayState[dayId]) {
      if(!this.businessSchedules[dayId - 1]) {
        this.businessSchedules[dayId - 1] = new BusinessSchedules();
      }
      this.businessSchedules[dayId - 1].dayId = dayId;
      this.businessSchedules[dayId - 1].closeTime = 0;
      this.businessSchedules[dayId - 1].openTime = 0;
    }
    console.log(this.dayState);
  }

}
