import { Component, OnInit, Input, OnDestroy } from '@angular/core';

import { SearchModel } from '../../../models/search.model';
import { MovieDetailResponse } from 'src/app/interfaces/movieDetailResponse';
import { MoviesService } from 'src/app/services/movies.service';
import { Observable, Subscription } from 'rxjs';
import { MovieDetailModel } from 'src/app/models/movie-detail.model';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.sass'],
})
export class MoviesListComponent implements OnInit, OnDestroy {
  @Input() searchResult: SearchModel;
  movieDetailResponse: MovieDetailResponse;
  movieDetailObs: Observable<MovieDetailResponse>;
  movie: MovieDetailModel;
  private closeSub: Subscription;
  isError = false;

  isTableVisible = false;
  isDetailVisible = false;

  constructor(private moviesService: MoviesService) {}

  ngOnInit() {
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
}
