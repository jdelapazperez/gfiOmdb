import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';

import { MoviesService } from '../../services/movies.service';
import { SearchResponse } from '../../interfaces/searchResponse';
import { SearchModel } from '../../models/search.model';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.sass'],
})
export class MoviesComponent implements OnInit, OnDestroy {
  activePage = 1;
  search: SearchModel;
  isLoading = false;
  isError = false;
  searchObs: Observable<SearchResponse>;
  searchField: string;

  private closeSub: Subscription;

  constructor(private moviesService: MoviesService, private router: Router) {}

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }

    this.searchField = form.value.search;

    this.searchMovies(this.searchField, this.activePage);

    form.reset();
  }

  ngOnDestroy() {
    // console.log('ngOnDestroy');
    // console.log(this.closeSub);
    if (this.closeSub) {
      this.closeSub.unsubscribe();
    }
  }

  onHandleError() {
    this.isError = false;
    this.search = null;
  }

  searchMovies(searchValue: string, pageValue: number){
    this.isLoading = true;
    this.searchObs = this.moviesService.searchMovies(searchValue, pageValue);

    this.closeSub = this.searchObs.subscribe(
      (resData) => {
        if (resData.Response === 'False') {
          this.isError = true;
          this.search = new SearchModel(undefined, 0, 'False', resData.Error);
        } else {
          // console.log('resData');
          // console.log(resData);
          this.search = new SearchModel(
            resData.Search,
            resData.totalResults,
            resData.Response,
            resData.Error
          );
        }
        this.isLoading = false;
      },
      (errorMessage) => {
        // console.log('errorMessage');
        // console.log(errorMessage);
        this.search = new SearchModel(undefined, 0, 'False', errorMessage);
        this.isError = true;
        this.isLoading = false;
      }
    );
  }

  displayActivePage(activePageNumber: number) {
    // console.log('displayActivePage');
    // console.log(activePageNumber);
    this.activePage = activePageNumber;
    this.searchMovies(this.searchField, activePageNumber);
  }
}
