import { Component, inject, signal } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TmdbService } from './services/tmdb.service';
import { FormsModule } from '@angular/forms';
import { MovieComponent } from './movie/movie.component';
import { MovieAndCast } from './data/MovieAndCast';
@Component({
  selector: 'app-root',
  imports: [
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MovieComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  private readonly _tmdbSrv = inject(TmdbService);
  protected apiKey = this._tmdbSrv.apiKey;

  private readonly _movies = signal<readonly MovieAndCast[]>([]);
  protected readonly movies = this._movies.asReadonly();

  searchMovie(query: string) {
    this._tmdbSrv.searchMovie(query).then(
      R => Promise.all( R.results.map(
        movie => this._tmdbSrv.getMovieCredits(movie.id).then(
          credits => ({...movie, cast: credits.cast})
        )
      ))
    ).then(
      L => this._movies.set(L)
    ).catch(
      err => console.error(err)
    )
  }

}
