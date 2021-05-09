import { Switch, Route, Redirect } from "react-router-dom";
import "./App.css";
import BooksApp from "./components/BooksApp";
import SearchPage from "./components/searchPage";

function App() {
  return (
    <>
      <main className="container">
        <Switch>
          <Route exact path="/search" component={SearchPage} />
          <Route exact path="/" component={BooksApp} />
          <Redirect to="/" />
        </Switch>
      </main>
    </>
  );
}

export default App;
