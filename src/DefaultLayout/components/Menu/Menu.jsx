import classNames from 'classnames/bind';
import styles from './Menu.module.scss';
import Button from '~/components/Button';

import { useState, useContext } from 'react';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import HeadlessTippy from '@tippyjs/react/headless';

import Login from './Login';
import Sign from './Sign';
import Image from '~/components/Image';
import { UploadIcon } from '~/components/Icon/Icon';

import { MusicContext } from '~/context/MusicContext';

const cx = classNames.bind(styles);

function Menu() {
   const { login, setLogin } = useContext(MusicContext);

   const [showLogin, setShowLogin] = useState(false);
   const [showSign, setShowSign] = useState(false);
   const [account, setAccount] = useState([]);

   const handleShowLogin = () => {
      setShowSign(false);
      setShowLogin(true);
   };

   const handleShowSign = () => {
      setShowLogin(false);
      setShowSign(true);
   };

   return (
      <div className={cx('wrapper')}>
         <div className={cx('action')}>
            <HeadlessTippy
               interactive
               visible={!login && (showLogin || showSign)}
               offset={[-600, 40]}
               render={() => {
                  if (showLogin) {
                     return (
                        <Login
                           setShowLogin={setShowLogin}
                           setShowSign={setShowSign}
                           setLogin={setLogin}
                           setAccount={setAccount}
                        />
                     );
                  } else if (showSign) {
                     return (
                        <Sign
                           setShowSign={setShowSign}
                           setShowLogin={setShowLogin}
                           setLogin={setLogin}
                           setAccount={setAccount}
                        />
                     );
                  }
               }}
               appendTo={document.body}
            >
               {!login && (
                  <div className={cx('container-btn')}>
                     <Button className={cx('sign-btn')} lighthigh outline onClick={handleShowSign}>
                        Sign in
                     </Button>
                     <Button className={cx('login-btn')} lighthigh onClick={handleShowLogin}>
                        Login
                     </Button>
                  </div>
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
