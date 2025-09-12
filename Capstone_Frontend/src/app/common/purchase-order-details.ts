import { PurchaseOrders } from './purchase-orders';
import { Products } from './products';
import { Parts } from './parts';

export class PurchaseOrderDetails {
  public id: number;
  public quantityOrdered: number;
  public lineTotal: number;
  public dateCreated: Date;
  public lastUpdated: Date;
  public purchaseOrder: PurchaseOrders;
  public product: Products;
  public productId: number;
  public productSku: number;
  public part: Parts;
  public partId: number;
  public partSku: number;

  constructor(part: Parts, quantityOrdered: number, lineTotal: number) {
    this.part = part;
    this.quantityOrdered = quantityOrdered;
    this.lineTotal = lineTotal;
  }
}