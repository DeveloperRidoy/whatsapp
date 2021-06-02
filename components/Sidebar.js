import Conversations from "../components/Conversations";
import Contacts from "../components/Contacts";
import ConversationModel from "../components/models/ConversationModel";
import ContactModel from "../components/models/ContactModel";
import { AnimatePresence } from "framer-motion";
import { useContext, useState } from "react";
import { Context } from "../context/GlobalContext";

const Sidebar = ({ showSidebar, setShowSidebar }) => {

    const CONVERSATION = "CONVERSATION";
    const CONTACT = "CONTACT";
    const { id } = useContext(Context);
    const [activeMode, setActiveMode] = useState(CONVERSATION);
    const [showModel, setShowModel] = useState(false);

  return (
    <div
      className={`absolute md:static md:w-[250px] inset-0 transform md:transform-none transition flex flex-col h-full bg-gray-700 ${
        showSidebar ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex justify-between items-center pl-5 mb-[-1px] z-10">
        <div className="">
          <button
            className={`p-2 pt-3 focus:outline-none transition ${
              activeMode === CONVERSATION ? " bg-gray-800" : ""
            } rounded-t`}
            onClick={() => setActiveMode(CONVERSATION)}
          >
            Conversations
          </button>
          <button
            className={`p-2 pt-3 focus:outline-none transition ${
              activeMode === CONTACT ? " bg-gray-800" : ""
            } rounded-t`}
            onClick={() => setActiveMode(CONTACT)}
          >
            Contacts
          </button>
        </div>
        <button
          className="px-2 mr-2 text-xl md:hidden"
          onClick={() => setShowSidebar(false)}
        >
          <i className="fas fa-arrow-circle-right" aria-hidden></i>
        </button>
      </div>
      <div className=" h-full bg-gray-800 rounded-t overflow-auto">
        {activeMode === CONVERSATION ? (
          <Conversations hideSidebar={() => setShowSidebar(false)} />
        ) : (
          <Contacts />
        )}
      </div>
      <div className="bg-gray-800 border-t border-gray-900">
        <p className="p-2">
          <span className="capitalize">your id:</span>{" "}
          <span className="text-gray-400">{id}</span>
        </p>
        <button
          className="p-2 bg-blue-600 w-full capitalize focus:outline-none focus:ring hover:bg-blue-700 transition"
          onClick={() => setShowModel(true)}
        >
          new {activeMode === CONVERSATION ? "conversation" : "contact"}
        </button>
      </div>
      <AnimatePresence>
        {showModel && activeMode === CONVERSATION ? (
          <ConversationModel closeModel={() => setShowModel(false)} />
        ) : (
          showModel &&
          activeMode === CONTACT && (
            <ContactModel closeModel={() => setShowModel(false)} />
          )
        )}
      </AnimatePresence>
    </div>
  );
};

export default Sidebar;
