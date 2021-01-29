import React from 'react'
import './styles/style.scss'
import 'bulma'
import { useState } from 'react'


const App = () => {
  //! States
  const [dropdownState, updateDropdownState] = useState('')
  const [alcoholArray, updateAlcohol] = useState([])

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
      return <div className="card">
        <div className="card-image">
          <figure className="image is-48by48">
            <img className="cardImage" src={randomDrink.strDrinkThumb} alt={randomDrink.strDrink} />
          </figure>
        </div>
        <div className="card-content">
          <div className="content">
            <h3>{randomDrink.strDrink}</h3>
            <button>Details:</button>
          </div>
        </div>
      </div>
  
    }
    

  }

  console.log(alcoholArray)


  //! Render on Screen
  return <div>
    <section className="hero is-fullheight header-image is-primary">
      <div className="hero-head">
        <div className="">
          <p className="title">
            Happy Hour! Come and look for some cocktails...
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
                }} href="#" className="dropdown-item">Bourbon</a>
                <hr className="dropdown-divider"></hr>
                <a onClick={() => {
                  selectAlcohol('Champagne')
                }} href="#" className="dropdown-item">Champagne</a>
                <hr className="dropdown-divider"></hr>
                <a onClick={() => {
                  selectAlcohol('Gin')
                }} href="#" className="dropdown-item">Gin</a>
                <hr className="dropdown-divider"></hr>
                <a onClick={() => {
                  selectAlcohol('Rum')
                }} href="#" className="dropdown-item">Rum</a>
                <hr className="dropdown-divider"></hr>
                <a onClick={() => {
                  selectAlcohol('Vodka')
                }} href="#" className="dropdown-item">Vodka</a>
                <hr className="dropdown-divider"></hr>
                <a onClick={() => {
                  selectAlcohol('Whiskey')
                }} href="#" className="dropdown-item">Whiskey</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section className="section">
      {displayAlcoholCards()}
    </section>

  </div>
}

export default App