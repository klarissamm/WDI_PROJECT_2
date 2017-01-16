const App = App || {};
const google = google;

App.init = function() {
  this.apiUrl        = 'http://localhost:3000/api';
  this.$main         = $('main');
  this.$modalContent = $('.modal-content');
  this.$sidebar      = $('.sidebar');
  this.$recommended  = $('.recommended');
  this.$fullImage    = $('.full-image');

  $('.logout').on('click', this.logout.bind(this));
  $('.featured').on('click', this.featuredRestaurant);
  $('.burger-menu').on('click', this.showSidebar);
  this.$modalContent.on('submit', 'form', this.handleForm);
  this.$sidebar.on('click', '.go', this.getRestaurants);
  this.$sidebar.on('click', '.close', this.closeSidebar);
  this.$main.on('click', '.add', this.addChoiceToSidebar);
  this.$recommended.on('click', '.close', this.closeFeatures);

  if (this.getToken()) {
    this.loggedInState();
  } else {
    this.loggedOutState();
  }

  this.mapSetup();
};

App.addChoiceToSidebar = function(marker) {
  marker.setMap(null);
};

App.addInfoWindowForRestaurant = function(restaurant, marker) {
  google.maps.event.addListener(marker, 'click', () => {
    console.log(restaurant.restaurant);
    if (typeof this.infoWindow !== 'undefined') this.infoWindow.close();

    this.infoWindow = new google.maps.InfoWindow({
      content: `<div class='infoWindow'><img src=${ restaurant.restaurant.featured_image }><p>${ restaurant.restaurant.name }</p><p>${ restaurant.restaurant.location.address }</p><p>${ restaurant.restaurant.cuisines }</p>
      <button class='add' type='button' value='${ restaurant.restaurant.name }' name='button'>Add</button></div>`
    });

    this.infoWindow.open(this.map, marker);
  });
};

App.createMarkerForRestaurant = function(restaurant) {
  const iconBase = '../images/icon6.png';
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
    }, index * 100);
  });
};

App.getRestaurants = function(){
  const locations = {
    '98130': 'Yaletown',
    '98137': 'Gastown',
    '98135': 'Downtown',
    '98139': 'Kitsilano',
    '98129': 'Main Street'
  };

  const locationId   = $('.neighbourhood').val();
  const locationName = locations[locationId];
  const category     = $('.category').val();

  $.get({
    url: `https://developers.zomato.com/api/v2.1/search?entity_id=${locationId}&entity_type=subzone&q=${locationName}&count=15&radius=700&category=${category}&sort=rating&order=desc`,
    headers: {
      'user-key': 'a076d160e3eff25d9c8448aa2c2dc85b'
    }
  }).done(App.loopThroughRestaurants);
};

App.mapSetup = function(){
  const canvas = document.getElementById('map-canvas');

  const mapOptions = {
    zoom: 13,
    center: new google.maps.LatLng(49.2824303,-123.126847),
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    styles: [{'featureType':'landscape','elementType':'all','stylers':[{'hue':'#6600ff'},{'saturation':-11}]},{'featureType':'poi','elementType':'all','stylers':[{'saturation':-78},{'hue':'#6600ff'},{'lightness':-47},{'visibility':'off'}]},{'featureType':'road','elementType':'all','stylers':[{'hue':'#5e00ff'},{'saturation':-79}]},{'featureType':'road.local','elementType':'all','stylers':[{'lightness':30},{'weight':1.3}]},{'featureType':'transit','elementType':'all','stylers':[{'visibility':'simplified'},{'hue':'#5e00ff'},{'saturation':-16}]},{'featureType':'transit.line','elementType':'all','stylers':[{'saturation':-72}]},{'featureType':'water','elementType':'all','stylers':[{'saturation':-65},{'hue':'#1900ff'},{'lightness':8}]}]
  };

  this.map = new google.maps.Map(canvas, mapOptions);
};


App.loggedInState = function() {
  $('.loggedIn').show();
  $('.loggedOut').hide();
  $('.recommended').hide();

  this.showSidebar();
};

