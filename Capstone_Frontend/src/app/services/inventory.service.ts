import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Inventory } from '../common/inventory';

@Injectable({
  providedIn: 'root',
})
export class InventoryService {
  private baseUrl = 'http://jamesonbecker.com/api/inventory';

  constructor(private httpclient: HttpClient) {}

  getAllInventory(limit: number): Observable<Inventory[]> {
    return this.httpclient.get<Inventory[]>(`${this.baseUrl}/reports/${limit}`);
  }

  getInventoryByProductId(productId: number): Observable<Inventory[]> {
    return this.httpclient.get<Inventory[]>(
      `${this.baseUrl}/products/${productId}`
    );
  }

  saveInventory(
    inventory: Inventory,
    productId: number
  ): Observable<Inventory> {
    return this.httpclient.post<Inventory>(
      `${this.baseUrl}/products/${productId}`,
      inventory
    );
  }
}
