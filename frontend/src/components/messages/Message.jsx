import { useAuthContext } from "../../context/AuthContext";
import { extractTime } from "../../utils/extractTime.js";
import useConversation from "../../store/useConversation";
const Message = ({ message }) => {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();
  const fromMe = message.senderId === authUser._id;
  const chatClassName = fromMe ? "chat-end" : "chat-start";
  const profilePicture = fromMe ? authUser.profilePicture : selectedConversation?.profilePicture;
  const bubbleBgColor = fromMe ? "bg-blue-500" : "";
  const formattedTime = extractTime(message.createdAt);
  const shakeClass = message.shouldShake ? "shake" : "";

  return (
    <div className={`chat ${chatClassName}`}>
      <div className="chat-image avatar">
        <div className="w-8 sm:w-10 rounded-full">
          <img src={profilePicture} alt="Chat head" />
        </div>
      </div>
      <div className={`chat-bubble text-gray-200 break-words bg-opacity-60 ${bubbleBgColor} ${shakeClass}`}>
        {message.message}
      </div>
      <div className="chat-footer opacity-80 p-1 text-xs text-gray-300 flex gap-1 items-center">
        {formattedTime}
      </div>
    </div>
  );
};

export default Message;
