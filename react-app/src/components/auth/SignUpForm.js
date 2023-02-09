import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [profilePhoto, setProfilePhoto] = useState('')
  const [blogTitle, setBlogTitle] = useState('')
  const [description, setDescription] = useState('')
  const [showErrors, setShowErrors] = useState(false)
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const errorArr = []
    const picTypes = ['jpg', 'jpeg', 'png', 'gif', 'svg']

    const validUrl = (str) => {
      try {
        const url = new URL(str)
        if (url.protocol === 'http:' || url.protocol === 'https:') {
          return true
        }
      }
      catch (e) {
        return false
      }
    }

    if (username.length > 40 || username.length < 1) {
      errorArr.push('Username must be 40 characters or less and greater than 1')
    }
    if (!validUrl(profilePhoto)) {
      errorArr.push('Please provide a valid image link')
    }
    if (!picTypes.includes(profilePhoto.split(".").pop())) {
      errorArr.push("Please provide a jpg, jpeg, png, gif, or svg")
    }
    if (password.length < 8) {
      errorArr.push("Password must be 8 or more characters")
    }
    if (password !== repeatPassword) {
      errorArr.push("Passwords must match!")
    }
    setErrors(errorArr)
  }, [profilePhoto, username, password, repeatPassword, email])

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password, profilePhoto));
      if (data) {
        setErrors(data)
      }
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className='signup-container'>
      <div className="welcome-blogsta-signup">Blogsta</div>

      <form onSubmit={onSignUp}>
        <div>
          {/* {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))} */}
        </div>
        <div>
          {/* <label>User Name</label> */}
          <input
            type='text'
            name='username'
            onChange={updateUsername}
            value={username}
            placeholder="Username"
            id='email-input'
          ></input>
        </div>
        <div>
          {/* <label>Email</label> */}
          <input
            type='text'
            name='email'
            onChange={updateEmail}
            value={email}
            placeholder='Email'
            id='email-input'
          ></input>
        </div>
        <div>
          {/* <label>Email</label> */}
          <input
            type='text'
            name='profile-photo'
            onChange={e => setProfilePhoto(e.target.value)}
            value={profilePhoto}
            placeholder='Profile Photo Url'
            id='email-input'
          ></input>
        </div>
        <div>
          {/* <label>Password</label> */}
          <input
            type='password'
            name='password'
            onChange={updatePassword}
            value={password}
            placeholder='Password'
            id='email-input'
          ></input>
        </div>
        <div>
          {/* <label>Repeat Password</label> */}
          <input
            type='password'
            name='repeat_password'
            onChange={updateRepeatPassword}
            value={repeatPassword}
            required={true}
            placeholder='Confirm Password'
            id='email-input'
          ></input>
        </div>
        <button disabled={!!errors.length} id='demo-button' type='submit'>Sign Up</button>
      </form>
      {errors.map((error, ind) => (
        <div key={ind}>{error}</div>
      ))}
    </div>
  );
};

export default SignUpForm;
