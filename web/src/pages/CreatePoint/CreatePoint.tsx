import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import { Map, TileLayer, Marker } from 'react-leaflet'
import { LeafletMouseEvent } from "leaflet";
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
  let [InitialPosition, setInitialPosition] = useState<[number, number]>([0, 0])
  
  let [selectedState, setSelectedState] = useState('0')
  let [selectedCity, setSelectedCity] = useState('0')
  let [selectedPosition, setSelectedPosition] = useState<[number, number]>([0, 0])
  let [selectedItems, setSelectedItems] = useState<number[]>([])
  let [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
    street: ''
  })

  const history = useHistory()

  useEffect(() => {
    api.get('items').then(response => {
      setItems(response.data)
    })
  }, [])

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((response) => {
      setInitialPosition([response.coords.latitude, response.coords.longitude])
    })
  }, [])

  useEffect(() => {
    apiIBGE.get<State[]>('?orderBy=nome').then(response => {
      setStates(response.data)
    })
  }, [])

  useEffect(() => {  
    if (selectedState === '0') {
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

  function handleMapClick(event: LeafletMouseEvent) {
    setSelectedPosition([event.latlng.lat, event.latlng.lng]);    
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, [event.target.name]: event.target.value})
  }
  
  function handleItemClick(id: number) {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter(item => item != id))
    } else {
      setSelectedItems([...selectedItems, id])
    }
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()

    const point = {
      image: '',
      name: formData.name,
      email: formData.email,
      whatsapp: formData.whatsapp,
      latitude: selectedPosition[0],
      longitude: selectedPosition[1],
      street: formData.street,
      city: selectedCity,
      state: selectedState,
      items: selectedItems
    }

    await api.post('points', point)
    alert('Collect Point registered successfully')
    history.push('/')
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

      <form onSubmit={handleSubmit}>
        <h1>Add a Collection Point</h1>

        <fieldset>
          <legend>
            <h2>Data</h2>
          </legend>

          <div className="field">
            <label htmlFor="name">Entity name</label>
            <input type="text" id="name" name="name" onChange={handleInputChange}/>
          </div>

          <div className="field-group">
            <div className="field">
              <label htmlFor="email">E-mail</label>
              <input type="text" id="email" name="email" onChange={handleInputChange}/>
            </div>
            <div className="field">
              <label htmlFor="whatsapp">Whatsapp</label>
              <input type="text" id="whatsapp" name="whatsapp" onChange={handleInputChange}/>
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend>
            <h2>Address</h2>
            <span>Select the address on the map</span>
          </legend>

          <Map center={InitialPosition} zoom={15} onClick={handleMapClick}>
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <Marker position={selectedPosition} />
          </Map>


          <div className="field">
            <label htmlFor="street">Street</label>
            <input type="text" id="street" name="street" onChange={handleInputChange}/>
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
              <li 
                key={item.id} 
                className={selectedItems.includes(item.id) ? 'selected' : ''}
                onClick={() => handleItemClick(item.id)}>
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