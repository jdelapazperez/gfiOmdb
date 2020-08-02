import {
  Component,
  OnInit,
  Input,
  EventEmitter,
  Output,
  OnDestroy,
} from '@angular/core';
import { Subscription } from 'rxjs';

import { MovieDetailResponse } from '../../../interfaces//movieDetailResponse';
import { Favorites } from '../../../models/favorites.model';
import { FavoritesService } from '../../../services/favorites.service';

@Component({
  selector: 'app-movies-details',
  templateUrl: './movies-details.component.html',
  styleUrls: ['./movies-details.component.sass'],
})
export class MoviesDetailsComponent implements OnInit, OnDestroy {
  isError = false;
  isAddFavoritesPress = false;
  favorites: Favorites;
  @Input() movieDetail: MovieDetailResponse;
  @Output() backEmiter = new EventEmitter<void>();
  messageAlert: string;
  favoritesSub: Subscription;

  constructor(private favoritesService: FavoritesService) {}

  ngOnInit(): void {
    this.isAddFavoritesPress = false;

    this.favoritesSub = this.favoritesService
      .getFavorites()
      .subscribe((fav) => (this.favorites = fav));

    this.isAddFavoritesPress = this.favoritesService.existsItemFavorite(
      this.movieDetail.imdbID
    );
  }

  ngOnDestroy() {
    this.favoritesSub.unsubscribe();
  }

  onBack() {
    this.backEmiter.emit();
  }

  onAddFavorites() {
    this.isAddFavoritesPress = true;

    this.isError = this.favoritesService.putFavorites(this.movieDetail);
    if (this.isError === true) {
      this.messageAlert =
        'Movie ' + this.movieDetail.Title + ' added susccesfully';
    } else {
      this.messageAlert =
        'Movie ' + this.movieDetail.Title + ' Not added favorites';
    }
  }

  onHandleAlert() {
    this.isError = false;
    this.messageAlert = null;
  }

  onRemoveFavorites() {
    this.isAddFavoritesPress = false;

    this.isError = this.favoritesService.deleteFavorites(this.movieDetail);
    if (this.isError === true) {
      this.messageAlert =
        'Movie ' + this.movieDetail.Title + ' remove susccesfully';
    } else {
      this.messageAlert =
        'Movie ' + this.movieDetail.Title + ' Not remove favorites';
    }
  }
}
