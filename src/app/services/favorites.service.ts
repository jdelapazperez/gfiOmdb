import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Favorites } from '../models/favorites.model';
import { MovieDetailResponse } from '../interfaces/movieDetailResponse';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  favorites: Favorites;

  constructor() {
    this.getFavorites();
  }

  getFavorites(): Observable<Favorites> {
    this.favorites = JSON.parse(localStorage.getItem('favorites'));
    return of(this.favorites);
  }

  putFavorites(movieDetailResponse: MovieDetailResponse): boolean {
    let items: MovieDetailResponse[] = [];
    let favorites: Favorites;

    if (localStorage.getItem('favorites') === null) {
      items.push(movieDetailResponse);
      favorites = new Favorites();
      favorites.favoritesItems = items;
      localStorage.setItem('favorites', JSON.stringify(favorites));
    } else {
      favorites = JSON.parse(localStorage.getItem('favorites'));
      favorites.favoritesItems.push(movieDetailResponse);
      localStorage.setItem('favorites', JSON.stringify(favorites));
    }
    return true;
  }

  deleteFavorites(movieDetailResponse: MovieDetailResponse): boolean {
    console.log('FavoritesService::deleteFavorites');
    let items: MovieDetailResponse[] = [];
    let favorites: Favorites;
    const itemsNumber = this.favorites.favoritesItems.length;
    favorites = new Favorites();
    for (let item of this.favorites.favoritesItems) {
      if (item.imdbID !== movieDetailResponse.imdbID) {
        console.log('Encontrado');
        items.push(item);
        favorites.favoritesItems = items;
      }
      console.log(favorites);
    }
    if (itemsNumber === 1){
      localStorage.removeItem('favorites');
      console.log('Remove local');
    }else{
      localStorage.setItem('favorites', JSON.stringify(favorites));
    }
    return true;
  }

  existsItemFavorite(imdbID: string) {
    console.log('FavoritesService::existsItemFavorite');
    console.log(this.favorites);
    console.log('FavoritesService::existsItemFavorite_2');
    console.log(imdbID);
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
