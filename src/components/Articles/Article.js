import classes from "./Article.module.css";
import { Link, useHistory } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../store/auth-context";
import axios from "axios";
import moment from "moment";
// import Modal from "../UI/Modal";
import ArticleDetail from "./ArticleDetail";

const Article = (props) => {
  const le = props.description.length
  const authCtx = useContext(AuthContext);
  const history = useHistory();
  const [getUsername, setGetUsername] = useState("");
  const [deleted, setDeleted] = useState(false);
  const [open, setOpen] = useState(false);

  const deleteHandler = () => {
    if (window.confirm("Are you sure to delete this record?")) {
      axios
        .delete("http://localhost:3001/articles/" + `${props.id}`, {
          withCredentials: true,
        })
        .then((response) => {
          if (response.data.status === 200) {
            console.log(response.data.staus);
            setDeleted(!deleted);
            history.replace("/articles");
          }
        })
        .catch((error) => {
          console.log("error : ", error);
        });
    }
  };

  const openHandler = () => {
    setOpen(true);
  };

  const closeHandler = () => {
    setOpen(false);
  };

  const getUserHandler = (id) => {
    axios
      .get("http://localhost:3001/users/" + `${id}`, { withCredentials: true })
      .then((response) => {
        setGetUsername(response.data.user.username);
      })
      .catch((error) => {
        console.log("logout : ", error);
      });
  };

  useEffect(() => {
    props.onShow();
    setDeleted(false);
  }, [deleted]);

  useEffect(() => {
    getUserHandler(props.user_id);
  }, []);

  return (
    <center>
      {open && (
        <ArticleDetail
          onConfirm={closeHandler}
          title={props.title}
          description={props.description}
          user={getUsername}
        />
      )}

      <li className={classes.item}>
        <figure>
          <div>
            created by <b>{getUsername}</b>,{" "}
            {moment(props.created_at).fromNow()}
          </div>
          <hr className={classes.line} />
          <blockquote>
            <p>{props.title}</p>
          </blockquote>
          {le > 40 && <figcaption>{(props.description).slice(0,40)} ....</figcaption>}
          {le < 40 && <figcaption>{props.description}</figcaption>}

        </figure>
        <Link className="btn" onClick={openHandler}>
          View
        </Link>{" "}
        &nbsp;
        {+authCtx.userId === props.user_id && (
          <Link
            className="btn"
            to={{
              pathname: `/articles/${props.id}/edit`,
              params: { title: props.title, desc: props.description },
            }}
          >
            Edit
          </Link>
        )}{" "}
        &nbsp;
        {+authCtx.userId === props.user_id && (
          <button onClick={deleteHandler} className="btn btn-red">
            Delete
          </button>
        )}
      </li>
    </center>
  );
};

export default Article;
