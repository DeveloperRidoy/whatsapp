import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import arraysEqual from "../utils/arraysEqual";
import { NOTFOUND, NOTSET, RECEIVE_MESSAGE } from "../utils/variables";
import { Context } from "./GlobalContext";
import { cloneDeep } from 'lodash';

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

    const addMessageToConversation = (recepients,message) => {
        const targetConversation = conversations.find(conversation => arraysEqual(conversation.recepients, recepients))
        const updatedConversations = conversations.map(c => {
            if (c.id === targetConversation.id) {
                c.messages.push(message);
            }
            return c;
        })
        setConversations(updatedConversations);
        // console.log(conversations)
    };

    useEffect(() => {
        if (!socket || !Array.isArray(conversations)) return;
        socket.on(RECEIVE_MESSAGE, data => addMessageToConversation(data.recepients, data.message));
        return () => socket.off(RECEIVE_MESSAGE);
    }, [socket])
    
    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    )
}

export default SocketContextProvider;