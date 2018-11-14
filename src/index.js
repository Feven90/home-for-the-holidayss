import $ from 'jquery';
import 'bootstrap';
import './index.scss';

import createNavbar from './component/Navbar/navbar';

const turkey = () => {
  $('#turkey').html('yummyy turkey');
};
turkey();
const initializeApp = () => {
  createNavbar();
};
initializeApp();
