import { Injectable } from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';

import { Favorites } from '../models/favorites.model';
import { MovieDetailResponse } from '../interfaces/movieDetailResponse';
import { AuthService } from '../services/auth.service';
import { AuthResponse } from '../interfaces/AuthResponse';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  favorites: Favorites;
  authSub: Subscription;
  authResponse: AuthResponse;

  constructor(private authService: AuthService) {
    this.authSub = this.authService.user.subscribe(
      (user) => (this.authResponse = user)
    );
    this.getFavorites();
  }

  getFavorites(): Observable<Favorites> {
    if (this.authResponse !== null) {
      this.favorites = JSON.parse(
        localStorage.getItem('favorites' + this.authResponse.email)
      );
      return of(this.favorites);
    }
  }

  putFavorites(movieDetailResponse: MovieDetailResponse): boolean {
    let items: MovieDetailResponse[] = [];
    let favorites: Favorites;

    if (localStorage.getItem('favorites' + this.authResponse.email) === null) {
      items.push(movieDetailResponse);
      favorites = new Favorites();
      favorites.favoritesItems = items;
      localStorage.setItem(
        'favorites' + this.authResponse.email,
        JSON.stringify(favorites)
      );
    } else {
      favorites = JSON.parse(
        localStorage.getItem('favorites' + this.authResponse.email)
      );
      favorites.favoritesItems.push(movieDetailResponse);
      localStorage.setItem(
        'favorites' + this.authResponse.email,
        JSON.stringify(favorites)
      );
    }
    return true;
  }

  deleteFavorites(movieDetailResponse: MovieDetailResponse): boolean {
    let items: MovieDetailResponse[] = [];
    let favorites: Favorites;
    let itemsNumber = 0;
    this.getFavorites();
    if (this.favorites !== null) {
      itemsNumber = this.favorites.favoritesItems.length;
      favorites = new Favorites();
      for (let item of this.favorites.favoritesItems) {
        if (item.imdbID !== movieDetailResponse.imdbID) {
          items.push(item);
          favorites.favoritesItems = items;
        }
      }
      if (itemsNumber === 1) {
        localStorage.removeItem('favorites' + this.authResponse.email);
      } else {
        localStorage.setItem(
          'favorites' + this.authResponse.email,
          JSON.stringify(favorites)
        );
      }
    }

    return true;
  }

  existsItemFavorite(imdbID: string) {
    if (!this.favorites) {
      return false;
    }
    for (const favorite of this.favorites.favoritesItems) {
      if (favorite.imdbID === imdbID) {
        return true;
      }
    }
    return false;
  }
}
