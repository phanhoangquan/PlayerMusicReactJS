import classNames from 'classnames/bind';
import styles from './Song.module.scss';
import MusicItem from '~/components/MusicItem';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faHeart } from '@fortawesome/free-regular-svg-icons';

import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import * as Requests from '~/utils/httpRequest';

const cx = classNames.bind(styles);

function Song() {
   const { name } = useParams();
   const [song, setSong] = useState([]);
   const [moresongs, setMoreSongs] = useState([]);

   useEffect(() => {
      const songAPI = async () => {
         try {
            const response = await Requests.get('/assets/data/songs.json');
            const song = response.find((res) => res.name === name);
            setSong(song);
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
            const moresongs = response.filter((res) => song.singer === res.singer);
            const result = moresongs.filter((res) => res.title !== song.title);
            setMoreSongs(result);
         } catch {
            console.log('ERROR SONG API');
         }
      };
      moreSongsAPI();
   }, [song]);

   return (
      <div className={cx('wrapper')}>
         <div className={cx('wrapper-info')}>
            <MusicItem data={song} just_img />
            <div className={cx('info')}>
               <p className={cx('title')}>Info</p>
               <div className={cx('song-item')}>
                  <MusicItem data={song} />
               </div>

               <p className={cx('name')}>{song.title}</p>
               <Link to={`/singer/${song.singer}`} className={cx('singer')}>
                  {song.singer}
               </Link>
               <div>
                  <span className={cx('view')}>View: {song.view}</span>
                  <FontAwesomeIcon icon={faEye} />
               </div>
               <div>
                  <span className={cx('favourite')}>Favourite: {song.favourite}</span>
                  <FontAwesomeIcon icon={faHeart} />
               </div>
            </div>
         </div>
         <div className={cx('more')}>
            <div className={cx('title-more')}>
               Other songs by <span className={cx('name-singer')}>{song.singer}</span> :
            </div>
            <div className={cx('music')}>
               {moresongs.map((song, index) => (
                  <div className={cx('music-item')} key={index}>
                     <MusicItem data={song} large />
                  </div>
               ))}
            </div>
         </div>
      </div>
   );
}

export default Song;
