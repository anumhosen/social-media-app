import Sidebar from "../components/sidebar/Sidebar";
import MessageContainer from "../components/messages/MessageContainer";

const Messages = () => {
  return (
    <div className="flex-1 flex w-full sm:rounded-lg overflow-hidden bg-gray-800 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-40">
      <Sidebar />
      <MessageContainer />
    </div>
  );
};

export default Messages;
