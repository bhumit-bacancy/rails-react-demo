import React, {useEffect} from 'react'
import ArticleForm from '../Articles/ArticleForm';
import { useHistory } from 'react-router-dom';
import { useContext } from "react";
import AuthContext from "../store/auth-context";
import axios from 'axios';

const NewArticle = () => {
  const history = useHistory();
  const authCtx = useContext(AuthContext);
  const id = authCtx.userId;
  const AddArticleHandler = (title, desc) => {
    axios
    .post(
      "http://localhost:3001/articles",
      {
        article: {
          title: title,
          description: desc,
          user_id: id
        },
      },
      { withCredentials: true }
    )
    .then((response) => {
      console.log(response)
      history.push('/articles')
    })
    .catch((error) => {
      console.log(" login Error : ", error);
    });
  }

  useEffect(() => {
    // if (status === 'success') {
    //   history.push('/quotes')
    // }
    
  }, [])

  return (
    <ArticleForm onAddArticle={AddArticleHandler}/>
  )
}

export default NewArticle
