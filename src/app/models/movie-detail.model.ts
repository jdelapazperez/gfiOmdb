import { MovieDetailResponse } from '../interfaces/movieDetailResponse';

export class MovieDetailModel implements MovieDetailResponse {

  constructor(public Title: string,
              public Year: string,
              public Rated: string,
              public Released: string,
              public Runtime: string,
              public Genre: string,
              public Director: string,
              public Writer: string,
              public Actors: string,
              public Plot: string,
              public Language: string,
              public Country: string,
              public Awards: string,
              public Poster: string,
              public Metascore: string,
              public imdbRating: string,
              public imdbVotes: string,
              public imdbID: string,
              public Type: string,
              public DVD: string,
              public BoxOffice: string,
              public Production: string,
              public Website: string,
              public Response: string,
  ){
    this.Title =                 Title;
    this.Year =                  Year;
    this.Rated =                 Rated;
    this.Released =              Released;
    this.Runtime =               Runtime;
    this.Genre =                 Genre;
    this.Director =              Director;
    this.Writer =                Writer;
    this.Actors =                Actors;
    this.Plot =                  Plot;
    this.Language =              Language;
    this.Country =               Country;
    this.Awards =                Awards;
    this.Poster =                Poster;
    this.Metascore =             Metascore;
    this.imdbRating =            imdbRating;
    this.imdbVotes =             imdbVotes;
    this.imdbID =                imdbID;
    this.Type =                  Type;
    this.DVD =                   DVD;
    this.BoxOffice =             BoxOffice;
    this.Production =            Production;
    this.Website =               Website;
    this.Response =              Response;
  }

}
