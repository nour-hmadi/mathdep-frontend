import React from 'react'
import "./SocialMediaIcon.css"

function SocialMediaIcon(props) {
  return (
    <div className='icons-div'>
      <a className="social-media-react-icon" href="#">{props.icon}</a>
    </div>
  )
}

export default SocialMediaIcon
