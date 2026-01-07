import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PurchaseOrderDetails } from '../common/purchase-order-details';

@Injectable({
  providedIn: 'root'
})
export class PurchaseOrderDetailsService {
  private baseUrl = 'https://imwa-project-app-2gyjc.ondigitalocean.app/api/purchase-order-details';
  private projection = '?projection=poDetailProjection';

  constructor(private httpClient: HttpClient) {}

  getPurchaseOrderDetailById(id: number): Observable<PurchaseOrderDetails> {
    return this.httpClient.get<PurchaseOrderDetails>(`${this.baseUrl}/${id}`);
  }

  getAllPurchaseOrderDetails(): Observable<PurchaseOrderDetails[]> {
    return this.httpClient.get<PurchaseOrderDetails[]>(`${this.baseUrl}`);
  }

  getPurchaseOrderDetailsByPurchaseOrderId(
    purchaseOrderId: number
  ): Observable<PurchaseOrderDetails[]> {
    return this.httpClient.get<PurchaseOrderDetails[]>(
      `${this.baseUrl}/purchaseOrders/${purchaseOrderId}`
    );
  }

  getPurchaseOrderDetailsByProductId(
    productId: number
  ): Observable<PurchaseOrderDetails[]> {
    return this.httpClient.get<PurchaseOrderDetails[]>(
      `${this.baseUrl}/products/${productId}${this.projection}`
    );
  }

  getPurchaseOrderDetailsByPartId(
    partId: number
  ): Observable<PurchaseOrderDetails[]> {
    return this.httpClient.get<PurchaseOrderDetails[]>(
      `${this.baseUrl}/parts/${partId}${this.projection}`
    );
  }

  createPurchaseOrderDetail(
    purchaseOrderDetails: PurchaseOrderDetails,
    purchaseOrderId: number
  ): Observable<PurchaseOrderDetails> {
    return this.httpClient.post<PurchaseOrderDetails>(
      `${this.baseUrl}/purchaseOrders/${purchaseOrderId}`,
      purchaseOrderDetails
    );
  }

  updatePurchaseOrderDetail(
    purchaseOrderDetailId: number,
    purchaseOrderId: number,
    purchaseOrderDetails: PurchaseOrderDetails
  ): Observable<PurchaseOrderDetails> {
    return this.httpClient.put<PurchaseOrderDetails>(
      `${this.baseUrl}/${purchaseOrderDetailId}/purchaseOrders/${purchaseOrderId}`,
      purchaseOrderDetails
    );
  }

  deletePurchaseOrderDetail(id: number): Observable<PurchaseOrderDetails> {
    return this.httpClient.delete<PurchaseOrderDetails>(`${this.baseUrl}/${id}`);
  }
}
