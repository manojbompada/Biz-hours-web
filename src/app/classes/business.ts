import {BusinessSchedules} from "./business-schedules";

export class Business {
  id: number;
  name: string;
  url: string;
  phoneNumber: string;
  businessSchedules: BusinessSchedules[];
}
