import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { Link } from 'react-router-dom';
import config from '~/config/config';
import images from '~/assets/images/images';
import Search from '~/DefaultLayout/components/Search';

const cx = classNames.bind(styles);

function Header() {
   return (
      <div className={cx('wrapper')}>
         <div className={cx('inner')}>
            <div className={cx('logo')}>
               <Link className={cx('link-logo')} to={config.routes.home}>
                  <img className={cx('logo-music')} src={images.logo} alt=""></img>
               </Link>
            </div>
            <Search />
            <div className={cx('action')}></div>
         </div>
      </div>
   );
}

export default Header;
