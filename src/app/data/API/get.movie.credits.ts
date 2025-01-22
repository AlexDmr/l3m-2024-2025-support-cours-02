import { MovieCredits, parseMovieCredits } from "../MovieCredit";

/**
 * From https://developer.themoviedb.org/reference/movie-credits
 */
export function getMovieCredit(movieId: number, apiKey: string): Promise<MovieCredits> {
    return fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/credits?language=fr-FR`,
        {
            headers: {
                Authorization: `Bearer ${apiKey}`
            }
        }
    ).then(
        r => r.status === 200 ? r.json() : Promise.reject(new Error(`${r.status} ${r.statusText}`))
    ).then(
        parseMovieCredits
    );
}