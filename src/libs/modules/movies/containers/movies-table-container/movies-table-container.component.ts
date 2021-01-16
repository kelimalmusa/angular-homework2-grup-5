import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { element } from 'protractor';
import { combineLatest, of, Subscription } from 'rxjs';
import { debounceTime, startWith } from 'rxjs/operators';
import { IMovie } from '../../models/movie-models';
import { MoviesHttpService } from '../../services/movies-http.service';

@Component({
  selector: 'app-movies-table-container',
  templateUrl: './movies-table-container.component.html',
  styleUrls: ['./movies-table-container.component.scss'],
})
export class MoviesTableContainerComponent implements OnInit {
  movies: IMovie[];
  filteredMovies: IMovie[];
  searchField = new FormControl();

  constructor(private moviesHttpService: MoviesHttpService) {}

  ngOnInit(): void {
    this.moviesHttpService.getTop100Movies().subscribe((data) => {
      this.movies = data;
      this.searchField.valueChanges.subscribe((val: string) => {
        this.filteredMovies = this.search(val.toLowerCase());
      });
    });
  }

  search(val: string): IMovie[] {
    return this.movies.filter((element) =>
      element.name.toLowerCase().includes(val)
    );
  }
}
