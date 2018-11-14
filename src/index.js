import firebase from 'firebase/app';
import 'bootstrap';
import './index.scss';
import apiKeys from '../db/apiKeys.json';

import createNavbar from './component/Navbar/navbar';
import loginButton from './component/Auth/auth';


const initializeApp = () => {
  firebase.initializeApp(apiKeys.firebaseKeys);
  createNavbar();
  loginButton();
};
initializeApp();
