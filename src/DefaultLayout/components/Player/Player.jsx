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

import { useContext, useEffect, useRef, useState } from 'react';
import { MusicContext } from '~/context/MusicContext';
import MusicItem from '~/components/MusicItem';
import HeadlessTippy from '@tippyjs/react/headless';

import * as Requests from '~/utils/httpRequest';

const cx = classNames.bind(styles);

function Player() {
   const { isPlaying, setIsPlaying, currentSong, setCurrentSong } = useContext(MusicContext);
   const [songs, setSongs] = useState([]);
   const [showPlaylist, setShowPlaylist] = useState(false);

   const audioRef = useRef();
   const BASE_URL = import.meta.env.VITE_BASE_URL;

   useEffect(() => {
      const getAPISongs = async () => {
         try {
            const response = await Requests.get('/assets/data/songs.json');
            setSongs(response);
         } catch {
            console.log('Error');
         }
      };
      getAPISongs();
   }, []);

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

   const handlePlaylist = () => {
      if (showPlaylist) {
         setShowPlaylist(false);
      } else {
         setShowPlaylist(true);
      }
   };

   const handleNextSong = () => {
      const currentIndex = songs.findIndex((song) => song.id === currentSong.id);
      if (currentIndex === songs.length - 1) {
         setCurrentSong(songs[0]);
      } else {
         setCurrentSong(songs[currentIndex + 1]);
      }
   };

   const handleBackSong = () => {
      const currentIndex = songs.findIndex((song) => song.id === currentSong.id);
      if (currentIndex === 0) {
         setCurrentSong(songs[songs.length - 1]);
      } else {
         setCurrentSong(songs[currentIndex - 1]);
      }
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
                     <div className={cx('backward-btn')} onClick={handleBackSong}>
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
                     <div className={cx('forward-btn')} onClick={handleNextSong}>
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
                  <HeadlessTippy
                     interactive
                     visible={showPlaylist}
                     offset={[0, 39]}
                     render={() => (
                        <div className={cx('container-list')}>
                           <p className={cx('playlist-title')}>Playlist</p>
                           <div className={cx('current-song')}>
                              <MusicItem data={currentSong} small />
                           </div>
                           <p className={cx('next-title')}>Next</p>
                           <div className={cx('list-player')}>
                              {songs.map((song, index) => (
                                 <div key={index} className={cx('song-item')}>
                                    <MusicItem data={song} small />
                                 </div>
                              ))}
                           </div>
                        </div>
                     )}
                  >
                     <div className={cx('list')} onClick={handlePlaylist}>
                        <FontAwesomeIcon icon={faList} />
                     </div>
                  </HeadlessTippy>
               </div>
            </div>
            <audio ref={audioRef} id="audio" src={BASE_URL + currentSong.url}></audio>
         </div>
      </div>
   );
}

export default Player;
