import { HomeIcon, SearchIcon } from '~/components/Icon/Icon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faSpinner } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import styles from './Search.module.scss';
import { useState, useRef } from 'react';
import Button from '~/components/Button';
import config from '~/config/config';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function Search() {
   const inputRef = useRef();
   const [searchValue, setSearchValue] = useState('');

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
         <div className={cx('search')}>
            <input
               ref={inputRef}
               value={searchValue}
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
      </div>
   );
}

export default Search;
