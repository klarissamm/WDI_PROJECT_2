#Random notes

##Colours

`#d8828f`
`#e59fa9`
`#ebc0cf`

##Zomato API key:

a076d160e3eff25d9c8448aa2c2dc85b

#City API info:
    {
      "id": 256,
      "name": "Metro Vancouver, BC",
      "country_id": 37,
      "country_name": "Canada",
      "should_experiment_with": 0,
      "discovery_enabled": 0,
      "has_new_ad_format": 1,
      "is_state": 0,
      "state_id": 121,
      "state_name": "British Columbia",
      "state_code": "BC"
    },
    
  lat - 49.280721695
  labg - -123.1177491154
  
#Category API info:
 ```
"categories": [
       {
      "categories": {
        "id": 2,
        "name": "Dine-out"
      }
    },
    {
      "categories": {
        "id": 5,
        "name": "Takeaway"
      }
    },
    {
      "categories": {
        "id": 8,
        "name": "Breakfast"
      }
    },
    {
      "categories": {
        "id": 9,
        "name": "Lunch"
      }
    },
    {
      "categories": {
        "id": 10,
        "name": "Dinner"
      }
    }
  ]
 ```
#Can search via collection:
Weekend brunches

Artisanal cafes

CAN I FILTER BY RATING? AND SHOW TOP 20 OR SOMETHING?

##Neighbourhood locations:
<li>Downtown
<li>Yaletown
<li>Gastown

    {
      "entity_type": "subzone",
      "entity_id": 98130,
      "title": "Yaletown, Vancouver",
      "latitude": 49.2755687553,
      "longitude": -123.1212622066,
      "city_id": 256,
      "city_name": "Metro Vancouver",
      "country_id": 37,
      "country_name": "Canada"
    },
    
        {
      "entity_type": "subzone",
      "entity_id": 98135,
      "title": "Downtown, Vancouver",
      "latitude": 49.282385484,
      "longitude": -123.1196465435,
      "city_id": 256,
      "city_name": "Metro Vancouver",
      "country_id": 37,
      "country_name": "Canada"
    },
    
    {
      "entity_type": "subzone",
      "entity_id": 98137,
      "title": "Gastown, Vancouver",
      "latitude": 49.2824904592,
      "longitude": -123.1057980718,
      "city_id": 256,
      "city_name": "Metro Vancouver",
      "country_id": 37,
      "country_name": "Canada"
    },
    
    {
      "entity_type": "subzone",
      "entity_id": 98139,
      "title": "Kitsilano, Vancouver",
      "latitude": 49.2666413442,
      "longitude": -123.1629130201,
      "city_id": 256,
      "city_name": "Metro Vancouver",
      "country_id": 37,
      "country_name": "Canada"
    },
    
    {
      "entity_type": "subzone",
      "entity_id": 98129,
      "title": "Mount Pleasant, Vancouver",
      "latitude": 49.2623105764,
      "longitude": -123.1012626121,
      "city_id": 256,
      "city_name": "Metro Vancouver",
      "country_id": 37,
      "country_name": "Canada"
    },
    
    

##picture of vancouver
https://unsplash.com/search/vancouver?photo=5tCXFBXAom4

or

https://unsplash.com/search/vancouver?photo=3LOlnKre5XE

or

https://unsplash.com/search/vancouver?photo=vqU-qgyU_mw

##Guide

##Example of setting up project 2 API

The below is a step by step guide / checklist for building a simple API with authentication. This is not necessarily THE right approach, rather the way I would approach this. Feel free to change the order in which you do some of the steps below if it makes more sense to you! :)

N.B. This is intended only as a general guide and therefore contains very little code - it will not give you verbose instructions for how to write out each of the files it refers to. 

1. Set up repo on GitHub called WDI-PROJECT-2

2. Git clone this repo into your development folder in your computer

3. Set up package.json (`npm init`)
Either copy in the correct dependencies from earlier projects and then run `npm i`
OR in terminal, write `npm i` followed by the name of the packages you need, (followed by either `--save` or `--save-dev`).

