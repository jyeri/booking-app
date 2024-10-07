import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Layout } from "./layouts/Layout";
import { Register } from "./pages/register";
import { SignIn } from "./pages/signIn";
import { AddVenue } from "./pages/addVenue";
import { useAppContext } from "./contexts/AppContext";

const App: React.FC = () => {
  const isLoggedIn = useAppContext();
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route
            path="/"
            element={
              <Layout>
                <p>HOME PAGE</p>
              </Layout>
            }
          />
          <Route
            path="/search"
            element={
              <Layout>
                <p>SEARCH PAGE</p>
              </Layout>
            }
          />
          <Route
            path="/register"
            element={
              <Layout>
                <Register />
              </Layout>
            }
          />
          <Route
            path="/sign-in"
            element={
              <Layout>
                <SignIn />
              </Layout>
            }
          />
          {isLoggedIn && (
            <>
              <Route
                path="/add-venue"
                element={
                  <Layout>
                    <AddVenue />
                  </Layout>
                }
              />
              <Route
                path="/my-venues"
                element={
                  <Layout>
                    <p>MY VENUES PAGE</p>
                  </Layout>
                }
              />
            </>
          )}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
