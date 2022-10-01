import { useEffect, useState } from "react";
import { api } from "../services/api";
import { MovieCard } from "./MovieCard";
import { GenreResponseProps } from "./SideBar";

interface MovieProps {
  imdbID: string;
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}

interface Props {
  selectedGenre: GenreResponseProps | null
}

export function Content( props: Props ) {
  
  const [movies, setMovies] = useState<MovieProps[]>([]);

  useEffect(() => {
    if(props.selectedGenre) {
      api.get<MovieProps[]>(`movies/?Genre_id=${props.selectedGenre.id}`).then(response => {
        setMovies(response.data);
      });
    }

  }, [props.selectedGenre])

  if(!props.selectedGenre) return null

  return (
    <div className="container">
      <header>
        <span className="category">Categoria:<span> {props.selectedGenre?.title}</span></span>
      </header>

      <main>
        <div className="movies-list">
          {movies.map(movie => (
            <MovieCard key ={movie.imdbID} title={movie.Title} poster={movie.Poster} runtime={movie.Runtime} rating={movie.Ratings[0].Value} />
          ))}
        </div>
      </main>
    </div>
  )

}