import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, retry, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  public getCalendarData(query: string): Observable<any> {

    const url: string = "http://localhost:3000/calendar/" + query;

    return this.http.get<any>(url);
  }
}
