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