import { useState } from "react";

const ChatApp = () => {
  const [isMessageVisible, setIsMessageVisible] = useState(false);
  const [selectedConversation, setSelectedConversation] = useState(null);

  const toggleMessages = () => {
    setIsMessageVisible((prev) => !prev);
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen">
      {/* Conversions Section (Left) */}
      <div
        className={`${
          isMessageVisible ? "hidden" : "block"
        } lg:block lg:w-1/3 bg-gray-100 p-4`} // Hides on small screens when messages are visible
      >
        <h2 className="text-lg font-bold">Conversions</h2>
        {/* Sample conversation list */}
        <ul>
          <li
            className="cursor-pointer"
            onClick={() => setSelectedConversation("Conversation 1")}
          >
            Conversation 1
          </li>
          <li
            className="cursor-pointer"
            onClick={() => setSelectedConversation("Conversation 2")}
          >
            Conversation 2
          </li>
          <li
            className="cursor-pointer"
            onClick={() => setSelectedConversation("Conversation 3")}
          >
            Conversation 3
          </li>
        </ul>
      </div>

      {/* Messages Section (Right) */}
      <div
        className={`${
          isMessageVisible || selectedConversation ? "block" : "hidden"
        } lg:block lg:w-2/3 bg-gray-200 p-4`} // Shows if messages are toggled or a conversation is selected
      >
        {selectedConversation ? (
          <div>
            <h2 className="text-lg font-bold">Messages - {selectedConversation}</h2>
            <div>
              {/* Message content would go here */}
              <p>Messages for {selectedConversation}...</p>
            </div>
          </div>
        ) : (
          <p>Select a conversation to view messages.</p>
        )}
      </div>

      {/* Toggle Button for small screens */}
      <button
        onClick={toggleMessages}
        className="lg:hidden absolute top-4 right-4 bg-blue-500 text-white p-2 rounded"
      >
        {isMessageVisible ? "Show Conversions" : "Show Messages"}
      </button>
    </div>
  );
};

export default ChatApp;
