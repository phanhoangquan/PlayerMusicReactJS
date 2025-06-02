import classNames from 'classnames/bind';
import styles from './Image.module.scss';
import { useState } from 'react';
import images from '~/assets/images/images';

const cx = classNames.bind(styles);

function Image({ src, alt = '', className, ...props }) {
   const [avatar, setAvatar] = useState(src);

   const handleError = () => {
      setAvatar(images.noimage);
      console.log('error');
   };

   return <img className={cx('wrapper', className)} src={avatar} alt={alt} {...props} onError={handleError}></img>;
}

export default Image;
