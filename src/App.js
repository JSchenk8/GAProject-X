import React from 'react'
import './styles/style.scss'
import 'bulma'
import { useState } from 'react'


const App = () => {
  //! States
  const [dropdownState, updateDropdownState] = useState('')
  const [alcoholArray, updateAlcohol] = useState([])
  const bourbonIds = []
  const champagneIds = []
  const ginIds = []
  const rumIds = []
  const vodkaIds = []
  const whiskeyIds = []
  //! Get Bourbon Ids
  fetch('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Bourbon')
    .then(resp => resp.json())
    .then(ginDrinks => {
      ginDrinks.drinks.map((drink) => {
        bourbonIds.push(drink.idDrink)
      })
    })
  //! Get Champagne Ids
  fetch('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Champagne')
    .then(resp => resp.json())
    .then(ginDrinks => {
      ginDrinks.drinks.map((drink) => {
        champagneIds.push(drink.idDrink)
      })
    })
  //! Get Gin Ids
  fetch('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Gin')
    .then(resp => resp.json())
    .then(ginDrinks => {
      ginDrinks.drinks.map((drink) => {
        ginIds.push(drink.idDrink)
      })
    })
  //! Get Rum Ids
  fetch('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Rum')
    .then(resp => resp.json())
    .then(ginDrinks => {
      ginDrinks.drinks.map((drink) => {
        rumIds.push(drink.idDrink)
      })
    })
  //! Get Vodka Ids
  fetch('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Vodka')
    .then(resp => resp.json())
    .then(ginDrinks => {
      ginDrinks.drinks.map((drink) => {
        vodkaIds.push(drink.idDrink)
      })
    })
  //! Get Whiskey Ids
  fetch('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Whiskey')
    .then(resp => resp.json())
    .then(ginDrinks => {
      ginDrinks.drinks.map((drink) => {
        whiskeyIds.push(drink.idDrink)
      })
    })

  //! Toggle Display
  function toggleDropdownDisplay() {
    if (dropdownState === 'is-active') {
      updateDropdownState('')
    } else {
      updateDropdownState('is-active')
    }
  }

  function selectAlcohol(alcoholString) {
    if (alcoholString === 'Bourbon') {
      const randomNumber = Math.floor(Math.random() * bourbonIds.length)
      const randomBourbonDrinkId = bourbonIds[randomNumber]
      fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${randomBourbonDrinkId}`)
        .then(resp => resp.json())
        .then(bourbonDrink => {
          updateAlcohol(bourbonDrink.drinks[0])
        })
    } else if (alcoholString === 'Champagne') {
      const randomNumber = Math.floor(Math.random() * champagneIds.length)
      const randomChampagneDrinkId = champagneIds[randomNumber]
      fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${randomChampagneDrinkId}`)
        .then(resp => resp.json())
        .then(champagneDrink => {
          updateAlcohol(champagneDrink.drinks[0])
        })
    } else if (alcoholString === 'Gin') {
      const randomNumber = Math.floor(Math.random() * ginIds.length)
      const randomGinDrinkId = ginIds[randomNumber]
      fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${randomGinDrinkId}`)
        .then(resp => resp.json())
        .then(ginDrink => {
          updateAlcohol(ginDrink.drinks[0])
        })
    } else if (alcoholString === 'Rum') {
      const randomNumber = Math.floor(Math.random() * rumIds.length)
      const randomRumDrinkId = rumIds[randomNumber]
      fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${randomRumDrinkId}`)
        .then(resp => resp.json())
        .then(rumDrink => {
          updateAlcohol(rumDrink.drinks[0])
        })
    } else if (alcoholString === 'Vodka') {
      const randomNumber = Math.floor(Math.random() * vodkaIds.length)
      const randomVodkaDrinkId = vodkaIds[randomNumber]
      fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${randomVodkaDrinkId}`)
        .then(resp => resp.json())
        .then(vodkaDrink => {
          updateAlcohol(vodkaDrink.drinks[0])
        })
    } else if (alcoholString === 'Whiskey') {
      const randomNumber = Math.floor(Math.random() * whiskeyIds.length)
      const randomWhiskeyDrinkId = whiskeyIds[randomNumber]
      fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${randomWhiskeyDrinkId}`)
        .then(resp => resp.json())
        .then(whiskeyDrink => {
          updateAlcohol(whiskeyDrink.drinks[0])
        })
    }


  }

  function displayAlcoholCards() {
    if (alcoholArray.length === 0) {
      return <p>Pick your alcohol!</p>
    } else {
      return <div className="card">
        <div className="card-image">
          <figure className="image is-48by48">
            <img className="cardImage" src={alcoholArray.strDrinkThumb} alt={alcoholArray.strDrink} />
          </figure>
        </div>
        <div className="card-content">
          <div className="content">
            <h2>{alcoholArray.strDrink}</h2>
            <h3>Instructions:</h3>
            <p>Glass: {alcoholArray.strGlass}</p>
            <p>Ingredients:</p>
            <ul>{listIngredients()}</ul>
            <p>{alcoholArray.strInstructions}</p>
          </div>
        </div>
      </div>

    }
  }

  function listIngredients() {
    const ingredientsArray = []
    ingredientsArray.push(alcoholArray.strIngredient1)
    ingredientsArray.push(alcoholArray.strIngredient2)
    ingredientsArray.push(alcoholArray.strIngredient3)
    ingredientsArray.push(alcoholArray.strIngredient4)
    ingredientsArray.push(alcoholArray.strIngredient5)
    ingredientsArray.push(alcoholArray.strIngredient6)
    ingredientsArray.push(alcoholArray.strIngredient7)
    ingredientsArray.push(alcoholArray.strIngredient8)
    ingredientsArray.push(alcoholArray.strIngredient9)
    ingredientsArray.push(alcoholArray.strIngredient10)
    ingredientsArray.push(alcoholArray.strIngredient11)
    ingredientsArray.push(alcoholArray.strIngredient12)
    ingredientsArray.push(alcoholArray.strIngredient13)
    ingredientsArray.push(alcoholArray.strIngredient14)
    ingredientsArray.push(alcoholArray.strIngredient15)
    const filteredIngredientsArray = ingredientsArray.filter((ingredient) => {
      return (ingredient !== null)
    })
    const measuresArray = []
    measuresArray.push(alcoholArray.strMeasure1)
    measuresArray.push(alcoholArray.strMeasure2)
    measuresArray.push(alcoholArray.strMeasure3)
    measuresArray.push(alcoholArray.strMeasure4)
    measuresArray.push(alcoholArray.strMeasure5)
    measuresArray.push(alcoholArray.strMeasure6)
    measuresArray.push(alcoholArray.strMeasure7)
    measuresArray.push(alcoholArray.strMeasure8)
    measuresArray.push(alcoholArray.strMeasure9)
    measuresArray.push(alcoholArray.strMeasure10)
    measuresArray.push(alcoholArray.strMeasure11)
    measuresArray.push(alcoholArray.strMeasure12)
    measuresArray.push(alcoholArray.strMeasure13)
    measuresArray.push(alcoholArray.strMeasure14)
    measuresArray.push(alcoholArray.strMeasure15)
    const filteredMeasuresArray = measuresArray.filter((measure) => {
      return (measure !== null)
    })
    const measuresAndIngredientsArray = []
    for (let i = 0; i < filteredMeasuresArray.length; i++) {
      measuresAndIngredientsArray.push(`${filteredMeasuresArray[i]} ${filteredIngredientsArray[i]}`)
    }
    const filteredMeasuresAndIngredientsArray = measuresAndIngredientsArray.filter(item => item)
    return filteredMeasuresAndIngredientsArray.map((ingredient, index) => {
      return <li key={index}>{ingredient}</li>
    })
  }

  //! Render on Screen
  return <div>
    <section className="hero is-fullheight header-image is-primary">
      <div className="hero-head">
        <div className="">
          <p className="title">
            Happy Hour! Pick your alcohol and let us provide you with a random cocktail...
          </p>
        </div>
      </div>
      <div className="hero-body">
        <div className="container has-text-centered">
          <div className={`dropdown ${dropdownState}`}>
            <div className="dropdown-trigger">
              <button onClick={toggleDropdownDisplay} className="button" aria-haspopup="true" aria-controls="dropdown-menu">
                <span>Pick an alcohol:</span>
                <span className="icon is-small">
                  <i className="fas fa-angle-down" aria-hidden="true"></i>
                </span>
              </button>
            </div>
            <div className="dropdown-menu" id="dropdown-menu" role="menu">
              <div className="dropdown-content">
                <a onClick={() => {
                  selectAlcohol('Bourbon')
                  toggleDropdownDisplay()
                }} href="#" className="dropdown-item">Bourbon</a>
                <hr className="dropdown-divider"></hr>
                <a onClick={() => {
                  selectAlcohol('Champagne')
                  toggleDropdownDisplay()
                }} href="#" className="dropdown-item">Champagne</a>
                <hr className="dropdown-divider"></hr>
                <a onClick={() => {
                  selectAlcohol('Gin')
                  toggleDropdownDisplay()
                }} href="#" className="dropdown-item">Gin</a>
                <hr className="dropdown-divider"></hr>
                <a onClick={() => {
                  selectAlcohol('Rum')
                  toggleDropdownDisplay()
                }} href="#" className="dropdown-item">Rum</a>
                <hr className="dropdown-divider"></hr>
                <a onClick={() => {
                  selectAlcohol('Vodka')
                  toggleDropdownDisplay()
                }} href="#" className="dropdown-item">Vodka</a>
                <hr className="dropdown-divider"></hr>
                <a onClick={() => {
                  selectAlcohol('Whiskey')
                  toggleDropdownDisplay()
                }} href="#" className="dropdown-item">Whiskey</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="hero-foot">
        <div className="container has-text-centered is-clipped">
          Scroll Down
        </div>
      </div>
    </section>
    <section className="section">
      {displayAlcoholCards()}
    </section>
    {/* <section className="section">
      {displayDrinkRecipe()}
    </section> */}

  </div>
}

export default App