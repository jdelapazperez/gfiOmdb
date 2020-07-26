import { Component, OnInit, OnDestroy } from '@angular/core';
import { MovieDetailResponse } from 'src/app/interfaces/movieDetailResponse';
import { BehaviorSubject, Observable } from 'rxjs';
import { MovieDetailModel } from 'src/app/models/movie-detail.model';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.sass'],
})
export class FavoritesComponent implements OnInit, OnDestroy {

  constructor() {
    console.log('FavoritesComponent constructor');

  }

  ngOnInit(): void {
    console.log('FavoritesComponent ngOnInit');

  }

  ngOnDestroy(): void {
    console.log('FavoritesComponent ngOnDestroy');
  }
}
