import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SalesOrderDetails } from '../common/sales-order-details';

@Injectable({
  providedIn: 'root',
})
export class SalesOrdersDetailsService {
  private baseUrl = 'http://jamesonbecker.com/api/sales-order-details';
  private projection = '?projection=soDetailsProjection';

  constructor(private httpClient: HttpClient) {}

  getSalesOrderDetailById(id: number): Observable<SalesOrderDetails> {
    return this.httpClient.get<SalesOrderDetails>(`${this.baseUrl}/${id}`);
  }

  getAllSalesOrderDetails(): Observable<SalesOrderDetails[]> {
    return this.httpClient.get<SalesOrderDetails[]>(`${this.baseUrl}`);
  }

  getSalesOrderDetailsBySalesOrderId(
    salesOrderId: number
  ): Observable<SalesOrderDetails[]> {
    return this.httpClient.get<SalesOrderDetails[]>(
      `${this.baseUrl}/salesOrders/${salesOrderId}`
    );
  }

  getSalesOrderDetailsByProductId(
    productId: number
  ): Observable<SalesOrderDetails[]> {
    return this.httpClient.get<SalesOrderDetails[]>(
      `${this.baseUrl}/products/${productId}${this.projection}`
    );
  }

  createSalesOrderDetail(
    salesOrderDetails: SalesOrderDetails,
    salesOrderId: number
  ): Observable<SalesOrderDetails> {
    return this.httpClient.post<SalesOrderDetails>(
      `${this.baseUrl}/salesOrders/${salesOrderId}`,
      salesOrderDetails
    );
  }

  updateSalesOrderDetail(
    salesOrderDetailId: number,
    salesOrderId: number,
    salesOrderDetails: SalesOrderDetails
  ): Observable<SalesOrderDetails> {
    return this.httpClient.put<SalesOrderDetails>(
      `${this.baseUrl}/${salesOrderDetailId}/salesOrders/${salesOrderId}`,
      salesOrderDetails
    );
  }

  deleteSalesOrderDetail(id: number): Observable<SalesOrderDetails> {
    return this.httpClient.delete<SalesOrderDetails>(`${this.baseUrl}/${id}`);
  }
}
