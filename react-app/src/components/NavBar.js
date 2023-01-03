
import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import './landing/Landing.css'

const NavBar = () => {
  const user = useSelector(state => state.session.user)

  return (
    <nav>
      <div>
        <NavLink to='/' exact={true} activeClassName='active'>
          Home
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
        <div>
          <LogoutButton />
        </div>
      }

    </nav>
  );
}

export default NavBar;
