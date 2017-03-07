# WDI_PROJECT_2
#VancApp

**A Google Maps application by Klarissa Munz**

See it here: [VancApp](https://vanc-app.herokuapp.com/).

![image](http://i.imgur.com/RGg7G9P.jpg) 
![image](http://i.imgur.com/serionf.jpg)


##Overview

VancApp is a Vancouver restaurant map that makes restaurant searches easier. It was created as my second project for a 12-week Web Development Immersive course at General Assembly in London. I used to live in Vancouver, and the great places to eat and hang out is one of the many things I miss about it, so I based the app there instead of London.

##How it works

Once you're logged into the app, you are presented with a map of central Vancouver. Upon clicking the START button, a sidebar slides out, so that you may then choose breakfast, lunch or supper to begin your search for the perfect place to eat.

![image](http://i.imgur.com/K32JGyM.jpg)

Once you've clicked on the right type of meal, you can filter by neighbourhood from a drop-down selection box option menu. This is so that you can plan ahead, rather than just find places that are near your current location.

![image](http://i.imgur.com/Gk9PHQ6.jpg)

Pins will then drop to indicate the restaurants that exist for that type of meal, in that neighbourhood.
 
![image](http://i.imgur.com/lMG5Oik.jpg)

You can click on these to bring up an info window containing additional information, such as an image, the type of cuisine of the restaurant, and the exact address. 

![image](http://i.imgur.com/BqMllMm.jpg)

Once you find one that you like the look of, you can add it to your day planner and move onto the next meal until you have a place to eat for breakfast, lunch and supper!

![image](http://i.imgur.com/RGSwE8z.jpg)

##Background

Register and Login was built on JWT authentication. I used jQuery, ES6, HTML5 and SASS on the front-end, Node/Express on the back-end, and Gulp and Bower as task managers.

I used the Zomato API to serve data to Google Maps and filtered the data for the relevant neighbourhood and type of meal.

##Challenges

The biggest challenge was moving the information about the restaurant from the info window to the day meal planner in the side bar.

##What next?

In the future, I wish to add further filters, and perhaps expand the app so that it deals with other areas of Vancouver that are further afield.

