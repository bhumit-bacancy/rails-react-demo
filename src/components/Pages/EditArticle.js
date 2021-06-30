import React from 'react'
import { useParams, useLocation, useHistory } from 'react-router-dom';
import { useContext } from "react";
import AuthContext from "../store/auth-context";
import axios from 'axios';
import EditArticleForm from "../Articles/EditArticleForm";

const EditArticle = (props) => {
  const {params} = useLocation()
  const param = useParams();
  const articleId = param.articleId

  const history = useHistory();
  const authCtx = useContext(AuthContext);
  const id = authCtx.userId;

  const editArticleHandler = (title, desc) => {
    axios
    .put("http://localhost:3001/articles/"+`${articleId}`,{
        article: {
          title: title,
          description: desc,
        }
      }, { withCredentials: true })
    .then((response) => {
      if (response.data.status === "success") {
        // console.log(response.data)
        // setCompleteEdit(!completeEdit);
        // setEdit(!edit)
        history.replace("/articles")
      }
    })
    .catch((error) => {
      console.log("error : ", error);
    });
  }
  
  return (
    <EditArticleForm title={params.title} desc={params.desc} onEditArticle={editArticleHandler} />
  )
}

export default EditArticle
