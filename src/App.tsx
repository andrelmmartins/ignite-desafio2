import { useState } from 'react';

import './styles/global.scss';

import './styles/sidebar.scss';
import './styles/content.scss';
import { GenreResponseProps, SideBar } from './components/SideBar';
import { Content } from './components/Content';

export function App() {

  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps | null >(null);

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <SideBar selectedGenre={selectedGenre} changeSelectedGenre={setSelectedGenre} />
      <Content selectedGenre={selectedGenre}/>
    </div>
  )
}