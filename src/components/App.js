import React, { useEffect, useCallback } from "react";
import { Switch, Route, Link, NavLink, useHistory } from "react-router-dom";

import HistoryNav from "./HistoryNav";
import AuthRoute from "../containers/AuthRoute";
import AdminRoute from "../containers/AdminRoute";
import Logout from "../containers/Logout";
import SignupForm from "../containers/SignupForm";
import SigninForm from "../containers/SigninForm";
import NewDeck from "../containers/NewDeck";
import DeckList from "../containers/DeckList";

import "./App.scss";

const App = ({ user, auth, locations, locationChange }) => {
  const history = useHistory();

  const handleLocationChage = useCallback(
    ({ key: current }, action) => {
      const newLocations = { ...locations, current };
      if (action === "PUSH" || (action === "REPLACE" && locations.current === locations.last)) {
        newLocations.last = current;
      }
      locationChange(newLocations);
    },
    [locations, locationChange]
  );

  useEffect(() => {
    if (!locations.first) {
      const { key } = history.location;
      locationChange({ first: key, last: key, current: key });
    }
  }, [history.location, locations.first, locationChange]);

  useEffect(() => {
    const unlisten = history.listen(handleLocationChage);

    return () => {
      unlisten();
    };
  }, [history, handleLocationChage]);

  return (
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

      <HistoryNav locations={locations} />

      <main className="main-container">
        <Switch>
          <Route exact path="/">
            <p>Accueil</p>
          </Route>
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
          <AdminRoute path="/admin/decks/:id">
            <NewDeck />
          </AdminRoute>

          <Route>
            <p>404</p>
          </Route>
        </Switch>
      </main>
    </>
  );
};

export default App;
