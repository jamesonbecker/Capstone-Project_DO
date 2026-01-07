import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Parts } from '../common/parts';

@Injectable({
  providedIn: 'root',
})
export class PartsService {
  private baseUrl = 'https://imwa-project-app-2gyjc.ondigitalocean.app/api/parts';

  constructor(private httpClient: HttpClient) {}

  getPartById(partId: number): Observable<Parts> {
    return this.httpClient.get<Parts>(`${this.baseUrl}/${partId}`);
  }

  getAllParts(): Observable<Parts[]> {
    return this.httpClient.get<Parts[]>(`${this.baseUrl}`);
  }

  createPart(part: Parts): Observable<Parts> {
    return this.httpClient.post<Parts>(`${this.baseUrl}`, part);
  }

  updatePart(partId: number, part: Parts): Observable<Parts> {
    return this.httpClient.put<Parts>(`${this.baseUrl}/${partId}`, part);
  }

  deletePart(id: number): Observable<Parts> {
    return this.httpClient.delete<Parts>(`${this.baseUrl}/${id}`);
  }
}
