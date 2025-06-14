import classNames from 'classnames/bind';
import styles from './Sign.module.scss';
import Image from '~/components/Image';
import images from '~/assets/images/images';
import Button from '~/components/Button';
import { useState, useRef, useEffect } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { faEye } from '@fortawesome/free-regular-svg-icons';

import * as Requests from '~/utils/httpRequest';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;
const cx = classNames.bind(styles);

function Sign({ setShowSign, setShowLogin, setLogin, setAccount }) {
   const wrapperRef = useRef();

   const [nickname, setNickname] = useState('');
   const [password, setPassword] = useState('');
   const [confirmPassword, setComfirmPassword] = useState('');
   const [nicknameMessage, setNicknameMessage] = useState('');
   const [passwordMessage, setPasswordMessage] = useState('');
   const [confirmPasswordMessage, setConfirmPasswordMessage] = useState('');
   const [isSeePass, setIsSeePass] = useState(false);

   // Khi click bên ngoài Login thì đóng Login
   useEffect(() => {
      function handleClickOutside(event) {
         if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
            setShowSign(false); // Đóng form nếu click ngoài
         }
      }

      document.addEventListener('mousedown', handleClickOutside);
      return () => {
         document.removeEventListener('mousedown', handleClickOutside);
      };
   }, [setShowSign]);

   const handleClose = () => {
      setShowSign(false);
   };
   const handleSwitch = () => {
      setShowSign(false);
      setShowLogin(true);
   };

   const handleSeePass = () => {
      if (isSeePass) {
         setIsSeePass(false);
      } else if (!isSeePass) {
         setIsSeePass(true);
      }
   };

   const isRequired = (value) => {
      return value ? undefined : 'Trường này là bắt buộc'; // Nếu không nhập thì sẽ có thông báo
   };

   const minLength = (value, min) => {
      return value.length > min - 1 ? undefined : `Tổi thiểu mật khẩu phải có ${min} kí tự`;
   };

   const isComfirmed = (value) => {
      return value === password ? undefined : 'Nhập lại không trùng với mật khẩu';
   };

   const hasNickname = (value) => {
      const NicknameAPI = async () => {
         try {
            const response = await Requests.get('/assets/data/users.json');
            const result = response.some((res) => res.nickname === value);
            setNicknameMessage(!result ? undefined : 'Nickname đã tồn tại'); // Nếu nickname đã tồn tại thì sẽ có thông báo
         } catch {
            console.log('NicknameAPI ERROR');
         }
      };
      return NicknameAPI();
   };

   const handleValidNickname = () => {
      setNicknameMessage(isRequired(nickname));
      // Kiểm tra nickname có trùng với nickname trong file json hay không
      if (nickname) {
         hasNickname(nickname);
      }
   };

   const handleValidPassword = () => {
      setPasswordMessage(minLength(password, 8));
   };

   const handleValidConfirmPassword = () => {
      setConfirmPasswordMessage(isComfirmed(confirmPassword));
   };

   const handleSign = async (e) => {
      e.preventDefault();
      handleValidNickname();
      handleValidPassword();
      handleValidConfirmPassword();

      if (nickname && password && !nicknameMessage && !passwordMessage && !confirmPasswordMessage) {
         console.log('RUN');
         try {
            await axios.post('/assets/data/users.json', {
               nickname: nickname,
               password: password,
            });
            console.log('THANH CONG');
         } catch {
            console.log('POST ACCOUNT ERROR');
         }
      }
   };
   return (
      <div className={cx('wrapper')} ref={wrapperRef}>
         <button className={cx('close')} onClick={handleClose}>
            <FontAwesomeIcon icon={faCircleXmark} />
         </button>
         <form onSubmit={handleSign} action="" method="" className={cx('form')} id="form-1">
            <div className={cx('title')}>
               <div className={cx('logo-container')}>
                  <Image src={images.logo} className={cx('logo')} />
               </div>
               <p>Sign in</p>
            </div>
            <div className={cx('form-group')}>
               <label htmlFor="nickname" className={cx('form-label')}>
                  Nickname:
               </label>
               <input
                  autoComplete="username"
                  id="nickname"
                  name="nickname"
                  type="text"
                  value={nickname}
                  onChange={(e) => {
                     setNickname(e.target.value);
                  }}
                  onInput={() => {
                     setNicknameMessage('');
                  }}
                  onBlur={handleValidNickname}
                  placeholder="Username..."
                  className={cx('form-control')}
               ></input>
            </div>
            <span className={cx('form-message')}>{nicknameMessage}</span>

            <div className={cx('form-group')}>
               <label htmlFor="password" className={cx('form-label')}>
                  Password:
               </label>
               <input
                  autoComplete="new-password"
                  id="password"
                  name="password"
                  type={isSeePass ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                     setPassword(e.target.value);
                  }}
                  onInput={() => {
                     setPasswordMessage('');
                  }}
                  onBlur={handleValidPassword}
                  placeholder="Password..."
                  className={cx('form-control')}
               ></input>
               <div className={cx('icon')} onClick={handleSeePass}>
                  {isSeePass && <FontAwesomeIcon icon={faEye} />}
                  {!isSeePass && <FontAwesomeIcon icon={faEyeSlash} />}
               </div>
            </div>
            <span className={cx('form-message')}>{passwordMessage}</span>

            <div className={cx('form-group')}>
               <label htmlFor="confirm-password" className={cx('form-label')}>
                  Re-Password:
               </label>
               <input
                  autoComplete="new-password"
                  id="confirm-password"
                  name="confirm-password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => {
                     setComfirmPassword(e.target.value);
                  }}
                  onInput={() => {
                     setConfirmPasswordMessage('');
                  }}
                  onBlur={handleValidConfirmPassword}
                  placeholder="Confirm Password..."
                  className={cx('form-control')}
               ></input>
            </div>
            <span className={cx('form-message')}>{confirmPasswordMessage}</span>

            <Button className={cx('form-submit')}>Sign in</Button>

            <div className={cx('bottom')}>
               <span>Already have an account?</span>
               <a onClick={handleSwitch}>Login now</a>
            </div>
         </form>
      </div>
   );
}

export default Sign;
