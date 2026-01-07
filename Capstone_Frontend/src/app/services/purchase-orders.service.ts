import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PurchaseOrders } from '../common/purchase-orders';

@Injectable({
  providedIn: 'root'
})
export class PurchaseOrdersService {
  private baseUrl = 'https://imwa-project-app-2gyjc.ondigitalocean.app/api/purchase-orders';

  constructor(private httpClient: HttpClient) { }

  getPurchaseOrderById(id: number): Observable<PurchaseOrders> {
    return this.httpClient.get<PurchaseOrders>(`${this.baseUrl}/${id}`);
  }

  getAllPurchaseOrders(): Observable<PurchaseOrders[]> {
    return this.httpClient.get<PurchaseOrders[]>(`${this.baseUrl}`);
  }

  createPurchaseOrders(purchaseOrder: PurchaseOrders): Observable<PurchaseOrders> {
    return this.httpClient.post<PurchaseOrders>(`${this.baseUrl}`, purchaseOrder);
  }

  deletePurchaseOrder(id: number): Observable<PurchaseOrders> {
    return this.httpClient.delete<PurchaseOrders>(`${this.baseUrl}/${id}`);
  }

  getPurchaseOrderByPurchaseOrderDetailId(
    purchaseOrderDetailId: number
  ): Observable<PurchaseOrders> {
    return this.httpClient.get<PurchaseOrders>(
      `${this.baseUrl}/purchaseOrderDetails/${purchaseOrderDetailId}`
    );
  }
}
