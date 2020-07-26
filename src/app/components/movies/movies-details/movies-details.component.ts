import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { MovieDetailResponse } from '../../../interfaces//movieDetailResponse';

@Component({
  selector: 'app-movies-details',
  templateUrl: './movies-details.component.html',
  styleUrls: ['./movies-details.component.sass'],
})
export class MoviesDetailsComponent implements OnInit {
  isError = false;
  @Input() movieDetail: MovieDetailResponse;
  @Output() backEmiter = new EventEmitter<void>();
  messageAlert: string;

  constructor() {}

  ngOnInit(): void {}

  onBack() {
    this.backEmiter.emit();
  }

  onAddFavorites() {
    localStorage.setItem('favorites', JSON.stringify(this.movieDetail));
    this.isError = true;
    this.messageAlert = 'Movie ' + this.movieDetail.Title + ' added to susccesfully';
  }

  onHandleAlert() {
    this.isError = false;
    this.messageAlert = null;
  }

}
