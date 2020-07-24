import { MovieResponse } from '../interfaces/movieResponse';

export class MovieModel implements MovieResponse
{

  constructor(
    public Title: string,
    public Year: number,
    public imdbID: string,
    public Type: string,
    public Poster: string
  ) {
    this.Title = Title;
    this.Year = Year;
    this.imdbID = imdbID;
    this.Type = Type;
    this.Poster = Poster;
  }
}
