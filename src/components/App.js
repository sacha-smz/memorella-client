import React from "react";

import { Switch, Route, Link, NavLink } from "react-router-dom";

import DispatchIntended from "../containers/DispatchIntended";
import SignupForm from "../containers/SignupForm";
import SigninForm from "../containers/SigninForm";

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
            {user.data ? (
              <>
                {user.data.is_admin && (
                  <li>
                    <NavLink to="/admin">Admin</NavLink>
                  </li>
                )}
                {auth && (
                  <li>
                    <Link to="/logout" onClick={logout}>
                      Log out
                    </Link>
                  </li>
                )}
              </>
            ) : (
              <>
                <li>
                  <NavLink to="/signup">Sign Up</NavLink>
                </li>
                <li>
                  <NavLink to="/signin">Sign In</NavLink>
                </li>
              </>
            )}
          </ul>
        </nav>
      </header>

      <main>
        <Switch>
          <Route path="/signup" component={SignupForm} />
          <Route path="/signin" component={SigninForm} />
        </Switch>
      </main>
    </>
  );
};

export default App;
