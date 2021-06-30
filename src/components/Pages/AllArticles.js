import React, { useEffect, useState } from "react";
import axios from "axios";
import Articles from "../Articles/Articles";

const AllArticles = () => {
  const [isArticle, setIsArticle] = useState(false);
  const [articles, setArticles] = useState([]);
  
  const showArticleHandler = () => {
    axios
      .get("http://localhost:3001/articles", { withCredentials: true })
      .then((response) => {
        if (response.data.status === "success") {
          setArticles(response.data.articles);
          if (response.data.articles) {
            setIsArticle(true);
          }
        }
      })
      .catch((error) => {
        console.log("error : ", error);
      });
  };

  useEffect(() => {
    showArticleHandler();
  }, []);

  return (
    <div>   
      <Articles articles={articles} onShow={showArticleHandler} />
      {articles.length === 0 && <p className='centered'>No Article. please add from "create" tab.</p>}
    </div>
  );
};

export default AllArticles;
