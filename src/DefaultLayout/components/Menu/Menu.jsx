import classNames from 'classnames/bind';
import styles from './Menu.module.scss';
import Button from '~/components/Button';

import { useState } from 'react';
import Login from './Login';
import Image from '~/components/Image';
import { UploadIcon } from '~/components/Icon/Icon';

import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import HeadlessTippy from '@tippyjs/react/headless';

const cx = classNames.bind(styles);

function Menu() {
   const [login, setLogin] = useState(false);
   const [showLogin, setShowLogin] = useState(false);
   const [account, setAccount] = useState([]);

   const handleShowLogin = () => {
      setShowLogin(true);
   };

   return (
      <div className={cx('wrapper')}>
         <div className={cx('action')}>
            <HeadlessTippy
               interactive
               visible={!login && showLogin}
               offset={[-600, 70]}
               render={() => {
                  return <Login setShowLogin={setShowLogin} setLogin={setLogin} setAccount={setAccount} />;
               }}
               appendTo={document.body}
            >
               {!login && (
                  <Button className={cx('login-btn')} lighthigh onClick={handleShowLogin}>
                     Login
                  </Button>
               )}
            </HeadlessTippy>
            {login && (
               <div className={cx('options')}>
                  <div className={cx('option-item')}>
                     <Tippy content="Upload" placement="bottom">
                        <div className={cx('upload-btn')}>
                           <UploadIcon />
                        </div>
                     </Tippy>
                  </div>
                  <div className={cx('option-item')}>
                     <Image className={cx('avatar')} src={account.avatar} />
                  </div>
               </div>
            )}
         </div>
      </div>
   );
}

export default Menu;
