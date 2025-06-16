import { NavLink } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './MenuItem.module.scss';
import { useContext } from 'react';
import { MusicContext } from '~/context/MusicContext';

const cx = classNames.bind(styles);

function MenuItem({ title, to, icon }) {
   const { showNav, setShowNav } = useContext(MusicContext);

   const handleCheckNav = () => {
      if (showNav) {
         setShowNav(false);
      }
   };
   return (
      <NavLink to={to} className={(nav) => cx('menu-item', { active: nav.isActive })} onClick={handleCheckNav}>
         {icon}
         <span className={cx('title')}>{title}</span>
      </NavLink>
   );
}

export default MenuItem;
