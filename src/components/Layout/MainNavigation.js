import { Link } from "react-router-dom";
import { useContext } from "react";
import classes from "./MainNavigation.module.css";
import AuthContext from "../store/auth-context";
import axios from "axios";
import { useHistory } from "react-router-dom";

const MainNavigation = () => {
  const history = useHistory();
  const authCtx = useContext(AuthContext);
  
  const isLoggedIn = authCtx.isLoggedIn;
  const logoutHandler = () => {
    axios
      .delete("http://localhost:3001/logout", { withCredentials: true })
      .then((response) => {
        authCtx.logout();
        history.replace("/");
      })
      .catch((error) => {
        console.log("logout : ", error);
      });
  };

  return (
    <header className={classes.header}>
      <Link to="/">
        <div className={classes.logo}>BLOG POINT</div>
      </Link>
      <nav>
        <ul>
          {!isLoggedIn && (
            <li>
              <Link to="/auth">Login</Link>
            </li>
          )}

          {isLoggedIn && (
            <li>
              <Link to={`/user-articles/${authCtx.userId}`}>Your articles ({authCtx.username})</Link>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <Link to="/articles">All articles</Link>
            </li>
          )}

          {isLoggedIn && (
            <li>
              <Link to="/new-article">Create new article</Link>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <Link to="/profile">change password</Link>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <button onClick={logoutHandler}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
