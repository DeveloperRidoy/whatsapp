import { useContext } from "react";
import { Context } from "../context/GlobalContext";

const MobileMenu = ({ setShowSidebar }) => {
    
    const { conversations, state, contacts, id } = useContext(Context);
    
    const currentRecepientsName =
      Array.isArray(conversations) && Array.isArray(contacts)
        ? conversations[state.selectedConversation]?.recepients
            .filter((r) => r !== id)
            .map((r) => {
              const name = contacts.find((c) => c.id === r)?.name || r;
              return name;
            })
        : [];
    return (
      <div className="md:hidden overflow-auto fixed inset-x-0  p-2 bg-blue-500 flex items-center justify-between">
        <button
          className="flex  items-center text-xl"
          onClick={() => setShowSidebar(true)}
        >
          <i className="fas fa-arrow-circle-left mr-1 mt-1" aria-hidden></i>
          <div>menu</div>
        </button>
        <p className="pr-4">{currentRecepientsName?.map((r, i) => i === currentRecepientsName.length - 1 ? r: `${r}, `)}</p>
      </div>
    );
}

export default MobileMenu
