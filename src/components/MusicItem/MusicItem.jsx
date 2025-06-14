import classNames from 'classnames/bind';
import styles from './MusicItem.module.scss';
import { Link } from 'react-router-dom';
import Image from '~/components/Image';
import { useContext } from 'react';
import { MusicContext } from '~/context/MusicContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis, faPause, faPlay } from '@fortawesome/free-solid-svg-icons';
import { faEye, faHeart } from '@fortawesome/free-regular-svg-icons';

const cx = classNames.bind(styles);

function MusicItem({
   data,
   className,
   large = false,
   small = false,
   just_img = false,
   rating_view = false,
   rating_favourite = false,
   playlistMusic = false,
}) {
   const { isPlaying, setIsPlaying, currentSong, setCurrentSong, setShowPlayer, setIsAlbum } = useContext(MusicContext);

   const classes = cx('wrapper', { [className]: className, large, small, just_img, rating_view, rating_favourite });

   const handlePlay = (e) => {
      e.preventDefault();
      setShowPlayer(true);
      setCurrentSong(data);
      setIsPlaying(true);
      setIsAlbum(false);
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
               <Image className={cx('image')} src={data.image}></Image>
               <div className={cx('play-btn')}>
                  <FontAwesomeIcon icon={faPlay} />
               </div>
            </div>
         )}

         {isPlaying && currentSong.id === data.id && (
            <div className={cx('cd')} onClick={handlePause}>
               <Image className={cx('image')} src={data.image}></Image>
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
               {rating_view && (
                  <div className={cx('name-mid')}>
                     {data.view} View <FontAwesomeIcon icon={faEye} />
                  </div>
               )}
               {rating_favourite && (
                  <div className={cx('name-mid')}>
                     {data.favourite} Favourite <FontAwesomeIcon icon={faHeart} />
                  </div>
               )}
               <div className={cx('more-btn')}>
                  <FontAwesomeIcon icon={faEllipsis} />
               </div>
            </>
         )}
      </Link>
   );
}

export default MusicItem;
