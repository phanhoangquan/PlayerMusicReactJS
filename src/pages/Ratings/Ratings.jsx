import classNames from 'classnames/bind';
import styles from './Ratings.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState, useContext } from 'react';
import { MusicContext } from '~/context/MusicContext';
import * as Requests from '~/utils/httpRequest';
import MusicItem from '~/components/MusicItem';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function Ratings() {
   const { setCurrentSong, setIsPlaying, setShowPlayer, setSongs, setIsAlbum } = useContext(MusicContext);
   const [songRating, setSongRating] = useState([]);
   const [isView, setIsView] = useState(true);
   const [isFavourite, setIsFavourite] = useState(false);

   useEffect(() => {
      const MusicViewAPI = async () => {
         try {
            const response = await Requests.get('/assets/data/songs.json');
            if (isView) {
               response.sort((a, b) => {
                  return b.view - a.view;
               });
            } else if (isFavourite) {
               response.sort((a, b) => {
                  return b.favourite - a.favourite;
               });
            }
            setSongRating(response);
         } catch {
            console.log('MUSIC API ERROR');
         }
      };
      MusicViewAPI();
   }, [isFavourite, isView]);

   const handlePlay = () => {
      setShowPlayer(true);
      setCurrentSong(songRating[0]);
      setSongs(songRating);
      setIsPlaying(true);
      setIsAlbum(true);
   };

   const playlistMusic = () => {
      setSongs(songRating);
      setIsAlbum(true);
   };

   const handleShowView = () => {
      setIsView(true);
      setIsFavourite(false);
   };

   const handleShowFavourite = () => {
      setIsView(false);
      setIsFavourite(true);
   };

   return (
      <div className={cx('wrapper')}>
         <div className={cx('container')}>
            <div className={cx('title')}>
               <p>Ratings Music</p>
               <div className={cx('icon')} onClick={handlePlay}>
                  <FontAwesomeIcon icon={faPlayCircle} />
               </div>
               <div className={cx('options')}>
                  <Button className={cx('button', { active: isView })} onClick={handleShowView}>
                     View
                  </Button>
                  <Button className={cx('button', { active: isFavourite })} onClick={handleShowFavourite}>
                     Favourite
                  </Button>
               </div>
            </div>
            <div className={cx('music')}>
               {songRating.map((music, index) => (
                  <div key={index} className={cx('music-item')}>
                     <p className={cx('rank', `number${index + 1}`)}>{index + 1}</p>
                     <div className={cx('sort')} />
                     {isView && (
                        <MusicItem className={cx('item')} data={music} rating_view playlistMusic={playlistMusic} />
                     )}
                     {isFavourite && (
                        <MusicItem className={cx('item')} data={music} rating_favourite playlistMusic={playlistMusic} />
                     )}
                  </div>
               ))}
            </div>
         </div>
      </div>
   );
}

export default Ratings;
