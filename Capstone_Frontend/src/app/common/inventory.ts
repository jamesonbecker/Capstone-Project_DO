import { Parts } from "./parts";
import { Products } from "./products";
import { DateTime } from 'luxon';

export class Inventory {
    public id: number;
    public product: Products;
    public productId: number;
    public productSku: string;
    public part: Parts;
    public partId: number;
    public partSku: string;
    public billOfMaterialId: number;
    public billOfMaterialDetailId: number;
    public salesOrderDetailId: number;
    public purchaseOrderDetailId: number;
    public itemSku: string;
    public orderNumber: number;
    public adjustmentType: string;
    public quantity: number;
    public date: DateTime;
}
