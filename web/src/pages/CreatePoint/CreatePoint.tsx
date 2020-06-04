import React from 'react'
import { Link } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'

import "./CreatePoint.css";
import logo from '../../assets/logo.svg'

const CreatePoint = () =>{
  return (
    <div id="page-create-point">
      <header>
        <img src={logo} alt="Ecollect"/>

        <Link to="/">
          <FiArrowLeft />
          Back to home
        </Link>
      </header>

      <form action="">
        <h1>Add a Collection Point</h1>

        <fieldset>
          <legend>
            <h2>Data</h2>
          </legend>

          <div className="field">
            <label htmlFor="name">Entity name</label>
            <input type="text" id="name" name="name"/>
          </div>

          <div className="field-group">
            <div className="field">
              <label htmlFor="email">E-mail</label>
              <input type="text" id="email" name="email"/>
            </div>
            <div className="field">
              <label htmlFor="whatsapp">Whatsapp</label>
              <input type="text" id="whatsapp" name="whatsapp"/>
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend>
            <h2>Address</h2>
            <span>Select the address on the map</span>
          </legend>

          <div className="field">
            <label htmlFor="street">Street</label>
            <input type="text" id="street" name="street"/>
          </div>

          <div className="field-group">
            <div className="field">
              <label htmlFor="state">State</label>
              <select name="state" id="state">
                <option value="0">Choose a State</option>
              </select>
            </div>
            <div className="field">
              <label htmlFor="city">City</label>
              <select name="city" id="city">
                <option value="0">Choose a City</option>
              </select>
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend>
            <h2>Collection Items</h2>
          </legend>

          <ul className="items-grid">
            <li>
              <img src="http://localhost:3333/uploads/cooking-oil.svg" alt="Cooking oil"/>
              <span>Cooking oil</span>
            </li>
            <li>
              <img src="http://localhost:3333/uploads/cooking-oil.svg" alt="Cooking oil"/>
              <span>Cooking oil</span>
            </li>
            <li>
              <img src="http://localhost:3333/uploads/cooking-oil.svg" alt="Cooking oil"/>
              <span>Cooking oil</span>
            </li>
            <li>
              <img src="http://localhost:3333/uploads/cooking-oil.svg" alt="Cooking oil"/>
              <span>Cooking oil</span>
            </li>
            <li>
              <img src="http://localhost:3333/uploads/cooking-oil.svg" alt="Cooking oil"/>
              <span>Cooking oil</span>
            </li>
            <li>
              <img src="http://localhost:3333/uploads/cooking-oil.svg" alt="Cooking oil"/>
              <span>Cooking oil</span>
            </li>
          </ul>
        </fieldset>


        <button type="submit">
          Register collection point
        </button>
      </form>
    </div>
  )
}

export default CreatePoint