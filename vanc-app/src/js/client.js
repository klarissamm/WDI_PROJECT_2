const App = App || {};
const google = google;

App.init = function() {
  this.apiUrl        = 'http://localhost:3000/api';
  this.$main         = $('main');
  this.$modalContent = $('.modal-content');

  $('.logout').on('click', this.logout.bind(this));
  this.$modalContent.on('submit', 'form', this.handleForm);
  this.$modalContent.on('click', '.go', this.getRestaurants);

  if (this.getToken()) {
    this.loggedInState();
  } else {
    this.loggedOutState();
  }
};

App.addInfoWindowForRestaurant = function(restaurant, marker) {
  google.maps.event.addListener(marker, 'click', () => {
    if (typeof this.infoWindow !== 'undefined') this.infoWindow.close();

    this.infoWindow = new google.maps.InfoWindow({
      content: `<img${ restaurant.restaurant.featured_image }><p>${ restaurant.restaurant.name }</p><p>${ restaurant.restaurant.location.address }</p><p>${ restaurant.restaurant.location.cuisines }</p>`
    });

    this.infoWindow.open(this.map, marker);
  });
};

App.createMarkerForRestaurant = function(restaurant) {
  const iconBase = 'http://icons.iconarchive.com/icons/icons-land/vista-map-markers/32/Map-Marker-Marker-Outside-Pink-icon.png';
  const latlng = new google.maps.LatLng(restaurant.restaurant.location.latitude, restaurant.restaurant.location.longitude);
  const marker = new google.maps.Marker({
    position: latlng,
    map: this.map,
    icon: iconBase,
    animation: google.maps.Animation.DROP
  });

  this.addInfoWindowForRestaurant(restaurant, marker);
};

App.loopThroughRestaurants = function(data) {
  $.each(data.restaurants, (index, restaurant) => {
    setTimeout(() => {
      App.createMarkerForRestaurant(restaurant);
    }, index * 50);
  });
};

App.getRestaurants = function(){
  $('.modal').modal('hide');
  $('#map-canvas').show();

  const location = $('.neighbourhood').val();
  const category = $('.category').val();

  // if (location === 98130) {
  //   const  lat = 49.2755687553;
  //   const lon = -123.1212622066;
  //   const q = 'Yaletown';
  // }

  $.get({
    url: `https://developers.zomato.com/api/v2.1/search?entity_id=${location}&entity_type=subzone&q=Yaletown&count=15&lat=49.2755687553&lon=-123.1212622066&radius=700&category=${category}&sort=rating&order=desc`,
    headers: {
      'user-key': 'a076d160e3eff25d9c8448aa2c2dc85b'
    }
  }).done(App.loopThroughRestaurants);
};

App.mapSetup = function(){
  $('.modal').modal('hide');
  $('#map-canvas').show();
  const canvas = document.getElementById('map-canvas');

  const mapOptions = {
    zoom: 14,
    center: new google.maps.LatLng(49.2824303,-123.126847),
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  this.map = new google.maps.Map(canvas, mapOptions);
};


App.loggedInState = function() {
  $('.loggedIn').show();
  $('.loggedOut').hide();
  this.$modalContent.addClass('questions');
  this.$modalContent.html(`
    <div class="modal-header">
    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
    <h4 class="modal-title">Let's begin</h4>
    </div>
    <div class="modal-body">
    <p>Where are you?</p>
    <select class="neighbourhood custom-select mb-2 mr-sm-2 mb-sm-0" id="inlineFormCustomSelect">
    <option selected>Neighbourhood...</option>
    <option value="98130">Yaletown</option>
    <option value="98137">Gastown</option>
    <option value="98135">Downtown</option>
    <option value="98139">Kitsilano</option>
    <option value="98129">Main Street</option>
    </select>
    <p>What meal are you looking for?</p>
    <select class="category custom-select mb-2 mr-sm-2 mb-sm-0" id="inlineFormCustomSelect">
    <option selected>Meal...</option>
    <option value="8">Breakfast</option>
    <option value="9">Lunch</option>
    <option value="2">Supper</option>
    </select>
    <button type="submit" class="go btn btn-primary">Go</button>
    </div>
    `);

  $('.modal').modal('show');
};

App.loggedOutState = function() {
  $('.loggedIn').hide();
  $('.loggedOut').show();
  this.mapSetup();
  this.$modalContent.addClass('welcome');
  this.$modalContent.html(`
    <div class="modal-header">
    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
    <h3 class="modal-title">Welcome to VancApp!</h3>
    </div>
    <div class="modal-body">
    <h4>Feeling hungry but not sure where to go?</h4>
    <h6>Well you're in luck, because Vancouver is <span>the best city for food</span> and we've got you covered! Just tell us what neighbourhood you're in and what kind of meal you're looking for and we'll work some magic to let you know where's tasty nearby...</h6>
    <p>But first of all, please register or login below:</p>
    <button type="button" name="button" class="register">Register</button>
    <button type="button" name="button" class="login">Log In</button>
    </div>`);

  $('.modal').modal('show');
  $('.register').on('click', this.register.bind(this));
  $('.login').on('click', this.login.bind(this));
};

App.register = function(e){
  if (e) e.preventDefault();
  this.$modalContent.html(`
    <form method="post" action="/register">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">Register</h4>
      </div>
      <div class="modal-body">
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
      </div>
    </form>`);

  $('.modal').modal('show');
};

App.login = function(e) {
  e.preventDefault();
  this.$modalContent.html(`
    <form method="post" action="/login">
    <div class="modal-header">
      <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
      <h4 class="modal-title">Login</h4>
    </div>
    <div class="modal-body">
      <div class="form-group">
      <input class="form-control" type="email" name="email" placeholder="Email">
    </div>
    <div class="form-group">
      <input class="form-control" type="password" name="password" placeholder="Password">
    </div>
    <input class="btn btn-primary" type="submit" value="Login">
  </form>`);
  $('.modal').modal('show');
};

App.logout = function(e) {
  e.preventDefault();
  this.removeToken();
  this.loggedOutState();
};

App.handleForm = function(e){
  e.preventDefault();
  $('.modal').modal('hide');

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
