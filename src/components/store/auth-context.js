import React, { useState, useEffect, useCallback } from 'react';

const AuthContext = React.createContext({
  username: '',
  userId: '',
  isLoggedIn: false,
  signup: (userData) => {},
  login: (userData) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const initialId = localStorage.getItem('id')
  const initialUsername = localStorage.getItem('username')
  const initialLogin = localStorage.getItem('isLogin')
  const [userIsLoggedIn, setUserIsLoggedIn] = useState(initialLogin);
  const [userId, setUserId] = useState(initialId)
  const [loginUsername, setLoginUsername] = useState(initialUsername);


  const logoutHandler = () => {
    setLoginUsername(null);
    setUserIsLoggedIn(false)
    localStorage.removeItem('user')
    localStorage.removeItem('id')
    localStorage.removeItem('isLogin')
  }

  const signupHandler = (userData) => {
    localStorage.setItem('username', userData.username)
    localStorage.setItem('id',userData.id)
    localStorage.setItem('isLogin',true)
    setLoginUsername(userData.username);
    setUserId(userData.id)
    setUserIsLoggedIn(true)
  }

  const loginHandler = (userData) => {
    localStorage.setItem('username', userData.username)
    localStorage.setItem('id',userData.id)
    localStorage.setItem('isLogin',true)
    setLoginUsername(userData.username);
    setUserId(userData.id)
    setUserIsLoggedIn(true)
  };

  // console.log(loginUser);

  const contextValue = {
    username: loginUsername,
    userId: userId,
    isLoggedIn: userIsLoggedIn,
    signup: signupHandler,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
