import LogoutButton from "../components/navbar/LogoutButton";

const Profile = () => {
  return (
    <div className="flex-1 w-full sm:rounded-lg p-4 overflow-hidden text-gray-300 bg-gray-800 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-40">
      Profile
      <div className="absolute bottom-4">
        <LogoutButton />
      </div>
    </div>
  );
};

export default Profile;
