import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import Landing from './components/landing/Landing'
import Dashboard from './components/dashboard/Dashboard'
import SinglePost from './components/posts/singlePost';
import About from './components/About';
import { authenticate } from './store/session';
import '../src/components/landing/Landing.css'

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <Route path='/about' exact={true}>
          <About />
        </Route>
        <Route path='/:userName/post/:postId' exact={true}>
          <SinglePost />
        </Route>
        <ProtectedRoute path='/dashboard' exact={true}>
          <Dashboard />
        </ProtectedRoute>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList />
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <Route path='/' exact={true} >
          <Landing />
        </Route>
        <Route path='/'>
          <div className='four-o-four'><h1 className='four-o-four'>404: Uh oh! We couldn't find that page!</h1></div>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
