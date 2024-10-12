import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import { SignOutButton } from "./SignOutButton";

export const Header = () => {
  const { isLoggedIn } = useAppContext();

  return (
    <div className="bg-blue-800 py-6">
      <div className="container mx-auto flex justify-between">
        <div className="flex flex-col">
          <span className="text-white text-3xl font-bold tracking-tight">
            <Link to="/">BALLDAY</Link>
          </span>
          <span className="text-white text-3xl font-bold tracking-tight">
            <Link to="/">.booking</Link>
          </span>
        </div>
        <span className="flex space-x-2">
          {isLoggedIn ? (
            <>
              <Link
                className="flex items-center text-white px-3 font-bold hover:bg-blue-500 hover:text-gray-300"
                to="/my-bookings"
              >
                My Bookings
              </Link>
              <Link
                className="flex items-center text-white px-3 font-bold hover:bg-blue-500 hover:text-gray-300"
                to="/my-venues"
              >
                My Venues
              </Link>
              <SignOutButton />
            </>
          ) : (
            <Link
              to="/sign-in"
              className="px-3 py-3 font-bold flex items-center text-blue-800 bg-white hover:bg-gray-200"
            >
              sign-in
            </Link>
          )}
        </span>
      </div>
    </div>
  );
};
