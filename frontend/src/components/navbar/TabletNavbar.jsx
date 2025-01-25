import { useAuthContext } from "../../context/AuthContext";
import NavIcon from "./NavIcon";
import { FaHome, FaUserFriends, FaEnvelope, FaBell } from "react-icons/fa";

const TabletNavbar = () => {
  const { authUser } = useAuthContext();
  return (
    <div className="hidden sm:flex lg:hidden items-center justify-between px-6 py-2">
      <h1 className="text-lg font-bold">SocialMedia</h1>
      <div className="flex items-center gap-6">
        <NavIcon icon={FaHome} path="/" />
        <NavIcon icon={FaUserFriends} path="/friends" />
        <NavIcon icon={FaEnvelope} path="messages" />
        <NavIcon icon={FaBell} path="/notifications" />
      </div>
      <a className="flex items-center avatar cursor-pointer" href="/profile">
        <span>{authUser.fullname}</span>
        <div className="w-7 rounded-full ml-4 bg-black">
          <img src={authUser.profilePicture} alt="Profile" />
        </div>
      </a>
    </div>
  );
};

export default TabletNavbar;
