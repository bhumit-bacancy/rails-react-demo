import React, {useEffect, useState} from 'react'
import { useParams } from "react-router-dom";
import axios from 'axios';
import ArticleDetail from '../Articles/ArticleDetail';

const ArticleDetails = () => {
  const params = useParams();
  const [article, setArticle] = useState();

  const showArticleHandler = () => {
    axios
      .get("http://localhost:3001/articles/"+`${params.articleId}`, { withCredentials: true })
      .then((response) => {
        if (response.data.status === "success") {
          setArticle(response.data.article)
        }
      })
      .catch((error) => {
        console.log("error : ", error);
      });
  };
  useEffect(() => {
    showArticleHandler();
  },[])
  
  return (
    <div>
      <p>Here i am!</p>
      <ArticleDetail article={article} />
    </div>
  )
}

export default ArticleDetails
