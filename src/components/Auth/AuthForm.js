import { useState, useRef, useContext } from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import AuthContext from "../store/auth-context";
import classes from './AuthForm.module.css';

const AuthForm = () => {
  const history = useHistory();

  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordInputRef = useRef();
  const usernameInputRef = useRef();

  const authCtx = useContext(AuthContext)
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState(null);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (isLogin){
      const enteredEmail = emailInputRef.current.value;
      const enteredPassword = passwordInputRef.current.value;
      axios
      .post(
        "http://localhost:3001/sessions",
        {
          user: {
            email: enteredEmail,
            password: enteredPassword,
          },
        },
        { withCredentials: true }
      )
      .then((response) => {
        if (response.data.logged_in) {
          authCtx.login(response.data.user)
          history.replace("/")
        }  else if (response.data.status === 'failed') {
          setError("invalid email or password, try again!!")
        }
      })
      .catch((error) => {
        console.log(" login Error : ", error);
      });

    } else {
      const enteredUsername = usernameInputRef.current.value;
      const enteredEmail = emailInputRef.current.value;
      const enteredPassword = passwordInputRef.current.value;
      const enteredConfirmPassword = confirmPasswordInputRef.current.value;

      axios.post("http://localhost:3001/registrations", {
        user: {
          username: enteredUsername,
          email: enteredEmail,
          password: enteredPassword,
          password_confirmation: enteredConfirmPassword
        }
      }, 
      {withCredentials: true}
      ).then(response => {
        if(response.data.status === 'created'){
          authCtx.signup(response.data.user)
          history.replace("/")        
        } else {
          setError("something went wrong!!")
        }
      }).catch(error => {
        console.log("Error : ", error)
      })
    };
    }
    

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      {error && <p className={classes.error}>{error}</p>}
      <form onSubmit={submitHandler}>
        {!isLogin &&
          <div className={classes.control}>
            <label htmlFor='username'>Username </label>
            <input type='text' id='username' ref={usernameInputRef} required />
          </div>}
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' ref={emailInputRef} required />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input type='password' id='password' ref={passwordInputRef} required />
        </div>
        {!isLogin &&
          <div className={classes.control}>
            <label htmlFor='confirm-password'>Confirm Password</label>
            <input type='password' id='password' ref={confirmPasswordInputRef} required />
          </div>}
        <div className={classes.actions}>
          <button>{isLogin ? 'Login' : 'Create Account'}</button>
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
