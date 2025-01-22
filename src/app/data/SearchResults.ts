
/**
 * Search movie results
 * https://developer.themoviedb.org/reference/search-movie
 */
export interface SearchResults {
    readonly page: number;
    readonly total_results: number;
    readonly total_pages: number;
    readonly results: readonly MovieSearch[];
}

export interface MovieSearch {
    readonly id: number;
    readonly title: string;
    readonly overview: string;
    readonly poster_path: string | null;
    readonly backdrop_path: string | null;
    readonly release_date: string;
}

/**
 * Zod schema for SearchResults
 */
import * as zod from 'zod';

const MovieSearchSchema = zod.object({
    id: zod.number(),
    title: zod.string(),
    overview: zod.string(),
    poster_path: zod.string().nullable(),
    backdrop_path: zod.string().nullable(),
    release_date: zod.string(),
}).readonly();

const SearchResultsSchema = zod.object({
    page: zod.number(),
    total_results: zod.number(),
    total_pages: zod.number(),
    results: zod.array(MovieSearchSchema).readonly(),
}).readonly()

export function parseSearchResult(data: unknown): Promise<SearchResults> {
    return SearchResultsSchema.parseAsync(data);
}
