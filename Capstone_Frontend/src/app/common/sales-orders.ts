import { SalesOrderDetails } from "./sales-order-details";
import { DateTime } from 'luxon';

export class SalesOrders {
  public id: number;
  public orderTotal: number;
  public dateCreated: DateTime;
  public lastUpdated: DateTime;
  public salesOrderDetail: SalesOrderDetails[];

  constructor(orderTotal: number) {
    this.orderTotal = orderTotal;
  }
}
