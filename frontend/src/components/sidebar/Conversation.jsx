import { useSocketContext } from "../../context/SocketContext";
import useConversation from "../../store/useConversation";
const Conversation = ({ conversation, lastIdx, emoji }) => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const isSelected = selectedConversation?._id === conversation._id;
  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(conversation._id);

  return (
    <>
      <div
        className={`flex gap-3 items-center hover:bg-sky-500 rounded-lg p-2 cursor-pointer bg-opacity-60
        ${isSelected ? "bg-sky-500" : ""}
        `}
        onClick={() => setSelectedConversation(conversation)}
      >
        <div className={`avatar ${isOnline ? "online" : ""}`}>
          <div className="w-8 sm:w-10 rounded-full">
            <img src={conversation.profilePicture} alt={conversation.fullname} />
          </div>
        </div>

        <div className="flex flex-1 items-center justify-between">
          <p className="text-base md:text-lg text-gray-200">{conversation.fullname}</p>
          <span className="text-base sm:text-xl">{emoji}</span>
        </div>
      </div>

      {!lastIdx && <div className="divider my-0 py-0 h-1"></div>}
    </>
  );
};

export default Conversation;
