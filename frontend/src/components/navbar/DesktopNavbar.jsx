import { FaHome, FaUserFriends, FaEnvelope, FaBell } from "react-icons/fa";
import NavItem from "./NavItem";
import { useAuthContext } from "../../context/AuthContext";

const DesktopNavbar = () => {
  const { authUser } = useAuthContext();
  return (
    <div className="hidden lg:flex items-center justify-between px-8 py-2">
      <h1 className="text-xl font-bold">SocialMedia</h1>
      <div className="flex items-center gap-6">
        <NavItem icon={FaHome} label="Home" path="/" />
        <NavItem icon={FaUserFriends} label="Friends" path="/friends" />
        <NavItem icon={FaEnvelope} label="Messages" path="/messages" />
        <NavItem icon={FaBell} label="Notifications" path="/notifications" />
      </div>
      <a href="/profile" className="flex items-center avatar cursor-pointer">
        <span>{authUser.fullname}</span>
        <div className="w-7 rounded-full ml-4 bg-black">
          <img src={authUser.profilePicture} alt="Profile" />
        </div>
      </a>
    </div>
  );
};

export default DesktopNavbar;
