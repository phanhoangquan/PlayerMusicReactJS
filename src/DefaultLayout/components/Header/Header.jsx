import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { Link } from 'react-router-dom';
import config from '~/config/config';
import images from '~/assets/images/images';
import Search from '~/DefaultLayout/components/Search';
import Menu from '~/DefaultLayout/components/Menu';

const cx = classNames.bind(styles);

function Header() {
   return (
      <div className={cx('wrapper')}>
         <div className={cx('inner')}>
            <div className={cx('logo')}>
               <Link className={cx('link-logo')} to={config.routes.home}>
                  <img className={cx('logo-music')} src={images.logo} alt=""></img>
               </Link>
               <h1 className={cx('title')}>Music App</h1>
            </div>
            <Search />
            <Menu />
         </div>
      </div>
   );
}

export default Header;
