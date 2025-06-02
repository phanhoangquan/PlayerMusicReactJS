import classNames from 'classnames/bind';
import styles from './MusicItem.module.scss';
import { Link } from 'react-router-dom';
import Image from '~/components/Image';

const cx = classNames.bind(styles);

function MusicItem({ data }) {
   return (
      <Link to={`/@${data.name}`} className={cx('wrapper')}>
         <Image className={cx('image')} src={data.image}></Image>
         <div className={cx('info')}>
            <p className={cx('name')}>{data.title}</p>
            <p className={cx('singer')}>{data.artist}</p>
         </div>
      </Link>
   );
}

export default MusicItem;
