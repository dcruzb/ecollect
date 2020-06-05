import React, { useEffect, useState, ChangeEvent } from 'react'
import { Link } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import { Map, TileLayer, Marker } from 'react-leaflet'
import api, { apiIBGE } from '../../services/api'

import "./CreatePoint.css";
import logo from '../../assets/logo.svg'

interface Item {
  id: number,
  title: string,
  image_url: string
}

interface State {
  id: number, 
  sigla: string, 
  nome: string
}

interface City {
  id: number,
  nome: string
}

const CreatePoint = () => {
  let [items, setItems] = useState<Item[]>([])
  let [states, setStates] = useState<State[]>([])
  let [cities, setCities] = useState<City[]>([])
  
  let [selectedState, setSelectedState] = useState('0')
  let [selectedCity, setSelectedCity] = useState('0')

  useEffect(() => {
    api.get('items').then(response => {
      setItems(response.data)
    })
  }, [])

  useEffect(() => {
    apiIBGE.get<State[]>('?orderBy=nome').then(response => {
      setStates(response.data)
    })
  }, [])

  useEffect(() => {
    console.log('mudou', selectedState);
    
    if (selectedState == '0') {
      setCities([])
      return
    }

    apiIBGE.get<City[]>(`${selectedState}/municipios?orderBy=nome`).then(response => {
      setCities(response.data)
    })
  }, [selectedState])

  function handleSelectState(event: ChangeEvent<HTMLSelectElement>) {
    setSelectedState(event.target.value)
  }

  function handleSelectCity(event: ChangeEvent<HTMLSelectElement>) {
    setSelectedCity(event.target.value)
  }

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

          <Map center={[-8.02136,-34.961676]} zoom={15}>
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <Marker position={[-8.02136,-34.961676]} />
          </Map>


          <div className="field">
            <label htmlFor="street">Street</label>
            <input type="text" id="street" name="street"/>
          </div>

          <div className="field-group">

            <div className="field">
              <label htmlFor="state">State</label>
              <select name="state" id="state" value={selectedState} onChange={handleSelectState}>
                <option value="0">Choose a State</option>
                {states.map(state => (
                  <option key={state.id} value={state.sigla}>{state.nome}</option>
                ))}
              </select>
            </div>

            <div className="field">
              <label htmlFor="city">City</label>
              <select name="city" id="city" value={selectedCity} onChange={handleSelectCity}>
                <option value="0">Choose a City</option>
                {cities.map(city => (
                  <option key={city.nome} value={city.nome}>{city.nome}</option>
                ))}
              </select>
            </div>

          </div>
        </fieldset>

        <fieldset>
          <legend>
            <h2>Collection Items</h2>
          </legend>

          <ul className="items-grid">
            {items.map(item => (
              <li key={item.id}>
                <img src={item.image_url} alt={item.title}/>
                <span>{item.title}</span>
              </li>
            ))}
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