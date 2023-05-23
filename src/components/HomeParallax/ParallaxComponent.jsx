import React from 'react'
import './ParallaxComponent.css'
function ParallaxComponent(props) {
  return (
    <div className='parallax-details-component'>
      <h1 className='icons-parallax'>{props.icon}</h1>
      <h1>{props.title}</h1>
      <h4>{props.description}</h4>

    </div>
  )
}

export default ParallaxComponent
