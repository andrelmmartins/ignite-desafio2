import { useEffect, useState } from "react";
import { api } from "../services/api";
import { Button } from "./Button";

export interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

interface Props {
  changeSelectedGenre: (selectedGenre: GenreResponseProps) => void
  selectedGenre: GenreResponseProps | null
}

export function SideBar(props: Props) {

  const [genres, setGenres] = useState<GenreResponseProps[]>([]);

  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then(response => {
      setGenres(response.data);
      props.changeSelectedGenre(response.data[0])
    });
  }, []);

  return (
    <nav className="sidebar">
      <span>Watch<p>Me</p></span>

      <div className="buttons-container">
        {genres.map(genre => (
          <Button
            key={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={() => props.changeSelectedGenre(genre)}
            selected={props.selectedGenre?.id === genre.id}
          />
        ))}
      </div>

    </nav>
  )
}