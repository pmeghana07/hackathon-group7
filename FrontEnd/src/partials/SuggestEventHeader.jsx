import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import icon from "../images/gs-icon.png";

function SuggestEventHeader() {

  const [top, setTop] = useState(true);

  // detect whether user has scrolled the page down by 10px 
  useEffect(() => {
    const scrollHandler = () => {
      window.pageYOffset > 10 ? setTop(false) : setTop(true)
    };
    window.addEventListener('scroll', scrollHandler);
    return () => window.removeEventListener('scroll', scrollHandler);
  }, [top]);  

  return (
    <header className={`fixed w-full z-30 md:bg-opacity-90 transition duration-300 ease-in-out ${!top && 'bg-white backdrop-blur-sm shadow-lg'}`}>
      <div className="max-w-6xl mx-auto px-5 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">

            {/* Logo */}
            <div className='icon'>
            <Link to="/" className="block" aria-label="Cruip">
            <img src={icon} />
            </Link>
            </div>

        </div>
      </div>
    </header>
  );
}

export default SuggestEventHeader;
