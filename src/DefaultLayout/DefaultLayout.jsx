import classNames from 'classnames/bind';
import styles from '../DefaultLayout/DefaultLayout.module.scss';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Player from './components/Player';

import { useContext } from 'react';
import { MusicContext } from '~/context/MusicContext';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
   const { showPlayer } = useContext(MusicContext);

   return (
      <div className={cx('wrapper')}>
         <Header />
         <div className={cx('container')}>
            <Sidebar />
            <div className={cx('content')}>{children}</div>
         </div>
         {showPlayer && <Player />}
      </div>
   );
}

export default DefaultLayout;
