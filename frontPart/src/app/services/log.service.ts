import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Log } from '../interfaces/Log';

@Injectable({
  providedIn: 'root'
})

export class LogService {

  constructor(private http: HttpClient) { }

  getLog(): Observable<Log[]> {
    return this.http.get<Log[]>(`${ environment.appUrl }/${ environment.logUrl }`);
  }

  deleteLog(): Observable<{ resultFlush: string }> {
    return this.http.get<{ resultFlush: string }>(`${ environment.appUrl }/${ environment.logUrl }/flush`);
  }

}
