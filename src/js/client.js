const App = App || {};
const google = google;

App.init = function() {
  this.apiUrl        = 'http://localhost:3000/api';
  this.$main         = $('main');
  this.$modalContent = $('.modal-content');
  this.$sidebar      = $('.sidebar');
  this.$recommended  = $('.recommended');
  this.$fullImage    = $('.full-image');
  this.markersArray  = [];


  $('.logout').on('click', this.logout.bind(this));
  $('.title').on('click', this.welcome.bind(this));
  $('.featured').on('click', this.featuredRestaurant);
  $('.home-icon').on('click', this.toggleSidebar);
  this.$modalContent.on('submit', 'form', this.handleForm);
  this.$main.on('click', '.add', this.addChoiceToSidebar);
  this.$recommended.on('click', '.close', this.closeFeatures);
  $('.option').on('click', this.getChoice.bind(this));

  if (this.getToken()) {
    this.loggedInState();
  } else {
    this.loggedOutState();
  }

  this.mapSetup();
};

App.addChoiceToSidebar = function(e) {
  $.each(App.markersArray, (index, marker) => {
    marker.setMap(null);
  });
  const $restaurantChoice = $(e.target).parent();

  const restaurantChoiceTemplate = `
    <div class="choice">
      <img src=${$restaurantChoice.find('img').attr('src')}>
      <h4>${$restaurantChoice.find('h2').html()}</h4>
      <p>${$restaurantChoice.find('p').html()}</p>
    </div>
  `;

  $('.selected').html(restaurantChoiceTemplate).removeClass('selected');
};

App.getChoice = function(e) {
  $(e.target).addClass('selected');
  const meal = e.target.id;

  $('.userOptions').show();
  $('select').on('change', ()=> {
    App.getRestaurants(meal);
    $.each(App.markersArray, (index, marker) => {
      marker.setMap(null);
    });
  });
};

App.addInfoWindowForRestaurant = function(restaurant, marker) {
  google.maps.event.addListener(marker, 'click', () => {
    if (typeof this.infoWindow !== 'undefined') this.infoWindow.close();

    this.infoWindow = new google.maps.InfoWindow({
      content: `<div class='infoWindow'>
                  <img src=${ restaurant.restaurant.featured_image }>
                  <h2>${ restaurant.restaurant.name }</h2>
                  <h3>User Rating: ${ restaurant.restaurant.user_rating.aggregate_rating }</h3>
                  <h3>${ restaurant.restaurant.cuisines }</h3>
                  <a href="${ restaurant.restaurant.url }">Visit Website</a>
                  <br>
                  <br>
                  <p>${ restaurant.restaurant.location.address }</p>

                  <button class='add' type='button' name='button'>Add</button>
                </div>`
    });

    this.infoWindow.open(this.map, marker);
  });
};

App.createMarkerForRestaurant = function(restaurant) {
  const iconBase = '../images/icon3.png';
  const latlng = new google.maps.LatLng(restaurant.restaurant.location.latitude, restaurant.restaurant.location.longitude);
  const marker = new google.maps.Marker({
    position: latlng,
    map: this.map,
    icon: iconBase,
    animation: google.maps.Animation.DROP
  });

  App.markersArray.push(marker);
  this.addInfoWindowForRestaurant(restaurant, marker);
};

App.resetMap = function(restaurant){
  const latlng = new google.maps.LatLng(restaurant.restaurant.location.latitude, restaurant.restaurant.location.longitude);
  App.map.panTo(latlng);
};


App.loopThroughRestaurants = function(data) {
  console.log(data);
  $.each(data.restaurants, (index, restaurant) => {
    setTimeout(() => {
      if (index === 0){
        App.resetMap(restaurant);
      }
      App.createMarkerForRestaurant(restaurant);
    }, index * 100);
  });
};

App.getRestaurants = function(meal){
  $('.userOptions').hide();

  const locations = {
    '98130': 'Yaletown',
    '98137': 'Gastown',
    '98135': 'Downtown',
    '98139': 'Kitsilano',
    '98129': 'Main Street'
  };

  const categories = {
    'breakfast': '8',
    'lunch': '9',
    'dinner': '2'
  };

  const locationId   = $('.neighbourhood').val();
  const locationName = locations[locationId];
  const category     = categories[meal];

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
    styles: [{'featureType':'all','stylers':[{'saturation':0},{'hue':'#e7ecf0'}]},{'featureType':'road','stylers':[{'saturation':-70}]},{'featureType':'transit','stylers':[{'visibility':'off'}]},{'featureType':'poi','stylers':[{'visibility':'off'}]},{'featureType':'water','stylers':[{'visibility':'simplified'},{'saturation':-60}]}]
  };

  this.map = new google.maps.Map(canvas, mapOptions);
};


App.loggedInState = function() {
  $('.loggedIn').show();
  $('.loggedOut').hide();
  $('.recommended').hide();
  this.$fullImage.hide();
};

App.loggedOutState = function() {
  $('.loggedIn').hide();
  $('.loggedOut').show();
  $('.sidebar').hide();
  $('.recommended').hide();
  this.$fullImage.show();
  this.$modalContent.addClass('welcome');
  this.$modalContent.html(`
    <div class='modal-header'>
    <h3 class='modal-title'>Feeling hungry?</h3>
    </div>
    <div class='modal-body'>
    <h6>You're in luck! Vancouver is famous for having <span>the best food</span> in the world... Click on the start button at the top left of the page to find the highest rated restaurants in any neighbourhood and add them to your day meal planner.</h6>
    <p>But first please register or login:</p>
    <button type='button' name='button' class='register'>Register</button>
    <button type='button' name='button' class='login'>Log In</button>
    </div>`);
  setTimeout(() => {
    $('.modal').modal('show');
  }, 1500);

  $('.register').on('click', this.register.bind(this));
  $('.login').on('click', this.login.bind(this));
};

App.register = function(e){
  if (e) e.preventDefault();
  this.$modalContent.html(`
    <form method='post' action='/register'>
      <div class='modal-header'>
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
  this.$modalContent.addClass('logginginbox');
  this.$modalContent.html(`
    <form method='post' action='/login'>
    <div class='modal-header'>
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

App.welcome = function(e) {
  e.preventDefault();
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

App.toggleSidebar = function() {
  $('.sidebar').toggleClass('open-sidebar close-sidebar');
};

App.closeSidebar = function() {
  $('.sidebar').hide();
};

App.featuredRestaurant = function() {
  $('.recommended').show();

  $('.recommended').html(`
    <button type='button' class='close' data-dismiss='modal' aria-label='Close'><span aria-hidden='true'>&times;</span></button>
    <h4>Pick of the week:</h4>
    <img src="../images/medina.jpg">
    <h6>Cafe Medina, Downtown</h6>
    <p>Lavender lattes and belgium waffles</p>
`);
};

App.closeFeatures = function() {
  $('.recommended').hide();
};


$(App.init.bind(App));


//note from nat
