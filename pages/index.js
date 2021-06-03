import Head from 'next/head'
import { useContext, useEffect, useState } from 'react';
import { Context } from '../context/GlobalContext';
import { useRouter } from 'next/router';
import { NOTFOUND, NOTSET } from '../utils/variables';
import OpenConversation from '../components/OpenConversation';
import SocketContextProvider from '../context/SocketContextProvider';
import Sidebar from '../components/Sidebar';
import MobileMenu from '../components/MobileMenu';

export default function Home () {

  const Router = useRouter();
  const { id, conversations} = useContext(Context);

  useEffect(() => id === NOTFOUND && Router.replace('/login'), [id])


  const [showSidebar, setShowSidebar] = useState(!Array.isArray(conversations));

  return (
    <div className="bg-gray-700 text-white">
      <Head>
        <title>Whatsapp clone</title>
        <link rel="icon" href="logo.png" />
      </Head>
      {id !== NOTSET && id !== NOTFOUND && (
        <div className="h-screen flex overflow-hidden">
          <MobileMenu setShowSidebar={setShowSidebar} />
          <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar}/>
          {Array.isArray(conversations) && conversations.length > 0  && (
            <SocketContextProvider id={id} key={conversations}>
              <OpenConversation />
            </SocketContextProvider>
          )}
        </div>
      )}
    </div>
  );
}
