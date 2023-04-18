import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AuthApi from "setup/auth/authApi";

function AppRoutes() {
  const authApi = useContext(AuthApi);
  return (
    <Routes>
      {/* this will redirect to login component */}
      <Route
        path="/login"
        element={authApi?.auth ? <Navigate to="/dashboard" /> : <></>}
      />
      {/* this will redirect to singup component */}
      <Route
        path="/signup"
        element={authApi?.auth ? <Navigate to="/dashboard" /> : <></>}
      />
      {/* this will redirect to dashboard component */}
      <Route
        path="/dashboard"
        element={authApi?.auth ? <></> : <Navigate to="/login" />}
      />
      {/* this will redirect to contact component */}
      <Route
        path="/contacts"
        element={authApi?.auth ? <></> : <Navigate to="/login" />}
      >
        {/* this will redirect to contact details component */}
        <Route
          path=":id"
          element={authApi?.auth ? <></> : <Navigate to="/login" />}
        />
      </Route>
      {/* this will redirect to stats component */}
      <Route
        path="/stats"
        element={authApi?.auth ? <></> : <Navigate to="/login" />}
      />
      {/* this will redirect to events component */}
      <Route
        path="/events"
        element={authApi?.auth ? <></> : <Navigate to="/login" />}
      />
    </Routes>
  );
}

export default AppRoutes;
