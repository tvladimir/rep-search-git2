import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { retry, catchError, map, tap } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { BookmarkDataModel } from '../../models/BookmarkData.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private httpClient: HttpClient
  ) { }

  serachFromGit(searchString: string = ''): Observable<any> {
    const searchUrl = `${environment.apiSearchUrl}q=${searchString}`;
    return this.httpClient.get(searchUrl).pipe(
      catchError(this.handleError)
    );
    // return this.httpClient.get(searchUrl).pipe(
    //   map(res => {
    //     console.log('End searching: ', searchString);
    //     console.log(res);
    //     return res;
    //   }),
    //   catchError(this.handleError)
    //   );
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage;
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
