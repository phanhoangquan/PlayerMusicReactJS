import config from '~/config/config';
import Home from '~/pages/Home';
import Profile from '~/pages/Profile';

export const publicRoutes = [
   { path: config.routes.home, component: Home },
   { path: config.routes.profile, component: Profile },
];
export const privateRoutes = [];
