import { afterRender, effect, Injectable, signal } from '@angular/core';
import { MovieSearch, SearchResults } from '../data/SearchResults';
import { searchMovie } from '../data/API/get.search.movie';
import { getMovieCredit } from '../data/API/get.movie.credits';
import { MovieCredits } from '../data/MovieCredit';
import { MovieAndCast } from '../data/MovieAndCast';

const errNoApiKey = new Error('API key not set');
const tmdbApiKeyName = 'tmdbApiKey';

@Injectable({
  providedIn: 'root'
})
export class TmdbService {
  public readonly apiKey = signal<string | undefined>(undefined)
  private readonly _effApiKey = effect(
    () => {
      const key = this.apiKey();
      if (key !== undefined) {
        localStorage.setItem(tmdbApiKeyName, key)
      }
    }
  )

  constructor() {
    afterRender(
      () => this.apiKey.set(localStorage.getItem(tmdbApiKeyName) ?? undefined)
    )
  }

  searchMovie(query: string): Promise<SearchResults> {
    const key = this.apiKey();
    if (key === undefined) {
      return Promise.reject(errNoApiKey);
    }

    return searchMovie(query, key);
  }

  getMovieCredits(movieId: number): Promise<MovieCredits> {
    const key = this.apiKey();
    if (key === undefined) {
      return Promise.reject(errNoApiKey);
    }

    return getMovieCredit(movieId, key);
  }

  searchMovieAndCast(query: string): Promise<readonly MovieAndCast[]> {
    return this.searchMovie(query).then(
      SR => SR.results.map(
        MS => this.getMovieCredits(MS.id).then(
          credit => ({
            ...MS,
            cast: credit.cast
          } satisfies MovieAndCast)
        )
      )
    ).then(
      promesses => Promise.all(promesses)
    )
  }
} 