App.loggedOutState = function() {
  $('.loggedIn').hide();
  $('.loggedOut').show();
  $('.sidebar').hide();
  $('.recommended').hide();
  this.mapSetup();
  this.$modalContent.addClass('welcome');
  this.$modalContent.html(`
    <div class='modal-header'>
    <button type='button' class='close' data-dismiss='modal' aria-label='Close'><span aria-hidden='true'>&times;</span></button>
    <h3 class='modal-title'>Feeling hungry?</h3>
    </div>
    <div class='modal-body'>
    <h6>Well you're in luck, because Vancouver is <span>the best city for food</span> and we've got you covered! Just tell us what neighbourhood you're in and what kind of meal you're looking for and we'll work some magic to let you know where's tasty nearby...</h6>
    <p>But first of all, please register or login below:</p>
    <button type='button' name='button' class='register'>Register</button>
    <button type='button' name='button' class='login'>Log In</button>
    </div>`);

  $('.modal').modal('show');
  $('.register').on('click', this.register.bind(this));
  $('.login').on('click', this.login.bind(this));
};

App.register = function(e){
  if (e) e.preventDefault();
  this.$modalContent.html(`
    <form method='post' action='/register'>
      <div class='modal-header'>
        <button type='button' class='close' data-dismiss='modal' aria-label='Close'><span aria-hidden='true'>&times;</span></button>
        <h4 class='modal-title'>Register</h4>
      </div>
      <div class='modal-body'>
        <div class='form-group'>
          <input class='form-control' type='text' name='user[username]' placeholder='Username'>
        </div>
        <div class='form-group'>
          <input class='form-control' type='email' name='user[email]' placeholder='Email'>
        </div>
        <div class='form-group'>
          <input class='form-control' type='password' name='user[password]' placeholder='Password'>
        </div>
        <div class='form-group'>
          <input class='form-control' type='password' name='user[passwordConfirmation]' placeholder='Password Confirmation'>
        </div>
        <input class='btn btn-primary' type='submit' value='Register'>
      </div>
    </form>`);

  $('.modal').modal('show');
};

App.login = function(e) {
  e.preventDefault();
  this.$modalContent.html(`
    <form method='post' action='/login'>
    <div class='modal-header'>
      <button type='button' class='close' data-dismiss='modal' aria-label='Close'><span aria-hidden='true'>&times;</span></button>
      <h4 class='modal-title'>Login</h4>
    </div>
    <div class='modal-body'>
      <div class='form-group'>
      <input class='form-control' type='email' name='email' placeholder='Email'>
    </div>
    <div class='form-group'>
      <input class='form-control' type='password' name='password' placeholder='Password'>
    </div>
    <input class='btn btn-primary' type='submit' value='Login'>
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

App.showSidebar = function() {
  $('.sidebar').show();

  $('.sidebar').html(`
    <button type='button' class='close'
    aria-label='Close'><span aria-hidden='true'>&times;</span></button>
    <div class='neighbourhoodOptions'>
    <p>Where are you?</p>
    <select class='neighbourhood custom-select mb-2 mr-sm-2 mb-sm-0' id='inlineFormCustomSelect'>
    <option selected>Neighbourhood...</option>
    <option value='98130'>Yaletown</option>
    <option value='98137'>Gastown</option>
    <option value='98135'>Downtown</option>
    <option value='98139'>Kitsilano</option>
    <option value='98129'>Main Street</option>
    </select>
    </div>
    <div class ='mealOptions'>
    <p>What meal are you looking for?</p>
    <select class='category custom-select mb-2 mr-sm-2 mb-sm-0' id='inlineFormCustomSelect'>
    <option selected>Meal...</option>
    <option value='8'>Breakfast</option>
    <option value='9'>Lunch</option>
    <option value='2'>Supper</option>
    </select>
    </div>
    <button type='submit' class='go btn btn-primary'>Go</button>
    <div class ='usersChoices'>
    <h3>You have chosen...</h3>
    <p class='choice1'>CHOICE1</p>
    <p>for... CATEGORY in LOCATIONNAME</p>
    </div>
    </div>
    `);
};

App.closeSidebar = function() {
  $('.sidebar').hide();
};

App.featuredRestaurant = function() {
  $('.recommended').show();

  $('.recommended').html(`
    <button type='button' class='close' data-dismiss='modal' aria-label='Close'><span aria-hidden='true'>&times;</span></button>
    <h4>Our picks of the moment:</h4>
    <p>Downtown:</p>
    <h6>Cafe Medina</h6>
    <p>Lavender lattes and belgium waffles</p>
    <p>Yaletown:</p>
    <h6>Lupo Restaurant</h6>
    <p>Delicious Italian in a converted home</p>
    <p>Kitsilano</p>
    <h6>Vij's</h6>
    <p>Best Indian in Vancouver</p>`);
};

App.closeFeatures = function() {
  $('.recommended').hide();
};

// App.setImageTimeout = function(){
//
//   this.$fullImage.style.visibility='visible';
//   setTimeout('Show', 2000);
//   App.mapSetup();
// };



$(App.init.bind(App));
