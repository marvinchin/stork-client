import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import ProfilePage from './components/ProfilePage';

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
];
