import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { io } from 'socket.io-client'
import SocketContext from './context/sockets';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import Landing from './components/landing/Landing'
import Dashboard from './components/dashboard/Dashboard'
import SinglePost from './components/posts/singlePost';
import About from './components/About';
import { authenticate } from './store/session';
import '../src/components/landing/Landing.css'
import Followers from './components/Follows/Followers';
import Followings from './components/Follows/Followings';
import MainProfile from './components/Profile/MainProfile';
import Messaging from './components/Messages';

const socket = io()

function App() {
  const [loaded, setLoaded] = useState(false);
  const user = useSelector(state => state.session.user)
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
      socket.on('message', 'test')
    })();
  }, [dispatch]);


  // if (user) {
  //   socket.on('message', 'test')
  // }


  if (!loaded) {
    return null;
  }
  return (
    <SocketContext.Provider value={socket}>
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
          <Route path='/users/:userId/followers' exact={true}>
            <Followers />
          </Route>
          <Route path='/users/:userId/following' exact={true}>
            <Followings />
          </Route>
          <Route path='/chat' exact={true}>
            <Messaging />
          </Route>
          <ProtectedRoute path='/dashboard' exact={true}>
            <Dashboard />
          </ProtectedRoute>
          <ProtectedRoute path='/users' exact={true} >
            <UsersList />
          </ProtectedRoute>
          <Route path='/users/:userId' exact={true} >
            <MainProfile />
          </Route>
          <Route path='/' exact={true} >
            <Landing />
          </Route>
          <Route path='/'>
            <div className='four-o-four'><h1 className='four-o-four'>404: Uh oh! We couldn't find that page!</h1></div>
          </Route>
        </Switch>
      </BrowserRouter>
    </SocketContext.Provider>
  );
}

export default App;
