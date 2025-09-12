import { BillOfMaterials } from './bill-of-materials';
import { Parts } from './parts';

export class BillOfMaterialDetail {
  public id: number;
  public quantityNeeded: number;
  public lineTotal: number;
  public dateCreated: Date;
  public lastUpdated: Date;
  public billOfMaterial: BillOfMaterials;
  public part: Parts;
}
