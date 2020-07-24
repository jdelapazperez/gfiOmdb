import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-movies-details',
  templateUrl: './movies-details.component.html',
  styleUrls: ['./movies-details.component.sass']
})
export class MoviesDetailsComponent implements OnInit, OnDestroy {
  @Output() emitEvent:EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private route: ActivatedRoute, private router: Router){}

  ngOnInit(): void {
    // console.log('MoviesDetailsComponent');
  }

  ngOnDestroy() {
    console.log('ngOnDestroy');
    this.emitEvent.emit(true);
  }

  onMovieSearch() {
    this.router.navigate(['/movies'], { relativeTo: this.route });
  }
}
