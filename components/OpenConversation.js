import { createRef, useContext, useEffect, useState } from "react"
import { Context } from "../context/GlobalContext"
import { useSocket } from "../context/SocketContextProvider";
import { SEND_MESSAGE } from "../utils/variables";
import MessageItem from "./MessageItem";

const OpenConversation = () => {

  const socket = useSocket();

  const { state, id, conversations, contacts } =
    useContext(Context);

  const messageBox = createRef();

  const messageRef = createRef();

  const currentConversation = conversations[state.selectedConversation];

  // scroll messagebox
  useEffect(() => messageBox.current.scrollTop += currentConversation?.messages?.length * 100, [currentConversation?.messages?.length]);
  
  // format conversations
  const formattedConversations = Array.isArray(conversations) && Array.isArray(contacts)
    ? conversations.map((conversation) => {
        const recepients = conversation?.recepients?.map((r) => {
          const contact = contacts.find((contact) => contact.id === r);
          const name = (contact && contact.name) || r;
          return { id: r, name };
        });

      const messages = conversation?.messages?.map(message => {
        let messageSenderName = contacts.find(contact => contact.id === message.sender)?.name || message.sender
        if (message.sender === id) messageSenderName = 'You';
        return { ...message, sender: messageSenderName };
        })
      
        return {...conversation, recepients, messages };
      })
    : [];
  
  // send message 
  const sendMessage = (e) => {
    e.preventDefault();
    if (!messageRef.current.value) return;
    const messageInfo = {
      text: messageRef.current.value,
      sender: id,
      createdAt: Date.now(),
    };

    // send message to socket
    socket.emit(SEND_MESSAGE, {
      recepients: currentConversation.recepients,
      message:messageInfo
    });

    // focus textarea
    messageRef.current.focus();

    // clear text form
    e.target.reset();
  }

    return (
      <div className="flex flex-col overflow-hidden flex-grow">
        <div
          className="flex-grow flex flex-col p-2 overflow-auto"
          ref={messageBox}
        >
          {formattedConversations[state.selectedConversation]?.messages?.map(
            (msg, i) => (
              <MessageItem msg={msg} key={i}/>
            )
          )}
        </div>
        <form className="flex" onSubmit={sendMessage}>
          <textarea
            name="message"
            id="message"
            rows="2"
            className="flex-1 p-2 text-black focus:outline-none focus:ring"
            ref={messageRef}
          ></textarea>
          <button className="bg-blue-600 px-5 md:px-16 md:text-3xl focus:outline-none focus:ring focus:bg-blue-700">
            Send
          </button>
        </form>
      </div>
    );
}

export default OpenConversation