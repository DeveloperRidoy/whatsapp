import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import useLocalStorage from "../hooks/useLocalStorage";
import arraysEqual from "../utils/arraysEqual";
import { RECEIVE_MESSAGE } from "../utils/variables";
import { Context } from "./GlobalContext";

const SocketContext = createContext();
export const useSocket = () => useContext(SocketContext);

const SocketContextProvider = ({ id, children }) => {

    const { conversations, setConversations } = useContext(Context);

    const [socket, setSocket] = useState(null);

    useEffect(() => {
      if (!id || id === null) return;
      // create new socket connection on the current webpage url
      const newSocket = io(window.location.origin, { query: { id } });
      setSocket(newSocket);

      // close socket connection on leave
      return () => newSocket.close();

      // ************ for testing purposes only ***************//
      // socket connection on custom namespace;
    //   const userSocket = io(window.location.origin + "/user", {
    //     auth: { token: "my-token" },
    //   });

    //   userSocket.on("connect_error", (err) => console.log(err.message));
    //   let ping = 0;
    //   setInterval(() => {
    //     userSocket.volatile.emit("ping", ping++); // use volatile to drop unsent data on disconnect; otherwise socket will send all the unsent data on reconnect;
    //   }, 1000);
    //   document.addEventListener("keydown", (e) => {
    //     if (e.key === "c") userSocket.connect();
    //     if (e.key === "d") userSocket.disconnect();
    //   });
    }, [id])

    // receive message
    useEffect(() => {
        if (!socket || !Array.isArray(conversations)) return;
        socket.on(RECEIVE_MESSAGE, data => {
            const updatedConvesations = conversations.map(c => {
                if (arraysEqual(c.recepients, data.recepients)) c.messages.push(data.message);
                return c;
            })
            setConversations(updatedConvesations);
        });
        return () => socket.off(RECEIVE_MESSAGE);
    }, [socket])
    
    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    )
}

export default SocketContextProvider;