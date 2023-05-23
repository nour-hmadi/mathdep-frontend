import React from 'react'
import Navbar from '../Navbar/Navbar';

function ContactHeader({ backgroundImage, minHeight = "600px" }) {
    const style = {
        
        // backgroundImage: ` url(${backgroundImage})`,
        minHeight,
        backgroundAttachment: "fixed",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
    
      };
  return (
    <div  style={style}>
     <div className="filter-top-layer">
      <Navbar />
    </div>
    </div>
  )
}

export default ContactHeader
