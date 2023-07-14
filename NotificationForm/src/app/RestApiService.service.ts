import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Supervisors } from './Supervisors';
import { Supervisor } from './supervisor.model';
@Injectable({
  providedIn: 'root',
})
export class RestApiService {

  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  getSupervisors(): Observable<string[]> {
    return this.http
      .get<string[]>("http://localhost:8080/api/supervisors")
      .pipe(retry(1), catchError(this.handleError));
  }


  submitSupervisors(supervisor:Supervisor): Observable<any> {
    return this.http.post("http://localhost:8080/api/submit", supervisor)
    .pipe(retry(1), catchError(this.handleError));
  }

  // Error handling
  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = error.error.text;
    }
    window.alert(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
}
