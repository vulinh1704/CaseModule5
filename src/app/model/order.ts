import {House} from "./house";
import {User} from "./user";

export interface Order {
  id: number;
  house: House;
  customer: User;
  startTime: string;
  endTime: string;
  total: string;
  status: string;
}