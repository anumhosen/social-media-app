import Messages from "./Messages.jsx";
import MessageInput from "./MessageInput.jsx";
import { TiMessages } from "react-icons/ti";
import useConversation from "../../store/useConversation.js";
import { useEffect } from "react";
import { useAuthContext } from "../../context/AuthContext.jsx";
import { FaArrowLeft } from "react-icons/fa";
function MessageContainer() {
  const { selectedConversation, setSelectedConversation } = useConversation();

  useEffect(() => {
    return () => setSelectedConversation(null); // Reset selected conversation when switching conversations
  }, [setSelectedConversation]);

  return (
    <div className={`w-full sm:w-2/3 ${selectedConversation ? "flex" : "hidden"} sm:flex flex-col`}>
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          {/* Header */}

          <div className="flex items-center px-4 py-2 mb-2">
            <button
              onClick={() => setSelectedConversation(null)}
              className="sm:hidden font-bold text-gray-200 mr-4"
            >
              <FaArrowLeft />
            </button>
            <div className="w-8 sm:w-10 rounded-full mr-2">
              <img src={selectedConversation.profilePicture} alt={selectedConversation.fullname} />
            </div>
            <span className="font-bold text-gray-200">{selectedConversation.fullname}</span>
          </div>

          <Messages />
          <MessageInput />
        </>
      )}
    </div>
  );
}

export default MessageContainer;

const NoChatSelected = () => {
  const { authUser } = useAuthContext();
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2">
        <p>Welcome, {authUser.fullname}</p>
        <p>Select a chat to start messaging</p>
        <TiMessages className="text-3xl md:text-6xl text-center" />
      </div>
    </div>
  );
};
