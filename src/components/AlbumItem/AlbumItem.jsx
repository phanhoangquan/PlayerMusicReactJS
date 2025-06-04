import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './AlbumItem.module.scss';
import Image from '~/components/Image';

const cx = classNames.bind(styles);
const BASE_URL = import.meta.env.VITE_BASE_URL;

function AlbumItem({ data }) {
   const classes = cx('wrapper');
   return (
      <Link className={classes}>
         <Image className={cx('image')} src={BASE_URL + data.image}></Image>
         <p className={cx('name')}>{data.album}</p>
      </Link>
   );
}

export default AlbumItem;
