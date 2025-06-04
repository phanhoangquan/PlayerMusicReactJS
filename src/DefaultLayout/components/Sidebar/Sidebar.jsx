import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import MenuItem from './MenuItem/MenuItem';
import config from '~/config/config';
import { HeadphoneIcon, HomeIcon, StarIcon, TrendingIcon } from '~/components/Icon/Icon';

const cx = classNames.bind(styles);

function Sidebar() {
   return (
      <div className={cx('wrapper')}>
         <nav className={cx('container-menu')}>
            <MenuItem title="Home" to={config.routes.home} icon={<HomeIcon />} />
            <MenuItem title="Trending" to={config.routes.trending} icon={<TrendingIcon />} />
         </nav>
         <nav className={cx('container-menu-bottom')}>
            <MenuItem title="Ratings" to={config.routes.ratings} icon={<HeadphoneIcon />} />
            <MenuItem title="Top 100" to={config.routes.top} icon={<StarIcon />} />
         </nav>
      </div>
   );
}

export default Sidebar;
