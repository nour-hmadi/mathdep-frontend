import React from 'react'
import logo from "../../assests/facultyofsciences.jpg";
import './DepartmentLogo.css'


function DepartmentLogo() {
  return (
    <div className='dep-logo'>
      
      <img src={logo} alt="mathdep logo" className="navbar-logo" />
        <h1 className="navbar-title"><span>Math</span>ematics<br/><span>Dep</span>artment</h1>
    </div>
  )
}

export default DepartmentLogo
