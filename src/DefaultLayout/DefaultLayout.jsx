import classNames from 'classnames/bind';
import styles from '../DefaultLayout/DefaultLayout.module.scss';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Player from './components/Player';
import MusicProvider from '~/context';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
   return (
      <div className={cx('wrapper')}>
         <MusicProvider>
            <Header />
            <div className={cx('container')}>
               <Sidebar />
               <div className={cx('content')}>{children}</div>
            </div>
            <Player />
         </MusicProvider>
      </div>
   );
}

export default DefaultLayout;
