import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { retry, catchError, map, tap } from 'rxjs/operators';
import { throwError, Observable, BehaviorSubject } from 'rxjs';
import { BookmarkDataModel } from '../../models/BookmarkData.model';

@Injectable({
  providedIn: 'root'
})

// Service for all API requests

export class DataService {
  public countBookmarks = new BehaviorSubject<number>(0);
  private baseUrl: string;

  constructor(
    private httpClient: HttpClient,
    @Inject('BASE_URL') baseUrl: string,
  ) {
    this.baseUrl = baseUrl;
  }

  //// Get response from GIT API
  searchFromGit(searchString: string = ''): Observable<any> {
    const searchUrl = `${environment.apiSearchUrl}q=${searchString}`;
    return this.httpClient.get(searchUrl).pipe(
      catchError(this.handleError)
    );
  }

  //// Save new Bookmark in Session
  addNewBookmark(bookmark: BookmarkDataModel){
    return this.httpClient.post(this.baseUrl  + 'bookmark', bookmark);
  }

  //// Get All Bookmarks from Session
  getSessionBookmarks(){
    return this.httpClient.get(this.baseUrl  + 'bookmark').pipe(
      catchError(this.handleError)
    );
  }

  //// Update Subject of Count Bookmarks (UI only)
  updateSessionCountBookmarks(newValue: number) {
    this.countBookmarks.next(newValue);
  }

  //// handleError for Http requests
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
