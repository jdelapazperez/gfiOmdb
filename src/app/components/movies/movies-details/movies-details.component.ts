import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { MovieDetailResponse } from '../../../interfaces//movieDetailResponse';
import { MovieDetailModel } from 'src/app/models/movie-detail.model';

@Component({
  selector: 'app-movies-details',
  templateUrl: './movies-details.component.html',
  styleUrls: ['./movies-details.component.sass'],
})
export class MoviesDetailsComponent implements OnInit {
  isError = false;
  @Input() movieDetail: MovieDetailResponse;

  constructor() {}

  ngOnInit(): void {}
}
