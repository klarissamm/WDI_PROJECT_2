const App = App || {};
const google = google;

App.init = function() {
  this.apiUrl = 'http://localhost:3000/api';
  this.$main  = $('main');
  $('.register').on('click', this.register.bind(this));
  $('.login').on('click', this.login.bind(this));
  $('.logout').on('click', this.logout.bind(this));
  this.$main.on('submit', 'form', this.handleForm);
  if (this.getToken()) {
    this.loggedInState();
  } else {
    this.loggedOutState();
  }
};

// App.addInfoWindowForRestaurant = function(restaurant, marker) {
//   google.maps.event.addListener(marker, 'click', () => {
//     if (typeof this.infoWindow !== 'undefined') this.infoWindow.close();
//
//     this.infoWindow = new google.maps.InfoWindow({
//       content: `<img${ restaurant.restaurant.featured_image }><p>${ restaurant.restaurant.name }</p><p>${ restaurant.restaurant.location.address }</p><p>${ restaurant.restaurant.location.cuisines }</p>`
//     });
//
//     this.infoWindow.open(this.map, marker);
//   });
// };
//
// App.createMarkerForRestaurant = function(restaurant) {
//   const iconBase = 'http://icons.iconarchive.com/icons/icons-land/vista-map-markers/32/Map-Marker-Marker-Outside-Pink-icon.png';
//   const latlng = new google.maps.LatLng(restaurant.restaurant.location.latitude, restaurant.restaurant.location.longitude);
//   const marker = new google.maps.Marker({
//     position: latlng,
//     map: this.map,
//     icon: iconBase,
//     animation: google.maps.Animation.DROP
//   });
//
//   this.addInfoWindowForRestaurant(restaurant, marker);
// };
//
// App.loopThroughRestaurants = function(data) {
//   $.each(data.restaurants, (index, restaurant) => {
//     setTimeout(() => {
//       App.createMarkerForRestaurant(restaurant);
//     }, index * 50);
//   });
// };
//
// App.getRestaurants = function(){
//   $.get({
//     url: 'https://developers.zomato.com/api/v2.1/search?entity_id=256&entity_type=metro&q=restaurants&start=0&count=35&lat=49.280721695&lon=-123.1177491154&radius=2500&cuisines=1-250&establishment_type=1-200&collection_id=1-100&category=10&sort=rating&order=asc',
//     headers: {
//       'user-key': 'a076d160e3eff25d9c8448aa2c2dc85b'
//     }
//   }).done(this.loopThroughRestaurants);
// };

// App.createMenuBar = function() {
//   this.$main.html(`
//     <section class="sidebar">
//   <h1>Choose your category</h1>
//   <form method="post" action="#">
//     <<div class="form-group">
//       <label for="category_name">Breakfast, Lunch or Supper?</label>
//       <select class="form-control" id="category" name="category">
//           <option>Breakfast</option>
//           <option>Lunch</option>
//           <option>Dinner</option>
//       </select>
//     </div>
//     <<div class="form-group">
//       <label for="neighbourhood_name">Where will you be?</label>
//       <select class="form-control" id="neighbourhood" name="neighbourhood">
//           <option>Downtown</option>
//           <option>Gastown</option>
//           <option>Yaletown</option>
//           <option>Chinatown</option>
//       </select>
//     </div>
//     <button type="submit" class="btn btn-primary">Submit</button>
//   </form>
// </section>
//   `);
// };

App.mapSetup = function(){
  $('#map-canvas').show();
  const canvas = document.getElementById('map-canvas');

  const mapOptions = {
    zoom: 14,
    center: new google.maps.LatLng(49.2824303,-123.126847),
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  this.map = new google.maps.Map(canvas, mapOptions);
  this.createMenuBar();
  // this.getRestaurants();
};


App.loggedInState = function() {
  $('.loggedIn').show();
  $('.loggedOut').hide();
  this.mapSetup();
};

App.loggedOutState = function() {
  $('.loggedIn').hide();
  $('.loggedOut').show();
  this.register();
};

App.register = function(e){
  if (e) e.preventDefault();

  $('#map-canvas').hide();
  this.$main.html(`<div class="modal fade bs-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel">
<div class="modal-dialog modal-lg" role="document">
<div class="modal-content">
<div class="form-group">
  <input class="form-control" type="text" name="user[username]" placeholder="Username">
</div>
<div class="form-group">
  <input class="form-control" type="email" name="user[email]" placeholder="Email">
</div>
<div class="form-group">
  <input class="form-control" type="password" name="user[password]" placeholder="Password">
</div>
<div class="form-group">
  <input class="form-control" type="password" name="user[passwordConfirmation]" placeholder="Password Confirmation">
</div>
<input class="btn btn-primary" type="submit" value="Register">
</form>
</div>
</div>
</div>
  `);
  $('#myModal').modal('show');
};

App.login = function(e) {
  e.preventDefault();
  $('#map-canvas').hide();
  this.$main.html(`
    <div class="modal fade bs-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel">
  <div class="modal-dialog modal-lg" role="document">
    <div class="modal-content">
    <form method="post" action="/login">
      <div class="form-group">
        <input class="form-control" type="email" name="email" placeholder="Email">
      </div>
      <div class="form-group">
        <input class="form-control" type="password" name="password" placeholder="Password">
      </div>
      <input class="btn btn-primary" type="submit" value="Login">
    </form>
    </div>
  </div>
</div>
  `);
};

App.logout = function(e) {
  e.preventDefault();
  this.removeToken();
  this.loggedOutState();
};

App.handleForm = function(e){
  e.preventDefault();

  const url    = `${App.apiUrl}${$(this).attr('action')}`;
  const method = $(this).attr('method');
  const data   = $(this).serialize();

  return App.ajaxRequest(url, method, data, data => {
    if (data.token) App.setToken(data.token);
    App.loggedInState();
  });
};

App.ajaxRequest = function(url, method, data, callback){
  return $.ajax({
    url,
    method,
    data,
    beforeSend: this.setRequestHeader.bind(this)
  })
  .done(callback)
  .fail(data => {
    console.log(data);
  });
};

App.setRequestHeader = function(xhr) {
  return xhr.setRequestHeader('Authorization', `Bearer ${this.getToken()}`);
};

App.setToken = function(token){
  return window.localStorage.setItem('token', token);
};

App.getToken = function(){
  return window.localStorage.getItem('token');
};

App.removeToken = function() {
  return window.localStorage.clear();
};

$(App.init.bind(App));
