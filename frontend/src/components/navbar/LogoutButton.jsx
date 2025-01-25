import useLogout from "../../hooks/useLogout";
import { FaPowerOff } from "react-icons/fa";

const LogoutButton = () => {
  const { loading, logout } = useLogout();

  return (
    <div className="flex items-center gap-2 text-lg hover:text-primary">
      {!loading ? (
        <span className="flex items-center cursor-pointer" onClick={logout}>
          <FaPowerOff className="mr-2" />
          <span>Logout</span>
        </span>
      ) : (
        <span className="loading loading-spinner"></span>
      )}
    </div>
  );
};

export default LogoutButton;
