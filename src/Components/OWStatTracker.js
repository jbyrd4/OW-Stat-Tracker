import React from "react";
import { Route, Redirect } from "react-router-dom";
import { ApplicationViews } from "./ApplicationViews";
import { NavBar } from "./Nav/NavBar";
import { Login } from "./Auth/Login";
import { Register } from "./Auth/Register";

export const OWStatTracker = () => (
  <>
    <Route
      render={() => {
        if (localStorage.getItem("ow_account")) {
          return (
            <>
              <h1>Overwatch Stat Tracker</h1>
              <NavBar />
              <ApplicationViews />
            </>
          );
        } else {
          return <Redirect to="/login" />;
        }
      }}
    />

    <Route path="/login">
      <Login />
    </Route>
    <Route path="/register">
      <Register />
    </Route>
  </>
);
