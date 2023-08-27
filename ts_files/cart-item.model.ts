import { Category } from "./cart-category.model";
import { v4 as uuidv4 } from 'uuid';

export class CartItem { 
  uuid: string;
  name: string;
  price: number;
  id: number;
  discount: number;
  category: Category;
  priceAfterDiscount: number;

  constructor(name: string, price: number, id: number, discount?: number, category?: Category) {
    this.uuid = uuidv4();
    this.name = name;
    this.id = id;
    this.price = price;
    this.discount = discount ? discount : 0;
    this.category = category ? category : Category.other;
    this.priceAfterDiscount = this.getPriceAfterDiscount();
  }

  getPriceAfterDiscount() {
    if (this.price > 0) {
      return this.price - (this.price*this.discount/100);
    } else return this.price;
  }

  setProductCategory(category: Category) {
    this.category = category;
  }

  setProductName(name: string) {
    this.name = name;
  }

  setProductPrice(price: number) {
    this.price = price
  }
  
  setProductDiscount(discount: number) {
    this.discount = discount
  }
  setProductId(id: number) {
    this.id - id;
  }
}
