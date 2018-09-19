#VancApp

**A Google Maps application by Klarissa M**

See it here: [VancApp](https://vanc-app.herokuapp.com/).

![image](http://i.imgur.com/RGg7G9P.jpg) 
![image](http://i.imgur.com/serionf.jpg)


##Overview

VancApp is a Vancouver restaurant map that makes restaurant searches easier. It was created as my second project for a 12-week Web Development Immersive course at General Assembly in London. I used to live in Vancouver, and the great places to eat and hang out is one of the many things I miss about it, so I based the app there instead of London. Initially, the app was going to take the location of the user to find the best and nearest places to eat for a particular meal, but as an avid planner, I decided a user should have the ability to plan ahead, and therefore the app allows users to find the best and nearest restaurants to any location.

VancApp is a MEN stack app - Mongo, Express and Node - with jQuery on the front-end. It was built in 4 days after a month of learning. 

##How it works

A photo of Vancouver greets the user, with a delay on the modal that explains what the app does, and allows a user to log in or register. Log in / register is built on JWT authentication. Once the user has logged in or registered, they are assigned a unique session token which allows them to make the API requests necessary for the application to work.

Once the user has logged in the app, they are presented with a map of central Vancouver. Upon clicking the START button, a sidebar slides out, with the option of choosing breakfast, lunch or supper to begin a search for the perfect place to eat.

![image](http://i.imgur.com/K32JGyM.jpg)

Once a user has clicked on the type of meal they are looking for, they can filter by neighbourhood from a drop-down selection box option menu. I decided to restrict the number of locations in order to keep the app centrally-focussed.


![image](http://i.imgur.com/Gk9PHQ6.jpg)

Pins will then drop to indicate the restaurants that exist for that type of meal, in that neighbourhood.
 
![image](http://i.imgur.com/lMG5Oik.jpg)

Users can click on these to bring up an info window containing additional information, such as an image, the type of cuisine of the restaurant, and the exact address. 

![image](http://i.imgur.com/BqMllMm.jpg)

Once a user finds a place they like the look of, they can add it to their day planner and move onto the next meal until they've planned a place to eat for breakfast, lunch and supper!

They can always then run a new search as well.

![image](http://i.imgur.com/RGSwE8z.jpg)

##Background and design

Vancouver is a beautiful city on the sea and I wanted the design and colour choice to reflect that. I matched the blues and greys of the nav bar and map to the photo of Vancouver that begins the user's journey on the app. All the other colours are simply darker or lighter shades of the same blue, combined with white, in order to have a sharp and clean look.

I designed how the app would look with wireframes using Balsamiq, mainly the map and the sidebar.

I used Snazzy Maps for the customised map as I wanted something that fitted my color scheme, and looked cleaner than the general Google maps theme.

![image](http://i.imgur.com/bmEC1hA.jpg)
![image](http://i.imgur.com/ZCmSMTA.jpg)


##API

Register and Login was built on JWT authentication. I used jQuery, ES6, HTML5 and SASS on the front-end, Node/Express on the back-end, and Gulp and Bower as task managers.

After researching which API would best suit the app, I used the Zomato API to serve data to Google Maps and filtered the data on the front-end for the relevant neighbourhood and type of meal.


##What next?

I would love to add further filters, and perhaps add other cities to the mix, like New York or Toronto.

##Technnology used

<li>HTML5
<li>SCSS
<li>jQuery
<li>Node.js
<li>Express.js
<li>Gulp
<li>Bower
<li>GoogleMaps API
<li>Zomato API
