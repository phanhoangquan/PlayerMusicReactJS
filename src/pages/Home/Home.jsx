import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import MusicItem from '~/components/MusicItem';
import * as Requests from '~/utils/httpRequest';
import { useState, useEffect } from 'react';

const cx = classNames.bind(styles);

function Home() {
   const [musics, setMusics] = useState([]);

   useEffect(() => {
      const MusicApi = async () => {
         try {
            const response = await Requests.get('songs.json');
            setMusics(response);
         } catch {
            console.error('API MUSIC ERROR');
         }
      };
      MusicApi();
   }, []);
   return (
      <div className={cx('wrapper')}>
         <div className={cx('content')}>
            {musics.map((music, index) => {
               return (
                  <div className={cx('menu-item')}>
                     <MusicItem key={index} data={music} large />
                  </div>
               );
            })}
         </div>
      </div>
   );
}

export default Home;
