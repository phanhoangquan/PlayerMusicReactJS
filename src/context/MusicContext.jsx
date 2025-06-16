import { useState, createContext } from 'react';

export const MusicContext = createContext();

function MusicProvider({ children }) {
   const [currentSong, setCurrentSong] = useState({});
   const [isPlaying, setIsPlaying] = useState(false);
   const [showPlayer, setShowPlayer] = useState(false);
   const [songs, setSongs] = useState([]);
   const [isAlbum, setIsAlbum] = useState(false);
   const [login, setLogin] = useState(false);
   const [showLogin, setShowLogin] = useState(false);
   const [showNav, setShowNav] = useState(false);

   return (
      <MusicContext.Provider
         value={{
            currentSong,
            setCurrentSong,
            isPlaying,
            setIsPlaying,
            showPlayer,
            setShowPlayer,
            songs,
            setSongs,
            isAlbum,
            setIsAlbum,
            login,
            setLogin,
            showLogin,
            setShowLogin,
            showNav,
            setShowNav,
         }}
      >
         {children}
      </MusicContext.Provider>
   );
}

export default MusicProvider;
