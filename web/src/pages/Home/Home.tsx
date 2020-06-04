import React from 'react'
import { FiLogIn } from 'react-icons/fi'
import { Link } from 'react-router-dom'

import './Home.css'
import logo from '../../assets/logo.svg'

const Home = () => {
  return (
    <div id="page-home">
      <div className="content">
        <header>
          <img src={logo} alt="Ecollect"/>
        </header>

        <main>
          <h1>Your waste collection marketplace.</h1>
          <p>We help people find collection points efficiently.</p>

          <Link to="/create-point">
            <span><FiLogIn /></span>

            <strong>Register a Collect Point</strong>
          </Link>
        </main>
      </div>
    </div>
  )
}

export default Home