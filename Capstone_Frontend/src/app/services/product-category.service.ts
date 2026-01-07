import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root',
})
export class ProductCategoryService {
  private baseUrl = 'https://imwa-project-app-2gyjc.ondigitalocean.app/api/product-category';

  constructor(private httpClient: HttpClient) {}

  getProductCategoryById(id: number): Observable<ProductCategory> {
    return this.httpClient.get<ProductCategory>(`${this.baseUrl}/${id}`);
  }

  getAllProductCategories(): Observable<ProductCategory[]> {
    return this.httpClient.get<ProductCategory[]>(`${this.baseUrl}`);
  }

  createProductCategory(
    productCategory: ProductCategory
  ): Observable<ProductCategory> {
    return this.httpClient.post<ProductCategory>(this.baseUrl, productCategory);
  }

  deleteProductCategory(id: number): Observable<ProductCategory> {
    return this.httpClient.delete<ProductCategory>(`${this.baseUrl}/${id}`);
  }
}
