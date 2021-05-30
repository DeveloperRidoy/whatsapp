import Head from 'next/head'
import { useContext, useEffect, useState } from 'react';
import { Context } from '../context/GlobalContext';
import { useRouter } from 'next/router';
import { NOTFOUND, NOTSET } from '../utils/variables';
import Conversations from '../components/Conversations';
import Contacts from '../components/Contacts';
import ConversationModel from '../components/models/ConversationModel';
import ContactModel from '../components/models/ContactModel';
import { AnimatePresence } from 'framer-motion';
import OpenConversation from '../components/OpenConversation';

export default function Home () {
  const Router = useRouter();
  const { id } = useContext(Context);

  const CONVERSATION = 'CONVERSATION';
  const CONTACT = 'CONTACT';

  useEffect(() => id === NOTFOUND && Router.replace('/login'), [id])

  const [activeMode, setActiveMode] = useState(CONVERSATION);

  const [showModel, setShowModel] = useState(false);


  return (
    <div className="bg-gray-700 text-white">
      <Head>
        <title>Whatsapp clone</title>
        <link rel="icon" href="logo.png" />
      </Head>
      {id !== NOTSET && id !== NOTFOUND && (
        <div className="h-screen flex">
          <div className="flex flex-col h-full w-[250px]">
            <div className="pl-5 mb-[-1px] z-10">
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
            <div className=" h-full bg-gray-800 rounded-t overflow-auto">
              {activeMode === CONVERSATION ? <Conversations /> : <Contacts />}
            </div>
            <div className="bg-gray-800 border-t border-gray-900">
              <p className="capitalize p-2">
                your id: <span className="text-gray-400">{id}</span>
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
          <OpenConversation/>
        </div>
      )}
    </div>
  );
}
