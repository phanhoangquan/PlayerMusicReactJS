import config from '~/config/config';
import Home from '~/pages/Home';
import Favourite from '~/pages/Favourite';
import Trending from '~/pages/Trending';
import Ratings from '~/pages/Ratings';
import Top from '~/pages/Top';
import Profile from '~/pages/Profile';
import Song from '~/pages/Song';
import Album from '~/pages/Album';
import Singer from '~/pages/Singer';

export const publicRoutes = [
   { path: config.routes.home, component: Home },
   { path: config.routes.favourite, component: Favourite },
   { path: config.routes.trending, component: Trending },
   { path: config.routes.ratings, component: Ratings },
   { path: config.routes.top, component: Top },
   { path: config.routes.profile, component: Profile },
   { path: config.routes.song, component: Song },
   { path: config.routes.album, component: Album },
   { path: config.routes.singer, component: Singer },
];
export const privateRoutes = [];
