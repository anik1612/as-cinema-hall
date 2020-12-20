import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import { createContext } from "react";
import useLocalStorageState from "use-local-storage-state/dist";

export const UserContext = createContext([]);

function App() {
  const [loggedInUser, setLoggedInUser] = useLocalStorageState("loggedInUser", {
    isSignedIn: false,
    name: "",
    email: "",
    image: "",
  });
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
