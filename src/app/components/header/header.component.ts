import { Component, OnInit, OnDestroy } from '@angular/core';

import { AuthService } from '../../services/auth.service';
import { AuthResponse } from '../../interfaces/AuthResponse';
import { FavoritesService } from '../../services/favorites.service';
import { Favorites } from '../.../../../models/favorites.model';
import { Subscription } from 'rxjs';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  authResponse: AuthResponse;
  favorites: Favorites;
  isFavoritesAdded = false;
  authSub: Subscription;
  favoritesSub: Subscription;

  constructor(
    private authService: AuthService,
    private favoritesService: FavoritesService
  ) {
    console.log('HeaderComponent::constructor');
    this.authSub = this.authService.user.subscribe(
      (user) => (this.authResponse = user)
    );
    if (this.authResponse !== null) {
      this.favoritesSub = this.favoritesService
        .getFavorites()
        .subscribe((favorites) => (this.favorites = favorites));
    }
    console.log(this.favorites);
  }

  ngOnInit(): void {
    if (this.authResponse !== null) {
      if (
        localStorage.getItem('favorites' + this.authResponse.email) !== null
      ) {
        this.isFavoritesAdded = true;
      }
    }
  }

  ngOnDestroy(): void {
    this.authSub.unsubscribe();
    this.favoritesSub.unsubscribe();
  }

  onLogout() {
    this.authService.onLogout();
  }
}
