import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import UserArticle from "../Articles/UserArticle";

const UserArticles = () => {
  const [userArticles, setUserArticles] = useState([]);
  const params = useParams();
  const userId = params.userId;

  const showUserArticleHandler = () => {
    axios
      .get("http://localhost:3001/user_articles/" + `${userId}`, {
        withCredentials: true,
      })
      .then((response) => {
        if (response.data.status === "success") {
          setUserArticles(response.data.articles);
        }
      })
      .catch((error) => {
        console.log("error : ", error);
      });
  };

  useEffect(() => {
    showUserArticleHandler();
  }, []);

  return (
    <div>
      {userArticles.map((userarticle) => (
        <UserArticle
          id={userarticle.id}
          key={userarticle.id}
          article={userarticle}
          onShow={showUserArticleHandler}
        />
      ))}
      {userArticles.length === 0 && <p className='centered'>No Article. please add from "create" tab.</p>}
      <br />
      <center><Link to="/articles" className="btn">Back to all articles</Link></center>
    </div>
  );
};

export default UserArticles;
