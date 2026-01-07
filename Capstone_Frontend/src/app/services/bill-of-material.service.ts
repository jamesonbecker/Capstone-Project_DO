import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BillOfMaterials } from '../common/bill-of-materials';

@Injectable({
  providedIn: 'root',
})
export class BillOfMaterialService {
  private baseUrl = 'https://imwa-project-app-2gyjc.ondigitalocean.app/api/bill-of-materials';

  constructor(private httpClient: HttpClient) {}

  getBillOfMaterialById(id: number): Observable<BillOfMaterials> {
    return this.httpClient.get<BillOfMaterials>(`${this.baseUrl}/${id}`);
  }

  getAllBillOfMaterials(): Observable<BillOfMaterials[]> {
    return this.httpClient.get<BillOfMaterials[]>(`${this.baseUrl}`);
  }

  getBillOfMaterialByProductId(productId: number): Observable<BillOfMaterials> {
    return this.httpClient.get<BillOfMaterials>(
      `${this.baseUrl}/products/${productId}`
    );
  }

  createBillOfMaterial(
    billOfMaterial: BillOfMaterials,
    productId: number
  ): Observable<BillOfMaterials> {
    return this.httpClient.post<BillOfMaterials>(
      `${this.baseUrl}/products/${productId}`,
      billOfMaterial
    );
  }

  updateBillOfMaterial(
    billOfMaterialId: number,
    productId: number,
    billOfMaterial: BillOfMaterials
  ): Observable<BillOfMaterials> {
    return this.httpClient.put<BillOfMaterials>(
      `${this.baseUrl}/${billOfMaterialId}/productCategory/${productId}`,
      billOfMaterial
    );
  }

  deleteBillOfMaterial(id: number): Observable<BillOfMaterials> {
    return this.httpClient.delete<BillOfMaterials>(`${this.baseUrl}/${id}`);
  }
}
