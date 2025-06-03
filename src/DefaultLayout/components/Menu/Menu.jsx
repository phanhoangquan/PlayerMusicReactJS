import classNames from 'classnames/bind';
import styles from './Menu.module.scss';
import Button from '~/components/Button';

import { useState } from 'react';
import Login from './Login';

const cx = classNames.bind(styles);

function Menu() {
   const [login, setLogin] = useState(false);
   const [showLogin, setShowLogin] = useState(false);

   const handleShowLogin = () => {
      setShowLogin(true);
   };

   return (
      <div className={cx('wrapper')}>
         <div className={cx('action')}>
            <Button className={cx('login-btn')} lighthigh onClick={handleShowLogin}>
               Login
            </Button>
            {showLogin && <Login setShowLogin={setShowLogin} setLogin={setLogin} />}
         </div>
      </div>
   );
}

export default Menu;
