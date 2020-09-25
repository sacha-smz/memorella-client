import React from "react";

import { Switch, Route, Link, NavLink } from "react-router-dom";

import AuthRoute from "../containers/AuthRoute";
import AdminRoute from "../containers/AdminRoute";
import Logout from "../containers/Logout";
import SignupForm from "../containers/SignupForm";
import SigninForm from "../containers/SigninForm";
import NewDeck from "../containers/NewDeck";
import DeckList from "../containers/DeckList";

import "./App.scss";

const App = ({ user, auth }) => (
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
                  <Link to="/logout">Log out</Link>
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

        <AuthRoute path="/logout">
          <Logout />
        </AuthRoute>

        <AdminRoute exact path="/admin">
          <DeckList />
        </AdminRoute>
        <AdminRoute path="/admin/decks/new">
          <NewDeck />
        </AdminRoute>
      </Switch>
    </main>
  </>
);

export default App;
