import { BillOfMaterials } from "./bill-of-materials";
import { Inventory } from "./inventory";
import { ProductCategory } from "./product-category";
import { PurchaseOrderDetails } from "./purchase-order-details";
import { SalesOrderDetails } from "./sales-order-details";

export class Products {
  public id: number;
  public sku: string;
  public name: string;
  public description: string;
  public price: number;
  public kit: boolean;
  public active: boolean;
  public unitsInStock: number;
  public location: string;
  public dateCreated: Date;
  public lastUpdated: Date;
  public category: ProductCategory;
  public categoryId: number;
  public salesOrderDetails: SalesOrderDetails[];
  public billOfMaterials: BillOfMaterials[];
  public inventory: Inventory[];
  public purchaseOrderDetail: PurchaseOrderDetails[];
}
