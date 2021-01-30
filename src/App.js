import React from 'react'
import './styles/style.scss'
import 'bulma'
import { useState } from 'react'


const App = () => {
  //! States
  const [dropdownState, updateDropdownState] = useState('')
  const [alcoholArray, updateAlcohol] = useState([])
  // const [drinkRecipe, updateDrinkRecipe] = useState([])
  let drinkRecipeInstructions


  //! Toggle Display
  function toggleDropdownDisplay() {
    if (dropdownState === 'is-active') {
      updateDropdownState('')
    } else {
      updateDropdownState('is-active')
    }
  }

  function selectAlcohol(alcoholString) {

    fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${alcoholString}`)
      .then(resp => resp.json())
      .then(alcoholData => {
        console.log(`alcoholData is ${alcoholData}`)
        console.log(`alcoholData.drinks is ${alcoholData.drinks}`)
        updateAlcohol(alcoholData.drinks)
      })

  }

  function displayAlcoholCards() {
    console.log('Displaying Cards now')
    if (alcoholArray.length === 0) {
      return
    } else {
      const randomNumber = Math.floor(Math.random() * alcoholArray.length)
      const randomDrink = alcoholArray[randomNumber]
      fetchDrinkRecipe(randomDrink.idDrink)
      return <div className="card">
        <div className="card-image">
          <figure className="image is-48by48">
            <img className="cardImage" src={randomDrink.strDrinkThumb} alt={randomDrink.strDrink} />
          </figure>
        </div>
        <div className="card-content">
          <div className="content">
            <h2>{randomDrink.strDrink}</h2>
            {/* <button className="button" onClick={fetchDrinkRecipe(randomDrink.idDrink)}>Details:</button> */}
            <h3>Instructions:</h3>
            <p>{drinkRecipeInstructions}</p>
          </div>
        </div>
      </div>

    }


  }

  // function displayDrinkRecipe() {
  //   console.log(` instructions are : ${drinkRecipeInstructions}`)
  //   return <div className="card">
  //     <div className="card-content">
  //       <div className="content">
  //         <h3>Instructions:</h3>
  //         <p>{drinkRecipeInstructions}</p>
  //       </div>
  //     </div>
  //   </div>
  // }


  function fetchDrinkRecipe(drinkID) {
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkID}`)
      .then(resp => resp.json())
      .then(drinkRecipe => {
        console.log(`drink recipe is: ${drinkRecipe.drinks[0].strInstructions}`)
        drinkRecipeInstructions = drinkRecipe.drinks[0].strInstructions
      })
  }

  console.log(alcoholArray)


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