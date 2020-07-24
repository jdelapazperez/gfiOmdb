import {
  Component,
  OnInit,
  Input
} from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';

import { SearchModel } from '../../../models/search.model';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.sass'],
})
export class MoviesListComponent implements OnInit {
  @Input() searchResult: SearchModel;
  isTableVisible = false;
  isDetailVisible = false;


  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    if (this.searchResult.Response === 'True') {
      this.isTableVisible = true;
    } else {
      this.isTableVisible = false;
    }
  }

  onMovieDetails(imdbID: string) {
    this.isDetailVisible = true;
    this.router.navigate([imdbID + '/details'], { relativeTo: this.route });
  }
}
