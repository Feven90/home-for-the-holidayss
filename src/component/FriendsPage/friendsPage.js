import axios from 'axios';
import $ from 'jquery';
import apiKeys from '../../../db/apiKeys.json';
import authHelpers from '../../helpers/authHelpers';

const printSingleFriend = (friend) => {
  const friendString = `
     <div>
       <h1>${friend.name}</h1>
       <h3>${friend.relationship}</h3>
       <p>${friend.address}</p>
       <p>${friend.email}</p>
       <p>${friend.phoneNumber}</p>
       <button class="btn-danger delete-btn">X</button>
     </div>
    `;
  $('#single-container').html(friendString);
};

const getSingleFriend = (e) => {
  // firebase id
  const friendId = e.target.dataset.dropdownId;
  axios.get(`${apiKeys.firebaseKeys.databaseURL}/friends/${friendId}.json`)
    .then((result) => {
      const singleFriend = result.data;
      singleFriend.id = friendId;
      printSingleFriend(singleFriend);
    })
    .catch((error) => {
      console.error('error in getting one friend', error);
    });
};

const buildDropdown = (friendsArray) => {
  let dropdown = `<div class="dropdown">
  <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    Dropdown button
  </button>
  <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">`;
  friendsArray.forEach((friend) => {
    dropdown += `<div class="dropdown-item" data-dropdown-id=${friend.id}>${friend.name}</div>`;
  });
  // <a class="dropdown-item" href="#">Action</a>
  // <a class="dropdown-item" href="#">Another action</a>
  // <a class="dropdown-item" href="#">Something else here</a>
  dropdown += '</div></div>';
  $('#dropdown-container').html(dropdown);
};

const friendsPage = () => {
  const uid = authHelpers.getCurrentUid();
  axios.get(`${apiKeys.firebaseKeys.databaseURL}/friends.json?orderBy="uid"&equalTo="${uid}"`)
    .then((results) => {
      const friendsObject = results.data;
      const friendsArray = [];
      if (friendsObject != null) {
        Object.keys(friendsObject).forEach((friendId) => {
          friendsObject[friendId].id = friendId; // taking friend1, friend2...and putting it into
          // the object with "id" key
          friendsArray.push(friendsObject[friendId]);
        });
      }
      buildDropdown(friendsArray);
    })
    .catch((error) => {
      console.error('error in getting friends', error);
    });
};

const bindEvents = () => {
  $('body').on('click', '.dropdown-item', getSingleFriend);
};

const initializeFriendsPage = () => {
  friendsPage();
  bindEvents();
};

export default initializeFriendsPage;