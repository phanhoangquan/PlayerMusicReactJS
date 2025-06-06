import classNames from 'classnames/bind';
import styles from './MusicItem.module.scss';
import { Link } from 'react-router-dom';
import Image from '~/components/Image';
import { useContext } from 'react';
import { MusicContext } from '~/context/MusicContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPause, faPlay } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function MusicItem({ data, large = false }) {
   const { isPlaying, setIsPlaying, currentSong, setCurrentSong } = useContext(MusicContext);

   const classes = cx('wrapper', { large });
   const BASE_URL = import.meta.env.VITE_BASE_URL;

   const handlePlay = (e) => {
      e.preventDefault();
      setIsPlaying(true);
      setCurrentSong(data);
   };
   const handlePause = (e) => {
      e.preventDefault();
      setIsPlaying(false);
   };

   return (
      <Link to={`/@${data.name}`} className={classes}>
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
         <div className={cx('info')}>
            <p className={cx('name')}>{data.title}</p>
            <p className={cx('singer')}>{data.singer}</p>
         </div>
      </Link>
   );
}

export default MusicItem;
