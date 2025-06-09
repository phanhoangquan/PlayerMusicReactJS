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
   const { isPlaying, setIsPlaying, currentSong, setCurrentSong, songs, setSongs, isAlbum } = useContext(MusicContext);

   const [showPlaylist, setShowPlaylist] = useState(false);
   const [currentTime, setCurrentTime] = useState(0);
   const [duration, setDuration] = useState(0);
   const [isRepeat, setIsRepeat] = useState(false);
   const [isRandom, setIsRandom] = useState(false);
   const [volume, setVolume] = useState(0.5);

   const audioRef = useRef();

   useEffect(() => {
      if (isAlbum) {
         return;
      } else {
         const getAPISongs = async () => {
            try {
               const response = await Requests.get('/assets/data/songs.json');
               setSongs(response);
            } catch {
               console.log('Error');
            }
         };
         getAPISongs();
      }
   }, [isAlbum]);

   useEffect(() => {
      const audio = audioRef.current;
      const handleLoadedMetadata = () => {
         setDuration(audio.duration);
      };

      audio.addEventListener('loadedmetadata', handleLoadedMetadata);

      return () => {
         audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      };
   }, [currentSong]);

   useEffect(() => {
      const audio = audioRef.current;

      const handleTimeUpdate = () => {
         setCurrentTime(audio.currentTime);
      };

      audio.addEventListener('timeupdate', handleTimeUpdate);

      return () => {
         audio.removeEventListener('timeupdate', handleTimeUpdate);
      };
   }, []);

   useEffect(() => {
      audioRef.current.volume = volume;
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
      if (isRandom) {
         const randomIndex = Math.floor(Math.random() * songs.length);
         setCurrentSong(songs[randomIndex]);
      } else {
         const currentIndex = songs.findIndex((song) => song.id === currentSong.id);
         if (currentIndex === songs.length - 1) {
            setCurrentSong(songs[0]);
         } else {
            setCurrentSong(songs[currentIndex + 1]);
         }
      }
   };

   const handleBackSong = () => {
      if (isRandom) {
         const randomIndex = Math.floor(Math.random() * songs.length);
         setCurrentSong(songs[randomIndex]);
      } else {
         const currentIndex = songs.findIndex((song) => song.id === currentSong.id);
         if (currentIndex === 0) {
            setCurrentSong(songs[songs.length - 1]);
         } else {
            setCurrentSong(songs[currentIndex - 1]);
         }
      }
   };

   const handleSkip = (e) => {
      const percent = e.target.value;
      const newTime = (percent * duration) / 100;
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime); // cập nhật luôn cho thanh trượt không bị delay
   };

   const handleRepeat = () => {
      if (isRepeat) {
         setIsRepeat(false);
      } else {
         setIsRepeat(true);
         setIsRandom(false);
      }
   };
   const handleRandom = () => {
      if (isRandom) {
         setIsRandom(false);
      } else {
         setIsRandom(true);
         setIsRepeat(false);
      }
   };

   const handleVolumeChange = (e) => {
      const newVolume = e.target.value;
      setVolume(newVolume);
      audioRef.current.volume = newVolume;
   };

   // Listener Event End Audio
   useEffect(() => {
      audioRef.current.onended = () => {
         if (isRepeat) {
            audioRef.current.play();
         } else if (isRandom) {
            const randomIndex = Math.floor(Math.random() * songs.length);
            setCurrentSong(songs[randomIndex]);
         }
      };
   }, [currentSong, isRepeat, isRandom]);

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
                     <div className={cx('repeat-btn', { active: isRepeat })}>
                        <FontAwesomeIcon icon={faRepeat} onClick={handleRepeat} />
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
                     <div className={cx('random-btn', { active: isRandom })} onClick={handleRandom}>
                        <FontAwesomeIcon icon={faRandom} />
                     </div>
                  </div>
                  <div className={cx('duration-bar')}>
                     <div className={cx('long-button')}>
                        <input
                           id="progress"
                           className={cx('progress')}
                           type="range"
                           value={(currentTime / duration) * 100}
                           step="1"
                           min="0"
                           max="100"
                           onChange={handleSkip}
                        ></input>
                     </div>
                  </div>
               </div>
               <div className={cx('control-right')}>
                  <div className={cx('volume')}>
                     <FontAwesomeIcon icon={faVolumeUp} />
                     <input
                        type="range"
                        className={cx('volume-control')}
                        id="volume-control"
                        min="0"
                        max="1"
                        step="0.01"
                        value={volume}
                        onChange={handleVolumeChange}
                     />
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
                     <div className={cx('list', { active: showPlaylist })} onClick={handlePlaylist}>
                        <FontAwesomeIcon icon={faList} />
                     </div>
                  </HeadlessTippy>
               </div>
            </div>
            <audio ref={audioRef} id="audio" src={currentSong.url}></audio>
         </div>
      </div>
   );
}

export default Player;
