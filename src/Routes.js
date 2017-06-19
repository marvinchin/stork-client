import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import ProfilePage from './components/ProfilePage';
import NewBookPage from './components/NewBookPage';
import NewTradePage from './components/NewTradePage';

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
    path: '/user',
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
];
