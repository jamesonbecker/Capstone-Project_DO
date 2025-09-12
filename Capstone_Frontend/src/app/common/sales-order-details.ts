import { Products } from "./products";
import { SalesOrders } from "./sales-orders";

export class SalesOrderDetails {
  public id: number;
  public quantityOrdered: number;
  public lineTotal: number;
  public dateCreated: Date;
  public lastUpdated: Date;
  public salesOrder: SalesOrders;
  public product: Products;
}
