export class MovieDetailModel {
  public Title: string;
  public Year: string;
  public Rated: string;
  public Released: string;
  public Runtime: string;
  public Genre: string;
  public Director: string;
  public Writer: string;
  public Actors: string;
  public Plot: string;
  public Poster: string;

  constructor(
    Title: string,
    Year: string,
    Rated: string,
    Released: string,
    Runtime: string,
    Genre: string,
    Director: string,
    Writer: string,
    Actors: string,
    Plot: string,
    Poster: string
  ) {
    this.Title = Title;
    this.Year = Year;
    this.Rated = Rated;
    this.Released = Released;
    this.Runtime = Runtime;
    this.Genre = Genre;
    this.Director = Director;
    this.Writer = Writer;
    this.Actors = Actors;
    this.Plot = Plot;
    this.Poster = Poster;
  }
}
