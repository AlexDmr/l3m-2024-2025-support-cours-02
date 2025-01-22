/**
 * From https://developer.themoviedb.org/reference/movie-credits
 */
export interface MovieCredits {
    readonly id: number;
    readonly cast: readonly MovieCast[];
}

export interface MovieCast {
    readonly adult: boolean;
    readonly gender: number;
    readonly id: number;
    readonly known_for_department: string;
    readonly name: string;
    readonly original_name: string;
    readonly popularity: number;
    readonly profile_path: string | null;
    readonly cast_id: number;
    readonly character: string;
    readonly credit_id: string;
    readonly order: number;
}

/**
 * Zod schema for MovieCredits
 */
import * as zod from 'zod';

const movieCastSchema = zod.object({
    adult: zod.boolean(),
    gender: zod.number(),
    id: zod.number(),
    known_for_department: zod.string(),
    name: zod.string(),
    original_name: zod.string(),
    popularity: zod.number(),
    profile_path: zod.string().nullable(),
    cast_id: zod.number(),
    character: zod.string(),
    credit_id: zod.string(),
    order: zod.number(),
}).readonly();

const movieCreditsSchema = zod.object({
    id: zod.number(),
    cast: zod.array(movieCastSchema).readonly(),
}).readonly();

export function parseMovieCredits(data: unknown): Promise<MovieCredits> {
    return movieCreditsSchema.parseAsync(data);
}