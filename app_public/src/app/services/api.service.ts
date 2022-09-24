import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  /*
    Calls the Calendar API and returns the Calendar JSON object.
  */
  public getCalendarData(query: string): Observable<any> {

    const url: string = "http://localhost:3000/calendar/" + query;

    return this.http.get<any>(url);
  }
}