4. Let's start `touch`ing and `mkdir`ing the stuff we need in our project.
**Directories** and _files_ we'll need:
      
      **controllers** -->
        _statics.js_,
        _authentications.js_,
        _restaurants.js_
      
      **models** -->
        _user.js_,
        _restaurant.js_
      
      **src** -->
        **scss** -->
          _style.scss_,
        **js** -->
          _app.js_
      
      **config** -->
        _config.js_,
        _apiRoutes.js_,
        _webRoutes.js_
      
      **db** -->
        _seeds.js_

      _index.js_
      
      _index.html_

      _gulpfile.js_

5. Copy over all of our gulpfile stuff from earlier examples. Ensure that you also have all the necessary gulp related dev dependencies in your package.json.

6. Let's start writing our index.js. With this finished, it is now time to start writing the other files in your app. Given that we are referring to files in the config directory in the index.js file, I like to start by building out these files

7. Config  - REMEMBER `module.exports` at the bottom of each file! Also ensure you are requiring the controllers at the top of the files!

	3 files: config.js, apiRoutes.js, webRoutes.js

	- Let's start writing out our config/config.js, (where we establish the port, the db name etc.)
	 
	- Now let's start writing out our routes files. 

	- webRoutes
  		- In here, we will define what should be done when a user navigates to the home page (i.e. the url '/'). A get request to this url will execute the 'home' function in the statics contoller:

    		`router.route('/').get(statics.home)`

	- apiRoutes
	  - In here we will define what should happen when requests are made to routes which begin with `/api`. The routes defined here will be for:
    	- restaurants
    	- register
   	 - login

	- The functions which are executed in the routes file are defined in controllers, so let's build out our controllers next.

8. Controllers - REMEMBER `module.exports` at the bottom of each file! Also ensure you are requiring the correct modules/files at the top of each controller!

	3 controllers: statics, restaurants and authentications.

	- authentications.js
    	- this will have two functions:
     	 	- authenticationsLogin (exported as login)
      		- authenticationsRegister (exported as register)
	- then restaurants.js
    	- here there will be just one function defined: restaurantsIndex (exported as index)
	- then statics.js
  		- here there is one function defined which loads up the index.html. This is executed as soon as the page initially loads (i.e. a GET request to the home url (e.g. http://localhost:3000))
	- Given that in these controllers, I am referring to the User model (for login and reigster) and the Restaurant model, I would now look to build out these models files.

9. Models - REMEMBER `module.exports`. Also ensure you are requiring mongoose at the top of the files!

	2 models: user.js, restaurant.js
	- Let's first build the user.js file (as it is more complicated). Please do look carefully at the previous times you have used this file (particularly with your authentication homework)
	
	- Then create your restaurant model

10. Seeds
	- WE ARE NOT GOING TO FULLY BUILD OUT SEEDS YET! Just a couple of examples to test.
	
	- IMPORTANTLY - we are first going to create/register a user. So let's build out a user object with email, username, password, passwordConfirmation etc (corresponding with the model) and then save it with either .save or .create.

	- Let's now create a Restaurant. Let's build out a restaurant object corresponding to the model and then save it in the database using either .save or .create.
	
	- Once you have run the seeds file (creating the User and the Restaurant), go into Insomnia and do the GET request to retrieve all the users and see that it is working. In this case it would be a GET to 'http://localhost:3000/api/users'. If working, do the following:
    	- Copy the token returned.
    	- Go to the headers section of Insomnia, and set 'Authorization' to 'Bearer (+the token you just copied)'
	- This now means that you have a valid token in the header of your request, you can therefore do API calls for the restaurants and not get an 'Unauthorized' response. 
	
	- So... now try to get all your restaurants listed out in Insomnia (i.e. http://localhost:3000/api/restaurants) to see that the restaurant seeded was created properly and that you can retrieve it as well.


---

**Huzzah!** We have set up our API, seeded in one user and one instance of our main resource. This means we can now build out a more robust seeds file, then move on to start building the front end of our application.




