import { Fragment, useRef, useState } from "react";
import { Prompt } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../store/auth-context";

import Card from "../UI/Card";
import classes from "./ArticleForm.module.css";

const ArticleForm = (props) => {
  const authCtx = useContext(AuthContext);
  const [isEntering, setIsEntering] = useState(false);

  const titleInputRef = useRef();
  const descInputRef = useRef();

  function submitFormHandler(event) {
    event.preventDefault();

    const enteredTitle = titleInputRef.current.value;
    const enteredDesc = descInputRef.current.value;

    props.onAddArticle(enteredTitle, enteredDesc);
  }

  const finishEnteringHandler = () => {
    //for preventing redirection on click on "Add quote"
    setIsEntering(false)
  }

  const formFocusHandler = () => {
    setIsEntering(true);
  };

  return (
    <Fragment>
      <Prompt when={isEntering} message={(location) => 'Are you sure want to leave? All your data will ne lost!' } />
      <Card>
        <form
          onFocus={formFocusHandler}
          className={classes.form}
          onSubmit={submitFormHandler}
        >
          <div className={classes.control}>
            <label htmlFor="title">title</label>
            <input type="text" id="title" ref={titleInputRef} />
          </div>
          <div className={classes.control}>
            <label htmlFor="text">Description</label>
            <textarea id="text" rows="5" ref={descInputRef}></textarea>
          </div>
          <div className={classes.actions}>
            <button onClick={finishEnteringHandler} className="btn">Add Article</button>
          </div>
        </form>
      </Card>
    </Fragment>
  );
};

export default ArticleForm;
