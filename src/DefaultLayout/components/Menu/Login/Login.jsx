import classNames from 'classnames/bind';
import styles from './Login.module.scss';
import Image from '~/components/Image';
import images from '~/assets/images/images';
import Button from '~/components/Button';
import { useState, useRef, useEffect } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';

import * as Requests from '~/utils/httpRequest';

const cx = classNames.bind(styles);

function Login({ setShowLogin, setShowSign, setLogin, setAccount }) {
   const wrapperRef = useRef();

   const [error, setError] = useState(false);
   const [nickname, setNickname] = useState('');
   const [password, setPassword] = useState('');

   // Khi click bên ngoài Login thì đóng Login
   useEffect(() => {
      function handleClickOutside(event) {
         if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
            setShowLogin(false); // Đóng form nếu click ngoài
         }
      }

      document.addEventListener('mousedown', handleClickOutside);
      return () => {
         document.removeEventListener('mousedown', handleClickOutside);
      };
   }, [setShowLogin]);

   const handleClose = () => {
      setShowLogin(false);
   };

   const handleSwitch = () => {
      setShowLogin(false);
      setShowSign(true);
   };

   const handleLogin = async (e) => {
      e.preventDefault();
      try {
         const response = await Requests.get('assets/data/users.json');
         const account = response.find((res) => {
            return res.nickname === nickname && res.password === password;
         });
         if (account) {
            setError(false);
            setLogin(true);
            setAccount(account);
         } else {
            setError(true);
         }
      } catch {
         console.error('Lỗi máy chủ hoặc không tìm thấy API');
      }
   };
   return (
      <div className={cx('wrapper')} ref={wrapperRef}>
         <button className={cx('close')} onClick={handleClose}>
            <FontAwesomeIcon icon={faCircleXmark} />
         </button>
         <form onSubmit={handleLogin} action="" method="" className={cx('form')} id="form-1">
            <div className={cx('title')}>
               <div className={cx('logo-container')}>
                  <Image src={images.logo} className={cx('logo')} />
               </div>
               <p>Login</p>
            </div>
            <div className={cx('form-group')}>
               <label htmlFor="nickname" className={cx('form-label')}>
                  Nickname:
               </label>
               <input
                  id="nickname"
                  name="nickname"
                  type="text"
                  value={nickname}
                  onChange={(e) => {
                     setNickname(e.target.value);
                  }}
                  placeholder="Username..."
                  className={cx('form-control')}
               ></input>
            </div>
            <div className={cx('form-group')}>
               <label htmlFor="password" className={cx('form-label')}>
                  Password:
               </label>
               <input
                  id="password"
                  name="password"
                  type="text"
                  value={password}
                  onChange={(e) => {
                     setPassword(e.target.value);
                  }}
                  placeholder="Password..."
                  className={cx('form-control')}
               ></input>
            </div>
            {error && <p className={cx('form-message')}>Incorrect username or password</p>}

            <Button className={cx('form-submit')}>Login</Button>
            <div className={cx('bottom')}>
               <span>Dont have an account?</span>
               <a onClick={handleSwitch}>Sign Up</a>
            </div>
         </form>
      </div>
   );
}

export default Login;
