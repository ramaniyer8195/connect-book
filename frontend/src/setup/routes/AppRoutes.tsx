import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "../auth/auth";
import Login from "../../pages/login";
import Signup from "../../pages/signup";
import Dashboard from "../../pages/dashboard";

function AppRoutes() {
  const authContext = useContext(AuthContext);

  return (
    <Routes>
      <Route
        path="/login"
        element={
          authContext.isAuthenticated ? <Navigate to="/dashboard" /> : <Login />
        }
      />
      <Route
        path="/signup"
        element={
          authContext.isAuthenticated ? (
            <Navigate to="/dashboard" />
          ) : (
            <Signup />
          )
        }
      />
      <Route
        path="/dashboard"
        element={
          authContext.isAuthenticated ? <Dashboard /> : <Navigate to="/login" />
        }
      />
      {/* this will redirect to contact component */}
      <Route
        path="/contacts"
        element={authContext.isAuthenticated ? <></> : <Navigate to="/login" />}
      >
        {/* this will redirect to contact details component */}
        <Route
          path=":id"
          element={
            authContext.isAuthenticated ? <></> : <Navigate to="/login" />
          }
        />
      </Route>
      {/* this will redirect to stats component */}
      <Route
        path="/stats"
        element={authContext.isAuthenticated ? <></> : <Navigate to="/login" />}
      />
      {/* this will redirect to events component */}
      <Route
        path="/events"
        element={authContext.isAuthenticated ? <></> : <Navigate to="/login" />}
      />
      <Route
        path="/"
        element={
          authContext.isAuthenticated ? <Dashboard /> : <Navigate to="/login" />
        }
      />
    </Routes>
  );
}

export default AppRoutes;
