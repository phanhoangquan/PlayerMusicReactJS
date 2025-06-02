import classNames from 'classnames/bind';
import styles from './PopperWrapper.module.scss';

const cx = classNames.bind(styles);

function PopperWrapper({ className, children }) {
   return <div className={cx('wrapper', className)}>{children}</div>;
}

export default PopperWrapper;
