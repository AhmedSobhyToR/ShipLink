import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../../models/product.model';
import { delay, Observable } from 'rxjs';
import { LoadingService } from '../loading.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private backendUrl = environment.backendUrl;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      // 'Authorization': 'Basic my-auth-token'
    })
  };

  constructor(private httpClient: HttpClient,
    private loadingSer : LoadingService
  ) { }

  getAllProducts(): Observable<Product[]>{
    return this.httpClient.get<Product[]>(`${this.backendUrl}/products`)

  }

  getProducts(pageNumber: number , pageSize: number): Observable<any>{
    // this.loadingSer.setLoadingFalse();
    return this.httpClient.get<any>(`${this.backendUrl}/products?_page=${pageNumber}&_per_page=${pageSize}`)

  }

  getProduct(id: number|string): Observable<Product>{
    // this.loadingSer.setLoadingFalse();
    return this.httpClient.get<Product>(`${this.backendUrl}/products/${id}`)
  }

  addProduct(addedProduct: Product): Observable<Product>{
    return this.httpClient.post<Product>(`${this.backendUrl}/products`,JSON.stringify(addedProduct),this.httpOptions)
  }
  

}
