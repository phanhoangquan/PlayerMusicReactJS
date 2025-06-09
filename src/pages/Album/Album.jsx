import classNames from 'classnames/bind';
import styles from './Album.module.scss';
import MusicItem from '~/components/MusicItem';

import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import * as Requests from '~/utils/httpRequest';

const cx = classNames.bind(styles);

function Song() {
   const { name } = useParams();
   const [album, setAlbum] = useState([]);
   const [moresongs, setMoreSongs] = useState([]);

   useEffect(() => {
      const albumAPI = async () => {
         try {
            const response = await Requests.get('/assets/data/albums.json');
            const album = response.find((res) => res.album === name);
            setAlbum(album);
         } catch {
            console.log('ERROR SONG API');
         }
      };
      albumAPI();
   }, [name]);

   useEffect(() => {
      const moreSongsAPI = async () => {
         try {
            const response = await Requests.get('/assets/data/songs.json');
            const result = response.filter((res) => album.album === res.album);
            setMoreSongs(result);
         } catch {
            console.log('ERROR SONG API');
         }
      };
      moreSongsAPI();
   }, [album]);

   return (
      <div className={cx('wrapper')}>
         <div className={cx('wrapper-info')}>
            <img className={cx('image')} src={album.image}></img>
            <div className={cx('info')}>
               <p className={cx('title')}>Info</p>
            </div>
         </div>
      </div>
   );
}

export default Song;
