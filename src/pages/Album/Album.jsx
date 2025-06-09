import classNames from 'classnames/bind';
import styles from './Album.module.scss';
import MusicItem from '~/components/MusicItem';

import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import * as Requests from '~/utils/httpRequest';
import Button from '~/components/Button';

import { useContext } from 'react';
import { MusicContext } from '~/context/MusicContext';

const cx = classNames.bind(styles);

function Song() {
   const { setCurrentSong, setIsPlaying, setShowPlayer, setSongs, setIsAlbum } = useContext(MusicContext);

   const { name } = useParams();
   const [album, setAlbum] = useState([]);
   const [moresongs, setMoreSongs] = useState([]);

   useEffect(() => {
      const albumAPI = async () => {
         try {
            const response = await Requests.get('/assets/data/albums.json');
            const album = response.find((res) => res.album === name);
            setAlbum(album);
         } catch {
            console.log('ERROR SONG API');
         }
      };
      albumAPI();
   }, [name]);

   useEffect(() => {
      const moreSongsAPI = async () => {
         try {
            const response = await Requests.get('/assets/data/songs.json');
            const result = response.filter((res) => album.album === res.album);
            setMoreSongs(result);
         } catch {
            console.log('ERROR SONG API');
         }
      };
      moreSongsAPI();
   }, [album]);

   const handlePlayAlbum = () => {
      setShowPlayer(true);
      setCurrentSong(moresongs[0]);
      setIsPlaying(true);
      setSongs(moresongs);
      setIsAlbum(true);
   };

   const playlistMusic = () => {
      setSongs(moresongs);
      setIsAlbum(true);
   };

   return (
      <div className={cx('wrapper')}>
         <div className={cx('wrapper-info')}>
            <div className={cx('left-container')}>
               <img className={cx('image')} src={album.image}></img>
               <Button className={cx('play-btn')} lighthigh onClick={handlePlayAlbum}>
                  Play Album
               </Button>
            </div>
            <div className={cx('info')}>
               <p className={cx('title')}>{album.album}</p>
               {moresongs.map((song, index) => (
                  <div key={index} className={cx('music-item')}>
                     <MusicItem data={song} playlistMusic={playlistMusic} />
                  </div>
               ))}
            </div>
         </div>
      </div>
   );
}

export default Song;
