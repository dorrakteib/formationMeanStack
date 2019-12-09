import { User } from "./user";
export class Product {
  _id?: String;
  name?: String;
  reference?: String;
  category?: String;
  quantity?: Number;
  price?: Number;
  description?: String;
  image?: String;
  userId?: User;
}
