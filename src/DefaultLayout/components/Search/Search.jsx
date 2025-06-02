import { HomeIcon, SearchIcon } from '~/components/Icon/Icon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faSpinner } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import styles from './Search.module.scss';
import { useState, useRef } from 'react';
import config from '~/config/config';
import { Link } from 'react-router-dom';
import HeadlessTippy from '@tippyjs/react/headless';
import PopperWrapper from '~/components/Popper';
import MusicItem from '~/components/MusicItem';

const cx = classNames.bind(styles);

function Search() {
   const inputRef = useRef();
   const [searchValue, setSearchValue] = useState('');

   const fakeUser = {
      id: 3,
      title: 'Muộn rồi mà sao còn',
      artist: 'Sơn Tùng MTP',
      album: 'MTP Collection',
      image: 'http://localhost:5173/assets/images/muon_roi_ma_sao_con.png',
      url: 'http://localhost:5173/assets/songs/MuonRoiMaSaoCon-SonTungMTP.mp3',
      name: 'muonroimasaocon_STMTP',
   };

   const handleChange = (e) => {
      setSearchValue(e.target.value);
   };

   const handleClear = () => {
      setSearchValue('');
      inputRef.current.focus();
   };
   const handleSearch = () => {
      {
         searchValue || inputRef.current.focus();
      }
   };

   return (
      <div className={cx('container-search')}>
         <Link to={config.routes.home} className={cx('home')}>
            <HomeIcon />
         </Link>
         <HeadlessTippy
            interactive
            visible
            render={(attrs) => (
               <div className={cx('search-result')} tabIndex="-1 " {...attrs}>
                  <PopperWrapper>
                     <div className={cx('search-item')}>
                        <MusicItem key={1} data={fakeUser} />
                        <MusicItem key={2} data={fakeUser} />
                        <MusicItem key={3} data={fakeUser} />
                     </div>
                  </PopperWrapper>
               </div>
            )}
         >
            <div className={cx('search')}>
               <input
                  ref={inputRef}
                  value={searchValue}
                  spellCheck={false}
                  placeholder="Search your music..."
                  onChange={handleChange}
               ></input>
               {searchValue && (
                  <button className={cx('clear-btn')} onClick={handleClear}>
                     <FontAwesomeIcon icon={faCircleXmark} />
                  </button>
               )}
               {/* <button className={cx('loading')}>
                   <FontAwesomeIcon icon={faSpinner} />
                </button> */}
               <button className={cx('search-btn')} onClick={handleSearch}>
                  <SearchIcon />
               </button>
            </div>
         </HeadlessTippy>
      </div>
   );
}

export default Search;
