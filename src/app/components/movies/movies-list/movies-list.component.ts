import {
  Component,
  OnInit,
  Input,
  OnDestroy,
  EventEmitter,
  Output,
} from '@angular/core';

import { SearchModel } from '../../../models/search.model';
import { MovieDetailResponse } from 'src/app/interfaces/movieDetailResponse';
import { MoviesService } from 'src/app/services/movies.service';
import { Observable, Subscription } from 'rxjs';
import { MovieDetailModel } from 'src/app/models/movie-detail.model';
import { SearchResponse } from 'src/app/interfaces/SearchResponse';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.sass'],
})
export class MoviesListComponent implements OnInit, OnDestroy {
  @Input() searchResult: SearchModel;
  @Input() searchValue: string;
  movieDetailResponse: MovieDetailResponse;
  movieDetailObs: Observable<MovieDetailResponse>;
  searchObs: Observable<SearchResponse>;
  movie: MovieDetailModel;
  search: SearchModel;
  activePage = 1;
  private closeSub: Subscription;
  isError = false;

  isTableVisible = false;
  isDetailVisible = false;

  constructor(private moviesService: MoviesService) {}

  ngOnInit() {
    console.log('MoviesListComponent ngOnInit');
    if (this.searchResult.Response === 'True') {
      this.isTableVisible = true;
    } else {
      this.isTableVisible = false;
    }
  }

  ngOnDestroy() {
    if (this.closeSub) {
      this.closeSub.unsubscribe();
    }
  }

  onMovieDetails(imdbID: string) {
    this.movieDetailObs = this.moviesService.searchMovieDetails(imdbID);
    this.closeSub = this.movieDetailObs.subscribe(
      (resData) => {
        this.movieDetailResponse = resData;
        console.log('movieDetailResponse' + imdbID);
        console.log(this.movieDetailResponse);
        this.isError = false;
        this.isDetailVisible = true;
      },
      (errorMessage) => {
        console.log(errorMessage);
        this.isError = true;
        this.isDetailVisible = false;
      }
    );
  }

  displayActivePage(activePageNumber: number) {
    this.activePage = activePageNumber;
    this.searchMovies(this.searchValue, activePageNumber);
  }

  searchMovies(searchValue: string, pageValue: number) {
    console.log('searchMovies');
    this.searchObs = this.moviesService.searchMovies(searchValue, pageValue);

    this.closeSub = this.searchObs.subscribe(
      (resData) => {
        console.log('resData');
        console.log(resData);
        if (resData.Response === 'False') {
          this.isError = true;
          // this.isVisibleGrid = false;
        } else {
          this.searchResult = new SearchModel(
            resData.Search,
            resData.totalResults,
            resData.Response,
            resData.Error
          );
          // this.isVisibleGrid = true;
          this.isError = false;
        }
      },
      (errorMessage) => {
        console.log('errorMessage');
        console.log(errorMessage);
        // this.messageError = errorMessage;
        this.isError = true;
        // this.isVisibleGrid = false;
      }
    );
  }

  onHandleBack() {
    console.log('onHandleBack');
    this.isDetailVisible = false;
    this.isTableVisible = true;
  }
}
