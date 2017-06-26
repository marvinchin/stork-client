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
    path: '/landing',
    exact: true,
    navbar: false,
    component: LandingPage,
  },
  {
    path: '/login',
    exact: true,
    navbar: false,
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
    path: '/new-book',
    exact: true,
    navbar: true,
    component: NewBookPage,
  },
  {
    path: '/new-trade',
    exact: true,
    navbar: true,
    component: NewTradePage,
  },
  {
    path: '/inbox',
    exact: true,
    navbar: true,
    component: InboxPage,
  },
  {
    path: '/trade',
    exact: true,
    navbar: true,
    component: TradePage,
  },
  {
    path: '/',
    exact: true,
    navbar: true,
    component: HomePage,
  },
];
