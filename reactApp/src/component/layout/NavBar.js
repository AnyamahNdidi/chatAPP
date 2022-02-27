import React from 'react'

function NavBar() {
  return (
    <>
   <nav className="green">
  <div className="nav-wrapper">
    <a href="#" className="brand-logo">chat</a>
  

    <ul id="nav-mobile" className="right hide-on-med-and-down">
      <li><a href="#">logIn</a></li>
      <li><a href="#">Sign Up</a></li>
      <li><a href="#">Log Out</a></li>
    </ul>
    <a href="#" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></a>
  </div>
</nav>
 <ul className="sidenav" id="mobile-demo">
  <li><a href="#">Login</a></li>
  <li><a href="#">Sign Up</a></li>
  <li><a href="#">Javascript</a></li>
  <li><a href="#">Log Out</a></li>
</ul>

</>


  )
}

export default NavBar
