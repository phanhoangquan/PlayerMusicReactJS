import classNames from 'classnames/bind';
import styles from './Favourite.module.scss';
import images from '~/assets/images/images';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons';
import MusicItem from '~/components/MusicItem';
import { useContext } from 'react';
import { MusicContext } from '~/context/MusicContext';

const cx = classNames.bind(styles);

function Favourite() {
   const songs = JSON.parse(localStorage.getItem('favouriteSongs')) || [];
   const { setCurrentSong, setIsPlaying, setShowPlayer, setSongs, setIsAlbum } = useContext(MusicContext);

   const handlePlay = () => {
      setCurrentSong(songs[0]);
      setShowPlayer(true);
      setIsPlaying(true);
      setSongs(songs);
      setIsAlbum(true);
   };

   const playlistMusic = () => {
      setSongs(songs);
      setIsAlbum(true);
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
               <p className={cx('number')}>{songs.length} Musics</p>
            </div>
         </div>
         <div className={cx('container')}>
            <div className={cx('play-btn')} onClick={handlePlay}>
               <FontAwesomeIcon icon={faPlayCircle} />
            </div>
            <div className={cx('music')}>
               {songs.map((song, index) => (
                  <div className={cx('music-item')} key={index}>
                     <span>{index + 1}</span>
                     <MusicItem className={cx('item')} data={song} playlistMusic={playlistMusic} />
                  </div>
               ))}
            </div>
         </div>
      </div>
   );
}

export default Favourite;
