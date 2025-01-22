import { MovieCast } from "./MovieCredit";
import { MovieSearch } from "./SearchResults";


export interface MovieAndCast extends MovieSearch {
    readonly cast: readonly MovieCast[];
}
