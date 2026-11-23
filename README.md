# Project reflection

## 1. Setup instructions

The project is a client-side web application using HTML, CSS and JavaScript. There are three main files:

- webpage.html: Contains the structure of the webpage
- style.css: Contains basic styling and layout
- GameSelection.js: Implements the functionality, retrieves information, and displays content.

The project is run locally by opening the webpage.html file in a web browser. Internet connection is required to retrieve the game information from the CheapShark API that was used.

## 2. Choices and design decisions

I decided to use some built-in funcions sunch as map and filter instead of building my own because these functions simplify the code.

## 3. Obstacles encountered

CheapShark API created an obstacle with integration. I had to change some of the structure of my code and map the API into objects that were compatible with my existing code.

I had both an HTML file with code as well as some HTML code in my javascript file. This caused some debugging problems with syntax.

In the beginning I had a filter for the different gaming platform where you could buy games but the Cheapshark API only had storeID so I decided to keep it simple and remove that from my code.

## 4. Resources used

- HTML, CSS, JavaScript
- CheapShark API
- MDN Web Docs
- GeeksForGeeks
- W3Schools: https://www.w3schools.com/js/js_async.asp
https://www.w3schools.com/js/js_api_intro.asp

## 5. Time taken

The project was implemented incrementally. It took me about 3.5 hours in total. Some of the time was also spent understanding the api and debugging.

## 6. What I would do differently

I would spend more time on planning out the structure before jumping in immediately. I did constrain myself with time which added to the lack of structuring a good plan.

I would have implemented error handling earlier to catch bugs earlier.

I would seperate the API functionality from teh display and filtering functionality. This would make the code more modular and easy to maintain.

## 7. Assumptions

- An internet connection
- CheapShark API would provide the necessary information about the games.
- Sales price is used to filter max price as this is the price users will pay.
- A game is considered on sale purely based on its normal price being higher than the sales price.
- No backend is required because the information is retrieved from an API.