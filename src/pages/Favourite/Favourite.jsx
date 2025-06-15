import classNames from 'classnames/bind';
import styles from './Favourite.module.scss';
import images from '~/assets/images/images';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons';
import MusicItem from '~/components/MusicItem';
import { useContext, useEffect, useState } from 'react';
import { MusicContext } from '~/context/MusicContext';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function Favourite() {
   const { setCurrentSong, setIsPlaying, setShowPlayer, setSongs, setIsAlbum } = useContext(MusicContext);
   const [faSongs, setFaSongs] = useState([]);

   useEffect(() => {
      const songs = JSON.parse(localStorage.getItem('favouriteSongs')) || [];
      setFaSongs(songs);
   }, []);

   const handlePlay = () => {
      if (faSongs.length === 0) return;
      setCurrentSong(faSongs[0]);
      setShowPlayer(true);
      setIsPlaying(true);
      setSongs(faSongs);
      setIsAlbum(true);
   };

   const playlistMusic = () => {
      setSongs(faSongs);
      setIsAlbum(true);
   };

   const handleDelete = (index) => {
      const updated = [...faSongs];
      updated.splice(index, 1);
      setFaSongs(updated);
      localStorage.setItem('favouriteSongs', JSON.stringify(updated));
   };

   return (
      <div className={cx('wrapper')}>
         <div className={cx('info')}>
            <div className={cx('image')}>
               <img src={images.fa_album}></img>
            </div>
            <div className={cx('title')}>
               <p className={cx('playlist')}>Playlist</p>
               <h1>Favourite Music</h1>
               <p className={cx('number')}>{faSongs.length} Musics</p>
            </div>
         </div>
         <div className={cx('container')}>
            <div className={cx('play-btn')} onClick={handlePlay}>
               <FontAwesomeIcon icon={faPlayCircle} />
            </div>
            <div className={cx('music')}>
               {faSongs.map((song, index) => (
                  <div className={cx('music-item')} key={index}>
                     <span>{index + 1}</span>
                     <MusicItem className={cx('item')} data={song} playlistMusic={playlistMusic} />
                     <button
                        className={cx('delete-btn')}
                        onClick={() => {
                           handleDelete(index);
                        }}
                     >
                        Delete
                     </button>
                  </div>
               ))}
            </div>
         </div>
      </div>
   );
}

export default Favourite;
