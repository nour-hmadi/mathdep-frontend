import './HomeParallax.css'
import React from 'react'
import ParallaxComponent from './ParallaxComponent'
import { icons } from 'react-icons'
import { FaGraduationCap} from 'react-icons/fa';
import {FaChalkboardTeacher} from 'react-icons/fa';
import {TbReportSearch} from 'react-icons/tb'

function HomeParallax() {
  return (
    <div className='home-parallax-container'>
    <div className='hedear-h1-parallax'>
      <ParallaxComponent icon={<FaGraduationCap color="white" className='icons-parallax' />} title="20,000" description="STUDENTS"/>
      <ParallaxComponent icon={<FaChalkboardTeacher />} title="50" description="Teachers"/>
      <ParallaxComponent icon={<TbReportSearch />} title="112+" description="Research"/>

    </div>
      
    </div>
  )
}

export default HomeParallax
