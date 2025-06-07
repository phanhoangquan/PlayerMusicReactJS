import classNames from 'classnames/bind';
import styles from './Player.module.scss';
import Image from '~/components/Image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
   faBackwardStep,
   faEllipsis,
   faForwardStep,
   faList,
   faPauseCircle,
   faPlayCircle,
   faRandom,
   faRepeat,
   faVolumeUp,
} from '@fortawesome/free-solid-svg-icons';

import { useContext, useEffect, useRef } from 'react';
import { MusicContext } from '~/context/MusicContext';

const cx = classNames.bind(styles);

function Player() {
   const { isPlaying, setIsPlaying, currentSong, setCurrentSong } = useContext(MusicContext);

   const audioRef = useRef();
   const BASE_URL = import.meta.env.VITE_BASE_URL;

   useEffect(() => {
      audioRef.current.play();
   }, [currentSong]);

   useEffect(() => {
      if (isPlaying) {
         audioRef.current.play();
      } else {
         audioRef.current.pause();
      }
   }, [isPlaying]);

   const handlePlay = () => {
      setIsPlaying(true);
   };

   const handlePause = () => {
      setIsPlaying(false);
   };

   return (
      <div className={cx('wrapper')}>
         <div className={cx('player')}>
            <div className={cx('dashboard')}>
               <div className={cx('media')}>
                  <div className={cx('media-left')}>
                     <Image className={cx('cd-image')} src={currentSong.image} />
                  </div>
                  <div className={cx('media-title')}>
                     <strong className={cx('name')}>{currentSong.title}</strong>
                     <p className={cx('singer')}>{currentSong.singer}</p>
                  </div>
                  <div className={cx('media-right')}>
                     <div className={cx('more-icon')}>
                        <FontAwesomeIcon icon={faEllipsis} />
                     </div>
                  </div>
               </div>
               <div className={cx('control')}>
                  <div className={cx('control-bar')}>
                     <div className={cx('repeat-btn')}>
                        <FontAwesomeIcon icon={faRepeat} />
                     </div>
                     <div className={cx('backward-btn')}>
                        <FontAwesomeIcon icon={faBackwardStep} />
                     </div>
                     {!isPlaying && (
                        <div className={cx('play-btn')} onClick={handlePlay}>
                           <FontAwesomeIcon icon={faPlayCircle} />
                        </div>
                     )}
                     {isPlaying && (
                        <div className={cx('pause-btn')} onClick={handlePause}>
                           <FontAwesomeIcon icon={faPauseCircle} />
                        </div>
                     )}
                     <div className={cx('forward-btn')}>
                        <FontAwesomeIcon icon={faForwardStep} />
                     </div>
                     <div className={cx('random-btn')}>
                        <FontAwesomeIcon icon={faRandom} />
                     </div>
                  </div>
                  <div className={cx('duration-bar')}>
                     <div className={cx('long-button')}>
                        <input
                           id="progress"
                           className={cx('progress')}
                           type="range"
                           value="0"
                           step="1"
                           min="0"
                           max="100"
                        ></input>
                     </div>
                  </div>
               </div>
               <div className={cx('control-right')}>
                  <div className={cx('volume')}>
                     <FontAwesomeIcon icon={faVolumeUp} />
                  </div>
                  <div className={cx('list')}>
                     <FontAwesomeIcon icon={faList} />
                  </div>
               </div>
            </div>
            <audio ref={audioRef} id="audio" src={BASE_URL + currentSong.url}></audio>
         </div>
      </div>
   );
}

export default Player;
