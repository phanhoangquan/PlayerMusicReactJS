import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import MenuItem from './MenuItem/MenuItem';
import config from '~/config/config';
import { HeadphoneIcon, HomeIcon, HeartIcon } from '~/components/Icon/Icon';

const cx = classNames.bind(styles);

function Sidebar() {
   return (
      <div className={cx('wrapper')}>
         <nav className={cx('container-menu')}>
            <MenuItem title="Home" to={config.routes.home} icon={<HomeIcon />} />
            <MenuItem title="Favourite" to={config.routes.favourite} icon={<HeartIcon />} />
         </nav>
         <nav className={cx('container-menu-bottom')}>
            <MenuItem title="Ratings" to={config.routes.ratings} icon={<HeadphoneIcon />} />
         </nav>
      </div>
   );
}

export default Sidebar;
