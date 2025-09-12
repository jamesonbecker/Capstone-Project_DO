import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SalesOrders } from '../common/sales-orders';

@Injectable({
  providedIn: 'root',
})
export class SalesOrdersService {
  private baseUrl = 'http://localhost:8080/api/sales-orders';

  constructor(private httpClient: HttpClient) {}

  getSalesOrderById(id: number): Observable<SalesOrders> {
    return this.httpClient.get<SalesOrders>(`${this.baseUrl}/${id}`);
  }

  getAllSalesOrders(): Observable<SalesOrders[]> {
    return this.httpClient.get<SalesOrders[]>(`${this.baseUrl}`);
  }

  createSalesOrder(salesOrder: SalesOrders): Observable<SalesOrders> {
    return this.httpClient.post<SalesOrders>(`${this.baseUrl}`, salesOrder);
  }

  deleteSalesOrder(id: number): Observable<SalesOrders> {
    return this.httpClient.delete<SalesOrders>(`${this.baseUrl}/${id}`);
  }

  getSalesOrderBySalesOrderDetailId(
    salesOrderDetailId: number
  ): Observable<SalesOrders> {
    return this.httpClient.get<SalesOrders>(
      `${this.baseUrl}/salesOrderDetails/${salesOrderDetailId}`
    );
  }
}
