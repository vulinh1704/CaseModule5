import {Category} from "./category";
import {User} from "./user";

export interface House {
  id: number;
  name: string;
  category: Category;
  address: string;
  bedroom: number;
  bathroom: number;
  description: string;
  price: number;
  owner: User;
  status: number;
}
