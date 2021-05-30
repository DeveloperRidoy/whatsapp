import { useContext, useEffect, useState } from "react"
import { Context } from "../context/GlobalContext"

const Conversations = () => {

    const {state, setState, contacts, conversations } = useContext(Context);

    const formattedConversations = Array.isArray(conversations)
      ? conversations.map((conversation) => {
          const recepients = conversation.recepients.map((r) => {
            const contact = contacts.find((contact) => contact.id === r);
            const name = (contact && contact.name) || r;
            return { id: r, name };
          });
          return {...conversation, recepients}
        })
      : [];
    
    const [activeConversation, setActiveConversation] = useState(0);

    return (
      <div className="py-2">
        {formattedConversations.map((conversation, i) => (
          <button
            key={i}
            className={`block focus:outline-none px-1 py-3 w-full flex justify-start ${
              activeConversation === i ? "bg-blue-500" : "focus:bg-blue-400"
            }`}
                onClick={() => { setActiveConversation(i); setState({...state, selectedConversation:i})}}
          >
            {conversation.recepients.map(
              (r, i) =>
                `${r.name}${
                  i === conversation.recepients.length - 1 ? "" : ", "
                }`
            )}
          </button>
        ))}
      </div>
    );
}

export default Conversations
