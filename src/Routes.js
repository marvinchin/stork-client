import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import ProfilePage from './components/ProfilePage';
import NewBookPage from './components/NewBookPage';
import NewTradePage from './components/NewTradePage';
import InboxPage from './components/InboxPage';
import TradePage from './components/TradePage';
import HomePage from './components/HomePage';

export default [
  {
    path: '/',
    exact: true,
    component: LandingPage,
  },
  {
    path: '/login',
    exact: true,
    component: LoginPage,
  },
  {
    path: '/register',
    exact: true,
    navbar: true,
    component: RegisterPage,
  },
  {
    path: '/user/:username',
    exact: true,
    navbar: true,
    component: ProfilePage,
  },
  {
    path: '/book/new',
    exact: true,
    navbar: true,
    requireAuth: true,
    component: NewBookPage,
  },
  {
    path: '/trade/new/:bookId',
    exact: true,
    navbar: true,
    requireAuth: true,
    component: NewTradePage,
  },
  {
    path: '/inbox',
    exact: true,
    navbar: true,
    requireAuth: true,
    component: InboxPage,
  },
  {
    path: '/trade/:tradeId',
    exact: true,
    navbar: true,
    requireAuth: true,
    component: TradePage,
  },
  {
    path: '/index',
    exact: true,
    navbar: true,
    component: HomePage,
  },
];
