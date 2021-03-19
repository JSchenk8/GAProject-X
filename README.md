![](/src/images/GALogo.png)

### General Assembly Software Engineering Immersive

# Project X: Cocktail Picker

![](/src/images/Homepage.png)

## Overview

Project X was a mini coding project to introduce React and public APIs. 

We were given a weekend to pick an API and create a small website using React which could dynamically display the content of the API. 

I chose the Cocktails Database as the API for my project, knowing it was a fairly broad free public API. 

If you want to try the website out, you can check it out here: [](https://jschenk8.github.io/GAProject-X/#)

### The End Result

The final website loads a hero banner with a dropdown menu, offering a selection of different alcohols. 

Upon selection, a random cocktail using the chosen alcohol is generated. A card is produced; showing a photograph of the alcohol, the ingredients and quantities, and instructions. This is viewable by scrollign down. 

### Technologies Used

* Cocktail Database API ![](https://www.thecocktaildb.com/api.php)
* React.js
* JavaScript (ES6)
* HTML 5
* SASS/SCSS/CSS
* Bulma ![](bulma.io)
* Git/Github
* Insomnia


### API Fetching

Whilst the Cocktail Database offers a paid version with added functionality, I was simply using the free version. This limited the data available per fetch. 

I used Insomnia to check exactly what data was received from different URLs for the API, and could then build the app around this.

This created a problem initially, as I needed to find a way to get all the cocktails from the database, then filter based on alcohol. At first, I found I was entering infinite render loops by trying to fetch based on an array of all cocktails. 

A work around for this was to fetch all the cocktails by alcohol type, and input their IDs into separate arrays. This was done on the first page load. 

```
//! Get Bourbon Ids
  fetch('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Bourbon')
    .then(resp => resp.json())
    .then(ginDrinks => {
      ginDrinks.drinks.map((drink) => {
        bourbonIds.push(drink.idDrink)
      })
    })
```

Then, when the user selects an alcohol, a random ID is chosen from these arrays and another fetch is performed, getting just that single cocktail. 

```
function selectAlcohol(alcoholString) {
    if (alcoholString === 'Bourbon') {
      const randomNumber = Math.floor(Math.random() * bourbonIds.length)
      const randomBourbonDrinkId = bourbonIds[randomNumber]
      fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${randomBourbonDrinkId}`)
        .then(resp => resp.json())
        .then(bourbonDrink => {
          updateAlcohol(bourbonDrink.drinks[0])
        })
```

This stopped the infinite render loop, and meant that the user could select a random alcohol as many times as they wanted, as the arrays of alcohol IDs were constants after the first load. 


### Displaying the Cocktail Cards

![](/src/images/CocktailPhoto.png)
![](/src/images/IngredientsandMeasures.png)

A simple React function returned JSX to display the cocktail card. 

This used the second fetch to input the cocktail URL, the cocktail name, and the making instructions. 

One difficulty was the format of the API data. For ingredients and measures, the API simply returned items in an object, rather than an array. For each drink there were different quantities of each. 

The work around for this was to create a function which pushed to an array all the ingredients and measures for the cocktail, and filtered out any 'null' values at the end of the array. 

It then joined the two values for measures and arrays so that the final card showed the quantity per ingredient. 

### Styling

I imported Bulma to the project to help with styling. 

Using the html classes to style according to the bulma documentations gave the webpage a simple layout that was easy to use and responsive to different screen sizes. 

## Wins

I was very pleased to achieve the intended functionality of the page. It was my first time using an API and finding workarounds for the limited data capacity was satisfying. 

Furthermore, it was my first project using React. Coming from vanilla Javascript initially it was difficult to wrap my head around React, so it was nice to successfully create a dynamic webpage using it. 

## Challenges

I was unable to completely solve some small display bugs. For example, for certain cocktails the ingredients and measures display additional empty bullet points. 

## Future Improvements

I have considered working on making it better on mobile, perhaps changing the hero banner image and getting the card fonts slightly smaller and more responsive. 

In addition, it could be changed to a single page application, where for each cocktail card a whole new page is rendered, rather than a scroll addition. 