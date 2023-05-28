import React from 'react'
import './SectionTwo.css'
import card from '../../assests/imageseven.png'



function CardSectionTwo(props) {
  return (
    <div className='about--section-two-card-container'>
      <img src={card} alt="image" className='about--section-two-card-image'/>
      <div className="overlay-text">
        <h2>{props.title}</h2>
        <p>{props.description}</p>
      </div>
    </div>
  )
}      
{/* <img className='about--section-two-card-image' src={card} alt="image" /> */}


export default CardSectionTwo
