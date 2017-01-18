// const mongoose = require('mongoose');
// const config = require('../config/config');
//
// mongoose.connect(config.db);
//
// const Restaurant = require('../models/restaurant');
//
// const restaurant1 = new Restaurant({
//   name: 'Cafe Medina',
//   cuisine: 'Eclectic',
//   address: '780 Richards St, Downtown',
//   lat: 49.2805,
//   lng: 123.1169
// });
//
//
// restaurant1.save((err, restaurant) => {
//   if (err) return console.log(err);
//   return console.log(`${restaurant.name} was saved`);
// });
//
// const restaurant2 = new Restaurant({
//   name: 'Twisted Fork',
//   cuisine: 'French bistro',
//   address: '1147 Granville St, Downtown',
//   lat: 49.2778,
//   lng: 123.1255
// });
//
//
// restaurant2.save((err, restaurant) => {
//   if (err) return console.log(err);
//   return console.log(`${restaurant.name} was saved`);
// });
//
// const restaurant3 = new Restaurant({
//   name: 'Tuc Craft Kitchen',
//   cuisine: 'Modern Tavern',
//   address: '60 W Cordova St, Gastown',
//   lat: 49.2827,
//   lng: 123.1061
// });
//
//
// restaurant3.save((err, restaurant) => {
//   if (err) return console.log(err);
//   return console.log(`${restaurant.name} was saved`);
// });
