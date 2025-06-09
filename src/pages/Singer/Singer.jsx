import classNames from 'classnames/bind';
import styles from './Singer.module.scss';
import MusicItem from '~/components/MusicItem';

import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import * as Requests from '~/utils/httpRequest';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons';

import { useContext } from 'react';
import { MusicContext } from '~/context/MusicContext';

const cx = classNames.bind(styles);

function Song() {
   const { name } = useParams();
   const [singer, setSinger] = useState([]);
   const [moresongs, setMoreSongs] = useState([]);

   const { setCurrentSong, setIsPlaying, setShowPlayer, setSongs, setIsAlbum } = useContext(MusicContext);

   useEffect(() => {
      const songAPI = async () => {
         try {
            const response = await Requests.get('/assets/data/singers.json');
            const result = response.find((res) => res.singer === name);
            setSinger(result);
         } catch {
            console.log('ERROR SONG API');
         }
      };
      songAPI();
   }, [name]);

   useEffect(() => {
      const moreSongsAPI = async () => {
         try {
            const response = await Requests.get('/assets/data/songs.json');
            const moresongs = response.filter((res) => singer.singer === res.singer);
            setMoreSongs(moresongs);
         } catch {
            console.log('ERROR SONG API');
         }
      };
      moreSongsAPI();
   }, [singer]);

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
            <div className={cx('image')}>
               <img src={singer.avatar} />
            </div>
            <div className={cx('info')}>
               <p className={cx('name')}>{singer.singer}</p>
            </div>
            <p className={cx('play-container')} onClick={handlePlayAlbum}>
               <FontAwesomeIcon className={cx('play-btn')} icon={faPlayCircle} />
            </p>
         </div>
         <div className={cx('more')}>
            <div className={cx('title-more')}>
               All songs by <span className={cx('name-singer')}>{singer.singer}</span> :
            </div>
            <div className={cx('music')}>
               {moresongs.map((song, index) => (
                  <div className={cx('music-item')} key={index}>
                     <MusicItem data={song} large playlistMusic={playlistMusic} />
                  </div>
               ))}
            </div>
         </div>
      </div>
   );
}

export default Song;
