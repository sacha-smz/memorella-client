import React from "react";

import { Switch, Route, Link, NavLink } from "react-router-dom";

import SignupForm from "../containers/SignupForm";

import "./App.scss";

const App = ({ user }) => {
  return (
    <>
      <header>
        <Link to="/">
          <span className="title">Memorella</span>
        </Link>
        Le memory de Stella
        <nav>
          <ul>
            <li>{!user.data && <NavLink to="/signup">Sign Up</NavLink>}</li>
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
