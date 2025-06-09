import classNames from 'classnames/bind';
import styles from './SingerItem.module.scss';
import { Link } from 'react-router-dom';
import Image from '~/components/Image';

const BASE_URL = import.meta.env.VITE_BASE_URL;

const cx = classNames.bind(styles);

function SingerItem({ data }) {
   return (
      <div className={cx('wrapper')}>
         <Link className={cx('singer')} to={`/singer/${data.singer}`}>
            <Image className={cx('avatar')} src={BASE_URL + data.avatar} />
         </Link>
         <Link className={cx('name')} to={`/singer/${data.singer}`}>
            {data.singer}
         </Link>
      </div>
   );
}

export default SingerItem;
