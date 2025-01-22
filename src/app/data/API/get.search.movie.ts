import { parseSearchResult, SearchResults } from "../SearchResults";

/**
 * From https://developer.themoviedb.org/reference/search-movie
 */
export function searchMovie(query: string, apiKey: string): Promise<SearchResults> {
    const queryEncoded = encodeURIComponent(query);
    return fetch(
        `https://api.themoviedb.org/3/search/movie?language=fr-FR&page=1&query=${queryEncoded}`,
        {
            headers: {
                Authorization: `Bearer ${apiKey}`
            }
        }
    ).then(
        r => r.status === 200 ? r.json() : Promise.reject(new Error(`${r.status} ${r.statusText}`))
    ).then(
        parseSearchResult
    );
}