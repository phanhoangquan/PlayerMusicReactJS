import classNames from 'classnames/bind';
import styles from './Menu.module.scss';
import Button from '~/components/Button';

// import { useState } from 'react';

const cx = classNames.bind(styles);

function Menu() {
   //    const [login, setLogin] = useState(false);
   return (
      <div className={cx('wrapper')}>
         <div className={cx('action')}>
            <Button className={cx('login-btn')} lighthigh>
               Login
            </Button>
         </div>
      </div>
   );
}

export default Menu;
