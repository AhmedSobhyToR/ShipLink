import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../../models/category.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private backendUrl = environment.backendUrl;
  constructor(private httpClient: HttpClient) { }

  loadCategories(): Observable<Category[]>{
    return this.httpClient.get<Category[]>(`${this.backendUrl}/categories`)
  }

  
  loadCategory(id: string | number): Observable<Category>{
    return this.httpClient.get<Category>(`${this.backendUrl}/categories/${id}`)
  }

  // addCategory(): Observable<Category>{
  //   return this.httpClient.post<Category>(`${this.backendUrl}/categories`)
  // }

}
