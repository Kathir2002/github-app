import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import ExplorePage from "./pages/ExplorePage";
import LikesPage from "./pages/LikesPage";
import SideBar from "./components/SideBar";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { useAuthContext } from "./context/authContext";

const App = () => {
  const { authUser, loading }: any = useAuthContext();
  let isLoggedIn = false;
  if (authUser?.username) {
    isLoggedIn = true;
  }
  if (loading) return null;

  return (
    <div className="flex text-white">
      <SideBar />
      <div className="max-w-5xl my-5 text-white mx-auto transition-all duration-300 flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/login"
            element={!isLoggedIn ? <LoginPage /> : <Navigate to={"/"} />}
          />
          <Route
            path="/signup"
            element={!isLoggedIn ? <SignUpPage /> : <Navigate to={"/"} />}
          />
          <Route
            path="/explore"
            element={isLoggedIn ? <ExplorePage /> : <Navigate to={"/login"} />}
          />
          <Route
            path="/likes"
            element={isLoggedIn ? <LikesPage /> : <Navigate to={"/login"} />}
          />
        </Routes>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        theme="dark"
      />
    </div>
  );
};

export default App;
