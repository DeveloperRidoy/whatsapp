import { createRef, useContext, useEffect, useRef } from "react"
import { Context } from "../context/GlobalContext"
import MessageItem from "./MessageItem";

const OpenConversation = () => {

  const { state, id, conversations, setConversations, contacts } = useContext(Context);

  const messageBox = useRef();

  const messageRef = createRef();

  const currentConversation = conversations[state.selectedConversation];

  // scroll messagebox
  useEffect(() => messageBox.current.scrollTop += currentConversation.messages.length * 100, [currentConversation.messages.length]);
  

  const formattedConversations = Array.isArray(conversations)
    ? conversations.map((conversation) => {
        const recepients = conversation.recepients.map((r) => {
          const contact = contacts.find((contact) => contact.id === r);
          const name = (contact && contact.name) || r;
          return { id: r, name };
        });

      const messages = conversation.messages.map(message => {
        let messageSenderName = contacts.find(contact => contact.id === message.sender)?.name;
        if (message.sender === id) messageSenderName = 'me';
        return { ...message, sender: messageSenderName };
        })
      
        return { recepients, messages };
      })
    : [];

  
  const sendMessage = (e) => {
    e.preventDefault();
    currentConversation.messages.push({text:messageRef.current.value, sender:id, createdAt:Date.now()})
    conversations[state.selectedConversation] = currentConversation;
    setConversations([...conversations]);

    // focus textarea
    messageRef.current.focus();

    // clear text form
    e.target.reset();
  }

    return (
      <div className="flex flex-col flex-grow h-full overflow-hidden">
        <div
          className="flex flex-col flex-grow overflow-auto  p-2"
          ref={messageBox}
        >
          {formattedConversations[state.selectedConversation].messages.map(
            (msg, i) => <MessageItem msg={msg} key={i}/>
          )}
        </div>
        <form className="flex" onSubmit={sendMessage}>
          <textarea
            name="message"
            id="message"
            rows="2"
            ref={messageRef}
            className="flex-1 p-2 text-black focus:outline-none focus:ring"
            required
          ></textarea>
          <button className="bg-blue-500 px-5 md:px-16 md:text-3xl focus:outline-none focus:ring focus:bg-blue-600">
            Send
          </button>
        </form>
      </div>
    );
}

export default OpenConversation
