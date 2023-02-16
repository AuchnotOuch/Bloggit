
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import DropDown from './DropDown';
import './landing/Landing.css'
import './styles/NavBar.css'


const NavBar = () => {
  const user = useSelector(state => state.session.user)
  const [mountMenu, setMountMenu] = useState(false)


  useEffect(() => {
    const toggleMenu = () => setMountMenu(!mountMenu)
    if (mountMenu) {
      window.addEventListener('click', toggleMenu)
      return () => window.removeEventListener('click', toggleMenu)
    }
  }, [mountMenu])

  return (
    <nav>
      <div>
        <NavLink to='/' exact={true} activeClassName='active'>
          <i className="fa-solid fa-b"></i>
        </NavLink>
      </div>
      {!user &&
        <>
          <div className='login-signup'>
            <div className='login-button'>
              <NavLink to='/login' exact={true} id='login-button-nav' activeClassName='active'>
                Login
              </NavLink>
            </div>
            <div className='signup-button'>
              <NavLink to='/sign-up' exact={true} className='signup-button-nav' activeClassName='active'>
                Sign Up
              </NavLink>
            </div>
          </div>
          {/* <li>
              <NavLink to='/users' exact={true} activeClassName='active'>
                Users
              </NavLink>
            </li> */}
        </>
      }
      {user &&
        <>
          <div className='user-menu-container'>
            <div>
              <button onClick={() => setMountMenu(!mountMenu)} className='user-menu'><i className={mountMenu ? "fa-solid fa-user menu-active" : "fa-solid fa-user"}></i></button>
            </div>
            {mountMenu &&
              <DropDown />
            }
          </div>
        </>

      }

    </nav>
  );
}

export default NavBar;
