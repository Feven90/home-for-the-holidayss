import $ from 'jquery';
import authHelpers from '../../helpers/authHelpers';
import friendsData from '../../helpers/data/friendsData';
import holidayFriendsData from '../../helpers/data/holidayFriendsData';
import holidaysData from '../../helpers/data/holidaysData';

const holidayStringBuilder = (holidays) => {
  let holidayString = '<h3>Holidays:</h3>';
  holidays.forEach((holiday) => {
    holidayString += `<h5>${holiday.name} ${holiday.Date}</h5>`;
  });
  return holidayString;
};
const printSingleFriend = (friend, holidays) => {
  const friendString = `
     <div>
       <h1>${friend.name}</h1>
       <h3>${friend.relationship}</h3>
       <p>${friend.address}</p>
       <p>${friend.email}</p>
       <p>${friend.phoneNumber}</p>
       <button class="btn-danger delete-btn" data-delete-id=${friend.id}>X</button>
       <button class="btn-info edit-btn" data-edit-id=${friend.id}>Edit</button>
       <div class="holiday-container">${holidayStringBuilder(holidays)}</div>
       </div>
    `;
  $('#single-container').html(friendString);
};

const getSingleFriend = (e) => {
  // firebase id
  const friendId = e.target.dataset.dropdownId;
  const uid = authHelpers.getCurrentUid();
  friendsData.getSingleFriend(friendId)
    .then((singleFriend) => {
      holidayFriendsData.getHolidayIdsForFriend(friendId).then((holidayIds) => {
        console.log('holidayIds', holidayIds);
        holidaysData.getHolidaysByArrayOfIds(uid, holidayIds).then((holidays) => {
          printSingleFriend(singleFriend, holidays);
        });
      });
    //   const singleFriend = result.data; we can get rid of this, it is already
    // done in friendsData promise
    })
    .catch((error) => {
      console.error('error in getting one friend', error);
    });
};

const buildDropdown = (friendsArray) => {
  let dropdown = `<div class="dropdown">
  <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    Pick Friend
  </button>
  <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">`;
  if (friendsArray.length) {
    friendsArray.forEach((friend) => {
      dropdown += `<div class="dropdown-item get-single" data-dropdown-id=${friend.id}>${friend.name}</div>`;
    });
  } else {
    dropdown += '<div class=\'dropdown-item\'> You have no friends.</div>';
  }
  // <a class="dropdown-item" href="#">Action</a>
  // <a class="dropdown-item" href="#">Another action</a>
  // <a class="dropdown-item" href="#">Something else here</a>
  dropdown += '</div></div>';
  $('#dropdown-container').html(dropdown);
};

const friendsPage = () => {
  const uid = authHelpers.getCurrentUid();
  friendsData.getAllFriends(uid)
    .then((friendsArray) => {
    //     Object.keys(friendsObject).forEach((friendId) => {
    //       friendsObject[friendId].id = friendId; // taking friend1, friend2...and putting it into
    //       // the object with "id" key
      buildDropdown(friendsArray);
    })
    .catch((error) => {
      console.error('error in getting friends', error);
    });
};

const deleteFriend = (e) => {
  // firebase id
  const idToDelete = e.target.dataset.deleteId;
  friendsData.deleteFriend(idToDelete)
    .then(() => {
      friendsPage();
      $('#single-container').html('');
    })
    .catch((error) => {
      console.log('error in deleting friend', error);
    });
};

const bindEvents = () => {
  $('body').on('click', '.dropdown-item', getSingleFriend);
  $('body').on('click', '.delete-btn', deleteFriend);
};

const initializeFriendsPage = () => {
  friendsPage();
  bindEvents();
};

export default initializeFriendsPage;
