import React from "react";

import { Switch, Route, Link, NavLink } from "react-router-dom";

import DispatchIntended from "../containers/DispatchIntended";
import SignupForm from "../containers/SignupForm";

import "./App.scss";

const App = ({ user, auth, logout }) => {
  return auth && auth.intended ? (
    <DispatchIntended intended={auth.intended} />
  ) : (
    <>
      <header>
        <Link to="/">
          <span className="title">Memorella</span>
        </Link>
        Le memory de Stella
        <nav>
          <ul>
            <li>{!user.data && <NavLink to="/signup">Sign Up</NavLink>}</li>
            <li>
              {user.data && (
                <Link to="/logout" onClick={logout}>
                  Log out
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </header>

      <main>
        <Switch>
          <Route path="/signup" component={SignupForm} />
        </Switch>
      </main>
    </>
  );
};

export default App;
