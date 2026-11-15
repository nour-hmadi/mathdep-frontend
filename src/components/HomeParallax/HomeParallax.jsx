import './HomeParallax.css'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import API_URL from '../../config'
import ParallaxComponent from './ParallaxComponent'
import { FaGraduationCap, FaChalkboardTeacher } from 'react-icons/fa';
import { TbReportSearch } from 'react-icons/tb'

// The teacher and research counts come from the API, so they always match the pages.
function HomeParallax() {
  const [teachers, setTeachers] = useState("…");
  const [research, setResearch] = useState("…");

  useEffect(() => {
    axios.get(`${API_URL}/api/user/teachers`).then((res) => setTeachers(res.data.total)).catch(() => setTeachers("–"));
    axios.get(`${API_URL}/api/research/`).then((res) => setResearch(res.data.data.length)).catch(() => setResearch("–"));
  }, []);

  return (
    <div className='home-parallax-container'>
      <div className='hedear-h1-parallax'>
        <ParallaxComponent icon={<FaGraduationCap color="white" className='icons-parallax' />} title="350+" description="STUDENTS"/>
        <ParallaxComponent icon={<FaChalkboardTeacher />} title={teachers} description="Teachers"/>
        <ParallaxComponent icon={<TbReportSearch />} title={research} description="Research"/>
      </div>
    </div>
  )
}

export default HomeParallax
