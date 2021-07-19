import { ResponseServer } from './../interfaces/ResponseServer';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Tax } from '../interfaces/Tax';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class TaxService {

  constructor(private http: HttpClient) { }

  getTaxes(): Observable<Tax[]> {
    return this.http.get<Tax[]>(`${ environment.appUrl }/${ environment.taxUrl }`);
  }

  addTax(newTax: Tax): Observable<ResponseServer> {
    return this.http.post<ResponseServer>(`${ environment.appUrl }/${ environment.taxUrl }/add`, newTax);
  }

  deleteTax(taxId: number): Observable<ResponseServer> {
    return this.http.post<ResponseServer>(`${ environment.appUrl }/${ environment.taxUrl }/remove/${ taxId }`, { taxId });
  }

}
