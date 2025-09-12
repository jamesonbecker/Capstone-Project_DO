import { Products } from "./products";

export class ProductCategory {
  public id: number;
  public name: string;
  public dateCreated: Date;
  public lastUpdated: Date;
  public products: Products[];
}
