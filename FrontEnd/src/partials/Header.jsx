import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import icon from "../images/gs-icon.png";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';

function Header(props) {

  const [top, setTop] = useState(true);
  const [createEventDisplay, setCreateEventDisplay] = useState("")
  let navigate = useNavigate();
  // detect whether user has scrolled the page down by 10px 
  useEffect(() => {
    if (window.location.pathname == "/signup") {
      setCreateEventDisplay("none")
    }
    const scrollHandler = () => {
      window.pageYOffset > 10 ? setTop(false) : setTop(true)
    };
    window.addEventListener('scroll', scrollHandler);
    return () => window.removeEventListener('scroll', scrollHandler);
  }, [top]);  

  const navigateToProfile = () => {
    setTimeout(navigate("/profile"), 3000)
  }

  return (
    <header className={`fixed w-full z-30 md:bg-opacity-90 transition duration-300 ease-in-out ${!top && 'bg-white backdrop-blur-sm shadow-lg'}`}>
      <div className="max-w-6xl mx-auto px-5 sm:px-6">
        <div className="flex items-center h-16 md:h-20">

            {/* Logo */}
            <div className='icon'>
            <Link to="/" className="block" aria-label="Cruip">
            <img src={icon} />
            </Link>
            </div>

          {/* Site navigation */}
          <nav className="flex flex-grow">
            <ul className="flex flex-grow justify-end flex-wrap items-center">
              <li>
                <Link to="/signup" className="btn-sm text-gray-200 bg-gray-900 hover:bg-gray-800 ml-3" style={{display: createEventDisplay}}>
                  <span>Plan a meetup</span>
                  <svg className="w-3 h-3 fill-current text-gray-400 flex-shrink-0 ml-2 -mr-1" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.707 5.293L7 .586 5.586 2l3 3H0v2h8.586l-3 3L7 11.414l4.707-4.707a1 1 0 000-1.414z" fillRule="nonzero" />
                  </svg>                  
                </Link>
                <AccountCircleIcon
                  sx={{ml: 5, color: "#7399c6", fontSize: 40}}
                  onClick={navigateToProfile}
                />
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
