import "./App.css";
import { Toaster } from "react-hot-toast";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAuthContext } from "./context/AuthContext";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import Messages from "./pages/Messages";
import Profile from "./pages/Profile";
import Notifications from "./pages/Notifications";
import Friends from "./pages/Friends";
import Navbar from "./components/navbar/Navbar";

function App() {
  const { authUser } = useAuthContext();
  return (
    <div className="flex flex-col w-full lg:w-[80%] mx-auto h-screen sm:p-4">
      {authUser && <Navbar />}
      <Routes>
        <Route path="/" element={authUser ? <Home /> : <Navigate to="/login" />} />
        <Route path="/messages" element={authUser ? <Messages /> : <Navigate to="/login" />} />
        <Route path="/friends" element={authUser ? <Friends /> : <Navigate to="/login" />} />
        <Route path="/profile" element={authUser ? <Profile /> : <Navigate to="/login" />} />
        <Route
          path="/notifications"
          element={authUser ? <Notifications /> : <Navigate to="/login" />}
        />
        <Route path="/login" element={authUser ? <Navigate to="/" /> : <Login />} />
        <Route path="/signup" element={authUser ? <Navigate to="/" /> : <SignUp />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
