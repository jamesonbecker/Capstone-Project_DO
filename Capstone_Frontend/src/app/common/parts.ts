import { BillOfMaterials } from "./bill-of-materials";
import { Inventory } from "./inventory";
import { PurchaseOrderDetails } from "./purchase-order-details";

export class Parts {
  public id: number;
  public sku: string;
  public name: string;
  public description: string;
  public price: number;
  public location: string;
  public unitsInStock: number;
  public dateCreated: Date;
  public lastUpdated: Date;
  public inventory: Inventory[];
  public purchaseOrderDetail: PurchaseOrderDetails[];
}
