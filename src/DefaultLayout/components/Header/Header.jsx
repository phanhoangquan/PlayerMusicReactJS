import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { Link } from 'react-router-dom';
import config from '~/config';

const cx = classNames.bind(styles);

function Header() {
   return (
      <div className={cx('wrapper')}>
         <div className={cx('inner')}>
            <div className={cx('logo')}>
               <Link to={config.routes.home}>
                  <img src="" alt=""></img>
               </Link>
            </div>
         </div>
      </div>
   );
}

export default Header;
