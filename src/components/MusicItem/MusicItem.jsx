import classNames from 'classnames/bind';
import styles from './MusicItem.module.scss';
import { Link } from 'react-router-dom';
import Image from '~/components/Image';
import { useContext } from 'react';
import { MusicContext } from '~/context/MusicContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis, faPause, faPlay } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function MusicItem({ data, large = false, small = false, just_img = false, playlistMusic = false }) {
   const { isPlaying, setIsPlaying, currentSong, setCurrentSong, setShowPlayer } = useContext(MusicContext);

   const classes = cx('wrapper', { large, small, just_img });
   const BASE_URL = import.meta.env.VITE_BASE_URL;

   const handlePlay = (e) => {
      e.preventDefault();
      setShowPlayer(true);
      setCurrentSong(data);
      setIsPlaying(true);
      if (playlistMusic) {
         playlistMusic();
      }
   };
   const handlePause = (e) => {
      e.preventDefault();
      setIsPlaying(false);
   };

   return (
      <Link to={`/song/${data.name}`} className={classes}>
         {(!isPlaying || currentSong?.id !== data.id) && (
            <div className={cx('cd')} onClick={handlePlay}>
               <Image className={cx('image')} src={BASE_URL + data.image}></Image>
               <div className={cx('play-btn')}>
                  <FontAwesomeIcon icon={faPlay} />
               </div>
            </div>
         )}

         {isPlaying && currentSong.id === data.id && (
            <div className={cx('cd')} onClick={handlePause}>
               <Image className={cx('image')} src={BASE_URL + data.image}></Image>
               <div className={cx('pause-btn')}>
                  <FontAwesomeIcon icon={faPause} />
               </div>
            </div>
         )}
         {!just_img && (
            <>
               <div className={cx('info')}>
                  <p className={cx('name')}>{data.title}</p>
                  <Link className={cx('singer')} to={`/singer/${data.singer}`}>
                     {data.singer}
                  </Link>
               </div>
               <div className={cx('more-btn')}>
                  <FontAwesomeIcon icon={faEllipsis} />
               </div>
            </>
         )}
      </Link>
   );
}

export default MusicItem;
