
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import DropDown from './DropDown';
import './landing/Landing.css'
import './styles/NavBar.css'


const NavBar = () => {
  const user = useSelector(state => state.session.user)
  const [mountMenu, setMountMenu] = useState(false)

  const toggleMenu = () => setMountMenu(!mountMenu)

  return (
    <nav>
      <div>
        <NavLink to='/' exact={true} activeClassName='active'>
          <i class="fa-solid fa-b"></i>
        </NavLink>
      </div>
      {!user &&
        <>
          <div className='login-signup'>
            <div className='login-button'>
              <NavLink to='/login' exact={true} activeClassName='active'>
                Login
              </NavLink>
            </div>
            <div className='signup-button'>
              <NavLink to='/sign-up' exact={true} activeClassName='active'>
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
              <button onClick={toggleMenu} className='user-menu'><i className="fa-solid fa-user"></i></button>
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
