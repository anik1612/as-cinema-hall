import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import { createContext } from "react";
import useLocalStorageState from "use-local-storage-state/dist";
import Bookings from "./pages/Bookings/Bookings";

export const UserContext = createContext([]);
export const SelectedMovieContext = createContext([]);

function App() {
  const [loggedInUser, setLoggedInUser] = useLocalStorageState("loggedInUser", {
    isSignedIn: false,
    name: "",
    email: "",
    image: "",
  });
  const [selectedMovie, setSelectedMovie] = useLocalStorageState('selectedMovie', {})
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <SelectedMovieContext.Provider value={[selectedMovie, setSelectedMovie]}>
        <Router>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/bookings">
              <Bookings />
            </Route>
          </Switch>
        </Router>
      </SelectedMovieContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
