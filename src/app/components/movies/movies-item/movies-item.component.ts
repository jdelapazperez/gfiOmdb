import { Component, OnInit, Input } from '@angular/core';
import { MovieModel } from '../../../models/movie.model';

@Component({
  selector: 'app-movies-item',
  templateUrl: './movies-item.component.html',
  styleUrls: ['./movies-item.component.sass']
})
export class MoviesItemComponent implements OnInit {
  @Input() movie: MovieModel;
  @Input() index: number;
  constructor() { }

  ngOnInit(): void {
    console.log('MoviesItemComponent::ngOnInit');
    console.log(this.movie);
  }

}
