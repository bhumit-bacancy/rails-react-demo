import classes from "./Article.module.css";
import { Link, useHistory } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../store/auth-context";
import axios from "axios";

const UserArticle = (props) => {
  const authCtx = useContext(AuthContext);
  const history = useHistory();
  const [deleted, setDeleted] = useState(false);

  const deleteHandler = () => {
    if(window.confirm('Are you sure to delete this record?')){
    axios
      .delete("http://localhost:3001/articles/" + `${props.id}`, {
        withCredentials: true,
      })
      .then((response) => {
        if (response.data.status === 200) {
          console.log(response.data.staus);
          setDeleted(!deleted);
          history.replace(`/user-articles/${authCtx.userId}`);
        }
      })
      .catch((error) => {
        console.log("error : ", error);
      });
    }
  };


  useEffect(() => {
    props.onShow();
    setDeleted(false);
  }, [deleted]);

  return (
    <center><li className={classes.item}>
      <figure>
        <blockquote>
          <p>{props.article.title}</p>
        </blockquote>
        <figcaption>{props.article.description}</figcaption>
      </figure>
      <Link
        className="btn"
        to={{
          pathname: `/articles/${props.id}/edit`,
          params: { title: props.article.title, desc: props.article.description },
        }}
      >
        Edit
      </Link>
      &nbsp;
      <button onClick={deleteHandler} className="btn btn-red">
        Delete
      </button>
    </li></center>
  );
};

export default  UserArticle;
