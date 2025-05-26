// import React from 'react';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';

/**
 * A Hero component for the landing page, containing a heading, 
 * descriptive text, and a call-to-action button to start the trip planning process.
 */
function Hero() {
  return (
    <div className="flex flex-col items-center mx-57 gap-9 animate-fadeIn">
      <h1
      className="font-extrabold text-[50px] text-center mt-16 animate-slideDown">
        <span className='text-[#FF6B6B] hover:text-[#FF8E8E] transition-colors duration-300'>Explore Your Next Adventure with AI:</span> <br></br> 
        <span className="bg-gradient-to-r from-[#4A90E2] to-[#50C878] text-transparent bg-clip-text">Personalized Itineraries at Your Fingertips</span>
      </h1>
        <p className='text-xl text-gray-600 text-center animate-fadeIn delay-300'>Your personal travel planner and guide, designing unique plans suited to your preferences and budget.</p>
        <Link to={'/create-trip'}>
          <Button className='bg-gradient-to-r from-[#4A90E2] to-[#50C878] text-white hover:from-[#357ABD] hover:to-[#3DA066] transition-all duration-300 transform hover:scale-105 shadow-lg'>Get Started, Its Free.</Button>
        </Link>
        {/* <img src='/src/assets/landing.png' className='-mt-30 width-[120px] height-[120px] animate-float'/> */}
    </div>
  )
}

export default Hero
