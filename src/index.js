import firebase from 'firebase/app';
import 'bootstrap';
import './index.scss';
import apiKeys from '../db/apiKeys.json';

import createNavbar from './component/Navbar/navbar';
import loginButton from './component/Auth/auth';
import authHelpers from './helpers/authHelpers';
import friendsPage from './component/FriendsPage/friendsPage';


const initializeApp = () => {
  firebase.initializeApp(apiKeys.firebaseKeys);
  createNavbar();
  authHelpers.checkLoginStatus(friendsPage);
  loginButton();
};
initializeApp();
