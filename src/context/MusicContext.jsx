import { useState, createContext } from 'react';

export const MusicContext = createContext();

function MusicProvider({ children }) {
   const [currentSong, setCurrentSong] = useState({});
   const [isPlaying, setIsPlaying] = useState(false);
   const [showPlayer, setShowPlayer] = useState(false);
   const [songs, setSongs] = useState([]);

   return (
      <MusicContext.Provider
         value={{ currentSong, setCurrentSong, isPlaying, setIsPlaying, showPlayer, setShowPlayer, songs, setSongs }}
      >
         {children}
      </MusicContext.Provider>
   );
}

export default MusicProvider;
