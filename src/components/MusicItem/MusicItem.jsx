import classNames from 'classnames/bind';
import styles from './MusicItem.module.scss';
import { Link } from 'react-router-dom';
import Image from '~/components/Image';

const cx = classNames.bind(styles);

function MusicItem({ data, large = false }) {
   const classes = cx('wrapper', { large });
   const BASE_URL = import.meta.env.VITE_BASE_URL;

   return (
      <Link to={`/@${data.name}`} className={classes}>
         <Image className={cx('image')} src={BASE_URL + data.image}></Image>
         <div className={cx('info')}>
            <p className={cx('name')}>{data.title}</p>
            <p className={cx('singer')}>{data.singer}</p>
         </div>
      </Link>
   );
}

export default MusicItem;
