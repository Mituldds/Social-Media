import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import Login from "./component/Login/Login";
import Signup from "./component/Signup/Signup";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import Home from "./component/pages/Home";
import ForgotPassword from "./component/Login/ForgotPassword";
import ResetPassword from "./component/Login/ResetPassword";
import ProfilePage from "./component/pages/ProfilePage/ProfilePage";
import UserProfilePage from "./component/pages/UserProfilePage/UserProfilePage";
import Social from "./component/pages/Social";
import Chat from "./component/pages/Chat/Chat";
import Notification from "./component/pages/Notification/Notification";
// import Popup from "./component/pages/Popup";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="/" element={<Social />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/notification" element={<Notification />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot_password" element={<ForgotPassword />} />
        <Route path="/reset_password" element={<ResetPassword />} />
        <Route path="/profile_page" element={<ProfilePage />} />
        <Route
          path="/user_profile_page/:userId"
          element={<UserProfilePage />}
        />
        {/* <Route path="/popup" element={<Popup />} /> */}
        {/* <ProfilePage /> */}
      </Routes>

      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
}

export default App;
