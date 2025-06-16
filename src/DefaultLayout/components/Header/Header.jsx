import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { Link } from 'react-router-dom';
import config from '~/config/config';
import images from '~/assets/images/images';
import Search from '~/DefaultLayout/components/Search';
import Menu from '~/DefaultLayout/components/Menu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import Navbar from './Navbar';
import HeadlessTippy from '@tippyjs/react/headless';
import { useContext } from 'react';
import { MusicContext } from '~/context/MusicContext';

const cx = classNames.bind(styles);

function Header() {
   const { showNav, setShowNav } = useContext(MusicContext);

   const handleNav = () => {
      if (showNav) {
         setShowNav(false);
      } else {
         setShowNav(true);
      }
   };

   return (
      <div className={cx('wrapper')}>
         <div className={cx('inner')}>
            <HeadlessTippy
               interactive
               visible={showNav}
               appendTo={document.body}
               placement="bottom-start"
               offset={[-60, 19]}
               onClickOutside={() => {
                  setShowNav(false);
               }}
               render={() => (
                  <div className={cx('navbar')}>
                     <Navbar />
                  </div>
               )}
            >
               <div className={cx('nav-btn')} onClick={handleNav}>
                  <FontAwesomeIcon icon={faBars} />
               </div>
            </HeadlessTippy>
            <div className={cx('logo')}>
               <Link className={cx('link-logo')} to={config.routes.home}>
                  <img className={cx('logo-music')} src={images.logo} alt=""></img>
               </Link>
               <h1 className={cx('title')}>Music App</h1>
            </div>
            <div className={cx('search')}>
               <Search />
            </div>
            <div className={cx('menu')}>
               <Menu />
            </div>
         </div>
      </div>
   );
}

export default Header;
