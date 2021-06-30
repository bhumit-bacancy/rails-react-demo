import { Switch, Route, Redirect } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "./components/store/auth-context";
import AllArticles from "./components/Pages/AllArticles";
import Layout from "./components/Layout/Layout";
import UserProfile from "./components/Profile/UserProfile";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import ArticleDetails from "./components/Pages/ArticleDetails";
import NewArticle from "./components/Pages/NewArticle";
import EditArticle from "./components/Pages/EditArticle";
import UserArticles from "./components/Pages/UserArticles";

function App() {

  const authCtx = useContext(AuthContext);

  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
        {!authCtx.isLoggedIn && (
          <Route path="/auth">
            <AuthPage />
          </Route>
        )}

        {authCtx.isLoggedIn && (
          <Route path="/articles" exact>
            <AllArticles />
          </Route>
        )}

        {authCtx.isLoggedIn && (
          <Route path="/user-articles/:userId" exact>
            <UserArticles />
          </Route>
        )}

        {authCtx.isLoggedIn && (
          <Route path="/articles/:articleId/edit" exact>
            <EditArticle />
          </Route>
        )}

        {authCtx.isLoggedIn && (
          <Route path="/articles/:articleId">
            <ArticleDetails />
          </Route>
        )}
        {authCtx.isLoggedIn && (
          <Route path="/new-article">
            <NewArticle />
          </Route>
        )}

        <Route path="/profile">
          {authCtx.isLoggedIn && <UserProfile />}
          {!authCtx.isLoggedIn && <Redirect to="/auth" />}
        </Route>

        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
