import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BillOfMaterialDetail } from '../common/bill-of-material-detail';

@Injectable({
  providedIn: 'root',
})
export class BillOfMaterialDetailService {
  private baseUrl = 'https://jamesonbecker.com/api/bill-of-material-details';
  private projection = `?projection=bmDetailsProjection`;

  constructor(private httpClient: HttpClient) {}

  getBillDetailById(id: number): Observable<BillOfMaterialDetail> {
    return this.httpClient.get<BillOfMaterialDetail>(`${this.baseUrl}/${id}`);
  }

  getAllBillDetails(): Observable<BillOfMaterialDetail[]> {
    return this.httpClient.get<BillOfMaterialDetail[]>(`${this.baseUrl}`);
  }

  getBillDetailsByBillId(billId: number): Observable<BillOfMaterialDetail[]> {
    return this.httpClient.get<BillOfMaterialDetail[]>(
      `${this.baseUrl}/billOfMaterials/${billId}`
    );
  }

  getBillDetailsByPartId(partId: number): Observable<BillOfMaterialDetail[]> {
    return this.httpClient.get<BillOfMaterialDetail[]>(
      `${this.baseUrl}/parts/${partId}${this.projection}`
    );
  }

  createBillDetail(
    billDetails: BillOfMaterialDetail,
    billId: number
  ): Observable<BillOfMaterialDetail> {
    return this.httpClient.post<BillOfMaterialDetail>(
      `${this.baseUrl}/billOfMaterials/${billId}`,
      billDetails
    );
  }

  updateBillDetail(
    billDetailId: number,
    billId: number,
    billDetails: BillOfMaterialDetail
  ): Observable<BillOfMaterialDetail> {
    return this.httpClient.put<BillOfMaterialDetail>(
      `${this.baseUrl}/${billDetailId}/billOfMaterials/${billId}`,
      billDetails
    );
  }

  deleteBillOfMaterialDetail(id: number): Observable<BillOfMaterialDetail> {
    return this.httpClient.delete<BillOfMaterialDetail>(
      `${this.baseUrl}/${id}`
    );
  }
}
