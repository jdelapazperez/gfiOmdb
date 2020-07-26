import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MoviesComponent } from './components/movies/movies.component';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { MoviesDetailsComponent } from './components/movies/movies-details/movies-details.component';
import { AuthGuard } from './components/auth/auth.guard';
import { AuthComponent } from './components/auth/auth.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/movies', pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'movies', component: MoviesComponent, canActivate: [AuthGuard] },
  { path: 'favorites' , component: FavoritesComponent, canActivate: [AuthGuard]},
  { path: 'login' , component: AuthComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
