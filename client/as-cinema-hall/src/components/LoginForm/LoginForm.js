import React, { useContext } from "react";
import cinemaHall from "../../images/logo/brand-logo.png";
import firebase from "firebase/app";
import "firebase/auth";
import { firebaseConfig } from "../../pages/Login/firebase.config";
import { UserContext } from "../../App";

const LoginForm = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);

  const handleLogin = () => {
    // Initialize Firebase
    if (firebase.apps.length === 0) {
      firebase.initializeApp(firebaseConfig);
    }
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        const { displayName, email, photoURL } = result.user;
        setLoggedInUser({
          isSignedIn: true,
          name: displayName,
          email: email,
          image: photoURL,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="container movie-list-container mt-5 mb-5">
      <div className="row">
        <div className="card col-md-4 offset-md-4 col-sm-6 offset-sm-3 col-8 offset-2">
          <div className="card-body py-5">
            <img
              src={cinemaHall}
              className="img-fluid mb-5"
              alt="cinema-hall-icon"
            />
            <button
              className="btn btn-outline-dark btn-block"
              onClick={handleLogin}
            >
              Login With Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
