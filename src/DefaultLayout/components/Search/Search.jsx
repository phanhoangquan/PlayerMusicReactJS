import { HomeIcon, SearchIcon } from '~/components/Icon/Icon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faSpinner } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import styles from './Search.module.scss';
import { useState, useRef, useEffect } from 'react';
import config from '~/config/config';
import { Link } from 'react-router-dom';
import HeadlessTippy from '@tippyjs/react/headless';
import PopperWrapper from '~/components/Popper';
import MusicItem from '~/components/MusicItem';

import searchServices from '~/Services/searchServices.js';

const cx = classNames.bind(styles);

function Search() {
   const inputRef = useRef();
   const [searchValue, setSearchValue] = useState('');
   const [searchResult, setSearchResult] = useState([]);
   const [loading, setLoading] = useState(false);
   const [showResult, setShowResult] = useState(false);

   useEffect(() => {
      if (!searchValue.trim()) {
         setSearchResult([]);
         return;
      }
      const searchAPI = async () => {
         try {
            setLoading(true);
            const result = await searchServices(searchValue, 5);
            setLoading(false);
            setSearchResult(result);
         } catch {
            console.error('Search failed:');
            setSearchResult([]);
         }
      };
      searchAPI();
   }, [searchValue]);

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

   const handleClickOutside = () => {
      setShowResult(false);
   };

   return (
      <div className={cx('container-search')}>
         <Link to={config.routes.home} className={cx('home')}>
            <HomeIcon />
         </Link>
         <HeadlessTippy
            interactive
            visible={showResult && searchResult.length > 0}
            onClickOutside={handleClickOutside}
            render={(attrs) => (
               <div className={cx('search-result')} tabIndex="-1 " {...attrs}>
                  <PopperWrapper>
                     <div className={cx('search-item')}>
                        {searchResult.map((music, index) => {
                           return <MusicItem key={index} data={music} />;
                        })}
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
                  onFocus={() => {
                     setShowResult(true);
                  }}
               ></input>
               {!loading && searchValue && (
                  <button className={cx('clear-btn')} onClick={handleClear}>
                     <FontAwesomeIcon icon={faCircleXmark} />
                  </button>
               )}
               {loading && (
                  <button className={cx('loading')}>
                     <FontAwesomeIcon icon={faSpinner} />
                  </button>
               )}
               <button className={cx('search-btn')} onClick={handleSearch}>
                  <SearchIcon />
               </button>
            </div>
         </HeadlessTippy>
      </div>
   );
}

export default Search;
