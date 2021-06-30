import React from 'react'
import classes from './Articles.module.css';
import Article from './Article';

const Articles = (props) => {
  return (
    <ul className={classes.list}>
        {props.articles.map((article) => (
          <Article
            key={article.id}
            id={article.id}
            created_at={article.created_at}
            user_id={article.user_id}
            title={article.title}
            description={article.description}
            onShow={props.onShow}
          />
        ))}
      </ul>
  )
}

export default Articles
