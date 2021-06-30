import classes from './ProfileForm.module.css';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useContext, useRef, useState } from "react";
import AuthContext from "../store/auth-context";

const ProfileForm = () => {
  const history = useHistory();
  const authCtx = useContext(AuthContext);
  const userId = authCtx.userId;
  const [error, setError] = useState(null);
  const oldPasswordInputRef = useRef();
  const newPasswordInputRef = useRef();
  const confirmNewPasswordInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault()
    const enteredOldPassword = oldPasswordInputRef.current.value;
    const enteredNewPassword = newPasswordInputRef.current.value;
    const enteredConfirmNewPassword = confirmNewPasswordInputRef.current.value;

    if (enteredConfirmNewPassword !== enteredNewPassword){
      setError("new password and confirm new password should be match!!")
    }
    else{
    changePasswordHandler(enteredOldPassword, enteredNewPassword)
    }
  }


  const changePasswordHandler = (oldPass, newPass) => {
    axios
    .post("http://localhost:3001/change_password",{
        user: {
          id: userId,
          old_password: oldPass,
          new_password: newPass,
        }
      }, { withCredentials: true })
    .then((response) => {
      if (response.data.status === "success") {
        history.replace("/articles")
      }
    })
    .catch((error) => {
      console.log("error : ", error);
    });
  }

  return (
    <form onSubmit={submitHandler} className={classes.form}>
      <div className={classes.control}>
        <label htmlFor='old-password'>Old Password</label>
        <input type='password' id='old-password' ref={oldPasswordInputRef} />
      </div>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' ref={newPasswordInputRef}/>
      </div>
      <div className={classes.control}>
        <label htmlFor='new-password-confirm'>Confirm new Password</label>
        <input type='password' id='new-password-confirm' ref={confirmNewPasswordInputRef}/>
      </div>
      {error && <p className={classes.error}>{error}</p>}
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
