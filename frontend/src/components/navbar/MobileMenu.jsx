import React from "react";
import { FaHome, FaUserFriends, FaEnvelope, FaBell, FaUser } from "react-icons/fa";
import NavItem from "./NavItem";
import LogoutButton from "./LogoutButton";
const MobileMenu = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <div>
      <button className="btn btn-ghost btn-circle" onClick={() => setOpen(!open)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d={open ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
          />
        </svg>
      </button>
      {open && (
        <div className="absolute top-14 right-4 shadow-lg rounded-lg w-48 bg-gray-800 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-90 z-50">
          <ul className="menu menu-compact p-2">
            <li>
              <NavItem icon={FaHome} label="Home" path="/" />
            </li>
            <li>
              <NavItem icon={FaUserFriends} label="Friends" path="/friends" />
            </li>
            <li>
              <NavItem icon={FaEnvelope} label="Messages" path="/messages" />
            </li>
            <li>
              <NavItem icon={FaBell} label="Notifications" path="/notifications" />
            </li>
            <li>
              <NavItem icon={FaUser} label="Profile" path="/profile" />
            </li>
            <li>
              <LogoutButton />
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default MobileMenu;
