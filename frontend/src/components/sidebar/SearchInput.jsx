import { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import useConversation from "../../store/useConversation";
import useGetConversations from "../../hooks/useGetConversations";
import toast from "react-hot-toast";

function SearchInput() {
  const [search, setSearch] = useState("");
  const { setSelectedConversation } = useConversation();
  const { conversations } = useGetConversations();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) return;
    if (search.length < 3) {
      return toast.error("Search must be at least 3 characters");
    }
    const conversation = conversations.find((c) =>
      c.fullname.toLowerCase().includes(search.toLowerCase())
    );
    console.log(conversation);
    if (conversation) {
      setSelectedConversation(conversation);
      setSearch("");
    } else toast.error("No such conversation found");
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center">
      <input
        type="text"
        placeholder="Search..."
        className="py-2 px-4 rounded-none rounded-l-full w-full focus:outline-none bg-gray-800 bg-opacity-60 text-gray-300"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button
        type="submit"
        className="py-2 px-1 rounded-none rounded-r-full bg-sky-500 text-white bg-opacity-80"
      >
        <IoSearchSharp className="w-8 h-6 outline-none p-1" />
      </button>
    </form>
  );
}

export default SearchInput;
