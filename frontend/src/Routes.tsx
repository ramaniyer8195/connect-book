import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AuthApi from "./utils/authApi";
import LoginPage from "./pages/loginPage/loginPage";
import SignupPage from "./pages/signupPage/signupPage";
import Dashboard from "./pages/dashboard/dashboard";

function AppRoutes() {
  const authApi = useContext(AuthApi);
  return (
    <Routes>
      <Route
        path="/login"
        element={authApi?.auth ? <Navigate to="/dashboard" /> : <LoginPage />}
      />
      <Route
        path="/signup"
        element={authApi?.auth ? <Navigate to="/dashboard" /> : <SignupPage />}
      />
      <Route
        path="/dashboard"
        element={authApi?.auth ? <Dashboard /> : <Navigate to="/login" />}
      />
      {/* <Route
        path="/contacts"
        element={authApi?.auth ? <Contacts /> : <Navigate to="/login" />}
      >
        <Route
          path=":id"
          element={
            authApi?.auth ? <ContactDetails /> : <Navigate to="/login" />
          }
        />
      </Route>
      <Route
        path="/stats"
        element={authApi?.auth ? <StatsPage /> : <Navigate to="/login" />}
      />
      <Route
        path="/events"
        element={authApi?.auth ? <EventsPage /> : <Navigate to="/login" />}
      /> */}
    </Routes>
  );
}

export default AppRoutes;
