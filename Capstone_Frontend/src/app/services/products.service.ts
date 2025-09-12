import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Products } from '../common/products';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private baseUrl = 'http://localhost:8080/api/products';

  constructor(private httpClient: HttpClient) {}

  getProductById(productId: number): Observable<Products> {
    return this.httpClient.get<Products>(`${this.baseUrl}/${productId}`);
  }

  getAllProducts(): Observable<Products[]> {
    return this.httpClient.get<Products[]>(`${this.baseUrl}`);
  }

  createProduct(
    product: Products,
    productCategoryId: number
  ): Observable<Products> {
    return this.httpClient.post<Products>(
      `${this.baseUrl}/productCategory/${productCategoryId}`,
      product
    );
  }

  updateProduct(
    productId: number,
    productCategoryId: number,
    product: Products
  ): Observable<Products> {
    return this.httpClient.put<Products>(
      `${this.baseUrl}/${productId}/productCategory/${productCategoryId}`,
      product
    );
  }

  addProductInventory(
    productId: number,
    billId: number,
    product: Products
  ): Observable<Products> {
    return this.httpClient.put<Products>(
      `${this.baseUrl}/${productId}/billOfMaterials/${billId}`,
      product
    );
  }

  updateProductIsKit(
    productId: number,
    product: Products
  ): Observable<Products> {
    return this.httpClient.put<Products>(
      `${this.baseUrl}/${productId}`,
      product
    );
  }

  deleteProduct(id: number): Observable<Products> {
    return this.httpClient.delete<Products>(`${this.baseUrl}/${id}`);
  }
}
