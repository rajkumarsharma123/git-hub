import React from 'react'
import { Link } from 'react-router-dom'
import {BsGithub} from "react-icons/bs"
const Navbar = () => {
  return (
    <div>

<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <Link className="navbar-brand" to="/"> <BsGithub style={{marginRight:"15px"}}/> My-Github</Link>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
    <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
      <li className="nav-item active">
        <Link className="nav-link" href="/">Home <span className="sr-only">(current)</span></Link>
      </li>
    </ul>
  </div>
</nav>
    </div>
  )
}

export default Navbar