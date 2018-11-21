import axios from 'axios';
import apiKeys from '../../../db/apiKeys.json';

const firebaseUrl = apiKeys.firebaseKeys.databaseURL;

const getAllFriends = uid => new Promise((resolve, reject) => {
  axios.get(`${firebaseUrl}/friends.json?orderBy="uid"&equalTo="${uid}"`)
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
      resolve(friendsArray);
    })
    .catch((error) => {
      reject(error);
    });
});


const getSingleFriend = friendId => new Promise((resolve, reject) => {
  axios.get(`${firebaseUrl}/friends/${friendId}.json`)
    .then((result) => {
      const singleFriend = result.data;
      singleFriend.id = friendId;
      resolve(singleFriend);
    })
    .catch((error) => {
      reject(error);
    });
});

const deleteFriend = (friendId) => {
  console.log(friendId);
};

export default {
  getAllFriends,
  getSingleFriend,
  deleteFriend,
};
