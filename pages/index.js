import Head from 'next/head'
import { useContext, useEffect, useState } from 'react';
import { Context } from '../context/GlobalContext';
import { useRouter } from 'next/router';
import { NOTFOUND, NOTSET } from '../utils/variables';
import OpenConversation from '../components/OpenConversation';
import SocketContextProvider from '../context/SocketContextProvider';
import Sidebar from '../components/Sidebar';

export default function Home () {

  const Router = useRouter();
  const { id, conversations} = useContext(Context);

  useEffect(() => id === NOTFOUND && Router.replace('/login'), [id])


  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div className="bg-gray-700 text-white">
      <Head>
        <title>Whatsapp clone</title>
        <link rel="icon" href="logo.png" />
      </Head>
      {id !== NOTSET && id !== NOTFOUND && (
        <div className="h-screen flex overflow-hidden">
          <div className="md:hidden fixed inset-x-0  p-2 bg-blue-500 flex items-center">
            <button
              className="flex  items-center text-xl"
              onClick={() => setShowSidebar(true)}
            >
              <i className="fas fa-arrow-circle-left mr-1 mt-1" aria-hidden></i>
              <div>menu</div>
            </button>
          </div>
          <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar}/>
          {Array.isArray(conversations) && (
            <SocketContextProvider id={id}>
              <OpenConversation />
            </SocketContextProvider>
          )}
        </div>
      )}
    </div>
  );
}
