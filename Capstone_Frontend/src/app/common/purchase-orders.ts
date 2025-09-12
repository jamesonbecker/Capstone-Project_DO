import { PurchaseOrderDetails } from './purchase-order-details';

export class PurchaseOrders {
  public orderNumber: number;
  public orderType: string;
  public orderTotal: number;
  public dateCreated: Date;
  public lastUpdated: Date;
  public purchaseOrderDetail: PurchaseOrderDetails[];

  constructor(orderType: string, orderTotal: number) {
    this.orderType = orderType;
    this.orderTotal = orderTotal;
  }
}
