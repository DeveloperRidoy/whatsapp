import { useContext, useEffect, useState } from "react"
import { Context } from "../context/GlobalContext"

const Conversations = ({hideSidebar}) => {

    const {state, setState, contacts, conversations, setConversations, id } = useContext(Context);

    const formattedConversations = Array.isArray(conversations) && Array.isArray(contacts)
      ? conversations.map((conversation) => {
          let recepients = conversation?.recepients?.map((r) => {
            const name = contacts.find((contact) => contact.id === r)?.name || r;
            return { id: r, name };
          });
        recepients = recepients?.filter(r => r.id !== id);
          return {...conversation, recepients}
        })
      : [];
    const [activeConversation, setActiveConversation] = useState(0);

  const deleteConversation = (e, conversation) => {
    e.stopPropagation();
    if (!confirm('delete this conversation?')) return;
    setConversations(conversations.filter(c => c.id !== conversation.id));
    }
  
    return (
      <div className="py-2">
        {formattedConversations?.map((conversation, i) => (
          <div
            key={i}
            tabIndex={0}
            className={`block focus:outline-none px-1 py-3 w-full flex justify-between cursor-pointer ${
              activeConversation === i ? "bg-blue-500" : "focus:bg-blue-400"
            }`}
            onClick={() => {
              setActiveConversation(i);
              setState({ ...state, selectedConversation: i });
              hideSidebar();
            }}
          >
            <div>
              {conversation?.recepients?.map(
                (r, i) =>
                  `${r.name}${
                    i === conversation.recepients.length - 1 ? "" : ", "
                  }`
              )}
            </div>
            <button
              className="px-2"
              onClick={e => deleteConversation(e, conversation)}
            >
              <i aria-hidden className="fas fa-times"></i>
            </button>
          </div>
        ))}
      </div>
    );
}

export default Conversations
