import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { FavoritesService } from '../../services/favorites.service';
import { Favorites } from '../../models/favorites.model';
import { MovieDetailResponse } from '../../interfaces/movieDetailResponse';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.sass'],
})
export class FavoritesComponent implements OnInit, OnDestroy {
  favorites: Favorites;
  favoritesSub: Subscription;
  isDetailVisible = false;
  isCardVisible = false;
  isError = false;
  messageError: string;
  movieDetaileResponse: MovieDetailResponse;

  constructor(private favoritesService: FavoritesService, private router: Router) {
  }

  ngOnInit(): void {
    this.updateFavoritesData();
  }

  ngOnDestroy(): void {
  }

  onMovieDetails(favoriteItem: MovieDetailResponse) {
    this.movieDetaileResponse = favoriteItem;
    this.isDetailVisible = true;
  }

  onHandleBack() {
    this.isDetailVisible = false;
    this.updateFavoritesData();
  }

  updateFavoritesData() {
    this.favoritesSub = this.favoritesService
      .getFavorites()
      .subscribe((favorites) => (this.favorites = favorites));
    if (this.favorites) {
      this.isCardVisible = true;
    } else {
      this.isCardVisible = false;
      this.isError = true;
      this.messageError = 'There are no movies added to favorites.';
    }
  }

  onHandleError() {
    this.isError = false;
    this.messageError = null;
    this.router.navigate(['/movies']);
  }
}
