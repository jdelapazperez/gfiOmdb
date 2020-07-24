import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { tap, catchError } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { SearchResponse } from '../interfaces/SearchResponse';
import { throwError } from 'rxjs';
import { MovieDetailResponse } from '../interfaces/movieDetailResponse';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  constructor(private http: HttpClient) {}

  searchMovies(search: string, pageNumber: number) {
    return this.http
      .get<SearchResponse>(environment.urlOmdbMovie + search + environment.urlPageAdd + pageNumber)
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          // console.log('MoviesService::searchMovies');
          // console.log(resData);
          resData.lastSearch = search;
        })
      );
  }
  searchMovieDetails(id: string) {
    return this.http
      .get<MovieDetailResponse>(environment.urlOmdbMovieDetail + id)
      .pipe(
        catchError(this.handleError),
        tap((respData) => {
          // console.log('MoviesService::searchMovieDetails');
          // console.log(respData);
        })
      );
  }
  private handleError(errorRes: HttpErrorResponse) {
    return throwError('An unknown error occurred!');
  }
}
