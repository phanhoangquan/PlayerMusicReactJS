import classNames from 'classnames/bind';
import styles from './MusicItem.module.scss';
import { Link } from 'react-router-dom';
import Image from '~/components/Image';
import { useContext, useState } from 'react';
import { MusicContext } from '~/context/MusicContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis, faPause, faPlay } from '@fortawesome/free-solid-svg-icons';
import { faEye, faHeart } from '@fortawesome/free-regular-svg-icons';

import HeadlessTippy from '@tippyjs/react/headless';

const cx = classNames.bind(styles);

function MusicItem({
   data,
   className,
   large = false,
   small = false,
   just_img = false,
   rating_view = false,
   rating_favourite = false,
   playlistMusic = false,
}) {
   const { isPlaying, setIsPlaying, currentSong, setCurrentSong, setShowPlayer, setIsAlbum, login } =
      useContext(MusicContext);

   const [showMore, setShowMore] = useState(false);
   const [active, setActive] = useState(false);
   const [success, setSuccess] = useState(false);
   const [failed, setFailed] = useState(false);

   const classes = cx('wrapper', {
      [className]: className,
      large,
      small,
      just_img,
      rating_view,
      rating_favourite,
      active,
   });

   const handlePlay = (e) => {
      e.preventDefault();
      setShowPlayer(true);
      setCurrentSong(data);
      setIsPlaying(true);
      setIsAlbum(false);
      if (playlistMusic) {
         playlistMusic();
      }
   };
   const handlePause = (e) => {
      e.preventDefault();
      setIsPlaying(false);
   };

   const handleClickMore = (e) => {
      e.preventDefault();
      if (showMore) {
         setShowMore(false);
         setActive(false);
      } else {
         setShowMore(true);
         setActive(true);
      }
   };

   // Thêm các bài hát yêu thích vào Local Storage
   const handleFavourite = (e) => {
      e.preventDefault();
      setShowMore(false);
      setActive(false);

      const stored = JSON.parse(localStorage.getItem('favouriteSongs')) || [];

      if (!stored.includes(data.name)) {
         const updated = [...stored, data.name];
         localStorage.setItem('favouriteSongs', JSON.stringify(updated));
         setSuccess(true);
         setTimeout(() => {
            setSuccess(false);
         }, [1000]);
      } else {
         setFailed(true);
         setTimeout(() => {
            setFailed(false);
         }, [1000]);
      }
   };

   return (
      <Link to={`/song/${data.name}`} className={classes}>
         {(!isPlaying || currentSong?.id !== data.id) && (
            <div className={cx('cd')} onClick={handlePlay}>
               <Image className={cx('image')} src={data.image}></Image>
               <div className={cx('play-btn')}>
                  <FontAwesomeIcon icon={faPlay} />
               </div>
            </div>
         )}

         {isPlaying && currentSong.id === data.id && (
            <div className={cx('cd')} onClick={handlePause}>
               <Image className={cx('image')} src={data.image}></Image>
               <div className={cx('pause-btn')}>
                  <FontAwesomeIcon icon={faPause} />
               </div>
            </div>
         )}
         {!just_img && (
            <>
               <div className={cx('info')}>
                  <p className={cx('name')}>{data.title}</p>
                  <Link className={cx('singer')} to={`/singer/${data.singer}`}>
                     {data.singer}
                  </Link>
               </div>
               {rating_view && (
                  <div className={cx('name-mid')}>
                     {data.view} View <FontAwesomeIcon icon={faEye} />
                  </div>
               )}
               {rating_favourite && (
                  <div className={cx('name-mid')}>
                     {data.favourite} Favourite <FontAwesomeIcon icon={faHeart} />
                  </div>
               )}
               <HeadlessTippy
                  interactive
                  visible={showMore}
                  // offset={[680, 90]}
                  placement="top"
                  onClickOutside={() => {
                     setShowMore(false);
                     setActive(false);
                  }}
                  appendTo={document.body}
                  render={() => {
                     return (
                        <div className={cx('container-more')}>
                           <div className={cx('option-item')} onClick={handleFavourite}>
                              <div className={cx('icon')}>
                                 <FontAwesomeIcon icon={faHeart} />
                              </div>
                              <div className={cx('favourite-btn')}>
                                 <button>Favourite</button>
                              </div>
                           </div>
                        </div>
                     );
                  }}
               >
                  <div
                     className={cx('more-btn')}
                     onClick={(e) => {
                        handleClickMore(e);
                     }}
                  >
                     <FontAwesomeIcon icon={faEllipsis} />
                  </div>
               </HeadlessTippy>
            </>
         )}
         {success && <div className={cx('success', 'notification')}>Added song to favorites</div>}
         {failed && <div className={cx('failed', 'notification')}>The song is already in your favorites list</div>}
      </Link>
   );
}

export default MusicItem;
