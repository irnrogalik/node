import { ResponseServer } from './../interfaces/ResponseServer';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Category } from '../interfaces/Category';
import { Tax } from '../interfaces/Tax';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class CategoryService {

  constructor(private http: HttpClient) { }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${ environment.appUrl }/${ environment.categoryUrl }/`);
  }

  getTaxForCategory(): Observable<Tax[]> {
    return this.http.get<Tax[]>(`${ environment.appUrl }/${ environment.taxUrl }/get`);
  }

  addCategory(newCategory: { name: string, taxId: number }): Observable<ResponseServer> {
    return this.http.post<ResponseServer>(`${ environment.appUrl }/${ environment.categoryUrl }/add/`, newCategory);
  }

  deleteCategory(categoryId: number): Observable<ResponseServer> {
    return this.http.post<ResponseServer>(`${ environment.appUrl }/${ environment.categoryUrl }/remove/${ categoryId }`, { categoryId });
  }

}
