import { Component, computed, input } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { MovieAndCast } from '../data/MovieAndCast';
import { MovieSearch } from '../data/SearchResults';

const defaultPoster = "https://png.pngtree.com/png-clipart/20210310/original/pngtree-interrogative-symbol-png-image_5919235.jpg";
@Component({
  selector: 'app-movie',
  imports: [
    MatCardModule,
    MatButtonModule
  ],
  templateUrl: './movie.component.html',
  styleUrl: './movie.component.scss'
})
export class MovieComponent {
  public readonly data = input.required<MovieAndCast>();

  protected readonly posterURL = computed(
    () => this.data().poster_path === null ? defaultPoster : `https://image.tmdb.org/t/p/w500${this.data().poster_path}`
  )
}
