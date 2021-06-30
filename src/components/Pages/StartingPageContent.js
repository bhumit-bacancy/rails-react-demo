import classes from "./StartingPageContent.module.css";
import AuthContext from "../store/auth-context";
import { useContext, useEffect } from "react";
import image from "./image.png";
import { Link } from "react-router-dom";

const StartingPageContent = () => {
  console.log(image);

  const authCtx = useContext(AuthContext);

  return (
    <section className={classes.starting}>
      <center><div className={classes.image}>
        {authCtx.isLoggedIn && (
          <div>
            <h2 style={{color: "white", paddingTop: "200px"}}>Welcome on board, {authCtx.username}</h2>
            <Link to="/articles" className="btn btn-green">View articles</Link>
          </div>
        )}
        {!authCtx.isLoggedIn && (
          <div>
            <h2 style={{color: "white", paddingTop: "200px"}}>Welcome, please login for more</h2>
            <Link to="/auth" className="btn btn-green">Login</Link>
          </div>
        )}
      </div>
      </center>
    </section>
  );
};

export default StartingPageContent;
