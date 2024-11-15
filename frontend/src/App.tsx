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
import { MyVenues } from "./pages/myVenues";
import { EditVenue } from "./pages/editVenue";
import { Search } from "./pages/Search";

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
                <Search />
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
                    <MyVenues />
                  </Layout>
                }
              />
              <Route
                path="/edit-venue/:venueId"
                element={
                  <Layout>
                    <EditVenue />
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
