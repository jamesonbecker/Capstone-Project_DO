import { BillOfMaterialDetail } from "./bill-of-material-detail";
import { Parts } from "./parts";
import { Products } from "./products";

export class BillOfMaterials {
  public id: number;
  public product: Products;
  public billTotal: number;
  public dateCreated: Date;
  public lastUpdated: Date;
  public billOfMaterialDetail: BillOfMaterialDetail[];
}
