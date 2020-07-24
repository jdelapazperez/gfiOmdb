import { MovieModel } from './movie.model';

import { SearchResponse } from '../interfaces/SearchResponse';

export class SearchModel implements SearchResponse {
  constructor(
    public Search: MovieModel[],
    public totalResults: number,
    public Response: string,
    public Error: string,
    public lastSearch?: string
  ) {
    this.Search = Search;
    this.totalResults = totalResults;
    this.Response = Response;
    this.Error = Error;
    this.lastSearch = lastSearch;
  }
}
