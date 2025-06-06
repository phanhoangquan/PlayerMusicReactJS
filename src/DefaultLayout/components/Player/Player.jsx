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

import { useContext, useRef } from 'react';
import { MusicContext } from '~/context/MusicContext';

const cx = classNames.bind(styles);

function Player() {
   const { isPlaying, setIsPlaying, currentSong, setCurrentSong } = useContext(MusicContext);

   const audioRef = useRef();

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
                     <div className={cx('play-btn')}>
                        <FontAwesomeIcon icon={faPlayCircle} />
                     </div>
                     <div className={cx('pause-btn')}>
                        <FontAwesomeIcon icon={faPauseCircle} />
                     </div>
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
            <audio ref={audioRef} id="audio" src={currentSong.url}></audio>
         </div>
      </div>
   );
}

export default Player;
