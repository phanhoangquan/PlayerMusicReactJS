import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './AlbumItem.module.scss';
import Image from '~/components/Image';

const cx = classNames.bind(styles);

function AlbumItem({ data }) {
   const classes = cx('wrapper');
   return (
      <Link className={classes} to={`/album/${data.album}`}>
         <div className={cx('image-container')}>
            <Image className={cx('image')} src={data.image}></Image>
         </div>

         <p className={cx('name')}>{data.album}</p>
      </Link>
   );
}

export default AlbumItem;
