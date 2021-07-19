import { ResponseServer } from './../interfaces/ResponseServer';
import { Product } from '../interfaces/Product';
import { Category } from '../interfaces/Category';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ProductService {

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${ environment.appUrl }/${ environment.productUrl }/`);
  }

  getCategoryForProduct() {
    return this.http.get<Category[]>(`${ environment.appUrl }/${ environment.categoryUrl }/get`);
  }

  addProduct(newProduct: Product): Observable<ResponseServer> {
    return this.http.post<ResponseServer>(`${ environment.appUrl }/${ environment.productUrl }/add/`, newProduct);
  }

  deleteProduct(productId: number): Observable<ResponseServer> {
    return this.http.post<ResponseServer>(`${ environment.appUrl }/${ environment.productUrl }/remove/${ productId }`, { productId });
  }

}
