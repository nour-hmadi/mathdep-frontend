import React from 'react'
import './ParallaxComponent.css'
function ParallaxComponent(props) {
  return (
    <div className='parallax-details-component'>
      <h1 className='icons-parallax'>{props.icon}</h1>
      <h1 className='icons-stats'>{props.title}</h1>
      <h2 className='icons-def'>{props.description}</h2>

    </div>
  )
}

export default ParallaxComponent
