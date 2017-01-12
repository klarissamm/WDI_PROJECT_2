"use strict";var App=App||{},google=google;App.init=function(){this.apiUrl="http://localhost:3000/api",this.$main=$("main"),$(".register").on("click",this.register.bind(this)),$(".login").on("click",this.login.bind(this)),$(".logout").on("click",this.logout.bind(this)),this.$main.on("submit","form",this.handleForm),this.getToken()?this.loggedInState():this.loggedOutState()},App.addInfoWindowForRestaurant=function(t,e){var n=this;google.maps.event.addListener(e,"click",function(){"undefined"!=typeof n.infoWindow&&n.infoWindow.close(),n.infoWindow=new google.maps.InfoWindow({content:"<img"+t.restaurant.featured_image+"><p>"+t.restaurant.name+"</p><p>"+t.restaurant.location.address+"</p><p>"+t.restaurant.location.cuisines+"</p>"}),n.infoWindow.open(n.map,e)})},App.createMarkerForRestaurant=function(t){var e="http://icons.iconarchive.com/icons/icons-land/vista-map-markers/32/Map-Marker-Marker-Outside-Pink-icon.png",n=new google.maps.LatLng(t.restaurant.location.latitude,t.restaurant.location.longitude),o=new google.maps.Marker({position:n,map:this.map,icon:e,animation:google.maps.Animation.DROP});this.addInfoWindowForRestaurant(t,o)},App.loopThroughRestaurants=function(t){$.each(t.restaurants,function(t,e){setTimeout(function(){App.createMarkerForRestaurant(e)},50*t)})},App.getRestaurants=function(){$.get({url:"https://developers.zomato.com/api/v2.1/search?entity_id=256&entity_type=metro&q=restaurants&start=0&count=35&lat=49.280721695&lon=-123.1177491154&radius=2500&cuisines=1-250&establishment_type=1-200&collection_id=1-100&category=10&sort=rating&order=asc",headers:{"user-key":"a076d160e3eff25d9c8448aa2c2dc85b"}}).done(this.loopThroughRestaurants)},App.mapSetup=function(){$("#map-canvas").show();var t=document.getElementById("map-canvas"),e={zoom:14,center:new google.maps.LatLng(49.2824303,(-123.126847)),mapTypeId:google.maps.MapTypeId.ROADMAP};this.map=new google.maps.Map(t,e),this.getRestaurants()},App.loggedInState=function(){$(".loggedIn").show(),$(".loggedOut").hide(),this.mapSetup()},App.loggedOutState=function(){$(".loggedIn").hide(),$(".loggedOut").show(),this.register()},App.register=function(t){t&&t.preventDefault(),$("#map-canvas").hide(),this.$main.html('\n    <h2>Register</h2>\n    <form method="post" action="/register">\n      <div class="form-group">\n        <input class="form-control" type="text" name="user[username]" placeholder="Username">\n      </div>\n      <div class="form-group">\n        <input class="form-control" type="email" name="user[email]" placeholder="Email">\n      </div>\n      <div class="form-group">\n        <input class="form-control" type="password" name="user[password]" placeholder="Password">\n      </div>\n      <div class="form-group">\n        <input class="form-control" type="password" name="user[passwordConfirmation]" placeholder="Password Confirmation">\n      </div>\n      <input class="btn btn-primary" type="submit" value="Register">\n    </form>\n  ')},App.login=function(t){t.preventDefault(),$("#map-canvas").hide(),this.$main.html('\n    <h2>Login</h2>\n    <form method="post" action="/login">\n      <div class="form-group">\n        <input class="form-control" type="email" name="email" placeholder="Email">\n      </div>\n      <div class="form-group">\n        <input class="form-control" type="password" name="password" placeholder="Password">\n      </div>\n      <input class="btn btn-primary" type="submit" value="Login">\n    </form>\n  ')},App.logout=function(t){t.preventDefault(),this.removeToken(),this.loggedOutState()},App.handleForm=function(t){t.preventDefault();var e=""+App.apiUrl+$(this).attr("action"),n=$(this).attr("method"),o=$(this).serialize();return App.ajaxRequest(e,n,o,function(t){t.token&&App.setToken(t.token),App.loggedInState()})},App.ajaxRequest=function(t,e,n,o){return $.ajax({url:t,method:e,data:n,beforeSend:this.setRequestHeader.bind(this)}).done(o).fail(function(t){console.log(t)})},App.setRequestHeader=function(t){return t.setRequestHeader("Authorization","Bearer "+this.getToken())},App.setToken=function(t){return window.localStorage.setItem("token",t)},App.getToken=function(){return window.localStorage.getItem("token")},App.removeToken=function(){return window.localStorage.clear()},$(App.init.bind(App));