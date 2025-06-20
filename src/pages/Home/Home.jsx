import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import MusicItem from '~/components/MusicItem';
import * as Requests from '~/utils/httpRequest';
import { useState, useEffect } from 'react';
import AlbumItem from '~/components/AlbumItem';
import SingerItem from '~/components/SingerItem';

const cx = classNames.bind(styles);

function Home() {
   const [musics, setMusics] = useState([]);
   const [albums, setAlbums] = useState([]);
   const [singers, setSingers] = useState([]);

   useEffect(() => {
      const MusicApi = async () => {
         try {
            const response = await Requests.get('assets/data/songs.json');
            setMusics(response);
         } catch {
            console.error('API MUSIC ERROR');
         }
      };
      MusicApi();
   }, []);

   useEffect(() => {
      const AlbumApi = async () => {
         try {
            const response = await Requests.get('assets/data/albums.json');
            setAlbums(response);
         } catch {
            console.error('API Album ERROR');
         }
      };
      AlbumApi();
   }, []);

   useEffect(() => {
      const SingerApi = async () => {
         try {
            const response = await Requests.get('assets/data/singers.json');
            setSingers(response);
         } catch {
            console.error('API Singer ERROR');
         }
      };
      SingerApi();
   }, []);

   return (
      <div className={cx('wrapper')}>
         <div className={cx('container')}>
            <div className={cx('title')}>Music</div>
            <div className={cx('content-music')}>
               {musics.map((music, index) => {
                  return (
                     <div key={index} className={cx('music-item')}>
                        <MusicItem data={music} large />
                     </div>
                  );
               })}
            </div>
            <div className={cx('title')}>Album</div>
            <div className={cx('content-album')}>
               {albums.map((album, index) => {
                  return (
                     <div key={index} className={cx('album-item')}>
                        <AlbumItem data={album} />
                     </div>
                  );
               })}
            </div>
            <div className={cx('title')}>Singer</div>
            <div className={cx('content-singer')}>
               {singers.map((singer, index) => {
                  return (
                     <div key={index} className={cx('singer-item')}>
                        <SingerItem data={singer} />
                     </div>
                  );
               })}
            </div>
         </div>
      </div>
   );
}

export default Home;
