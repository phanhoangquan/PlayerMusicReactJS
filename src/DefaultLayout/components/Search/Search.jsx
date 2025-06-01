import { SearchIcon } from '~/components/Icon/Icon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faSpinner } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import styles from './Search.module.scss';
import { useState, useRef } from 'react';

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
      <div className={cx('search')}>
         <input ref={inputRef} value={searchValue} placeholder="Search your music..." onChange={handleChange}></input>
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
   );
}

export default Search;
