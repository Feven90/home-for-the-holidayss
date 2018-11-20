import $ from 'jquery';

const formBuilder = () => {
    const form = `
    <div class="form-group">
      <label for="form-friend-name">Name: </label>
      <input type="text" class="form-control" id="form-friend-name" placeholder="John Smith">
      <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
    </div>
    <div class="form-group">
      <label for="form-friend-address">Address: </label>
      <input type="text" class="form-control" id="form-friend-address" placeholder="500 interstate">
    </div>
    <div class="form-group">
      <label for="form-friend-email">Email: </label>
      <input type="email" class="form-control" id="form-friend-email" placeholder="jogn@gmail.com">
    </div>
    <div class="form-group">
      <label for="form-friend-phone">Phone Number: </label>
      <input type="text" class="form-control" id="form-friend-phone" placeholder="333-3339-3333">
    </div>
    <div class="form-group">
      <label for="form-friend-relationship">Relationship: </label>
      <input type="text" class="form-control" id="form-friend-relationship" placeholder="complicated">
    </div>
    <button type="submit" class="btn btn-primary">Submit</button>
  `
}

const gettingFriendFromForm = () => {
  const friend = {
      "name": ${form-friend-name},

  }
}