import { useLocation } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Profile.module.scss';

const cx = classNames.bind(styles);

function Profile() {
   const { state } = useLocation();
   return <div className={cx('wrapper')}></div>;
}

export default Profile;
