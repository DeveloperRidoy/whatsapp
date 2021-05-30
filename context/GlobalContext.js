import { createContext, useState } from "react"
import useLocalStorage from "../hooks/useLocalStorage";
import { NOTFOUND, NOTSET } from "../utils/variables";

export const Context = createContext();

function GlobalContext ({ children }) {

    const [id, setId] = useLocalStorage('userId')

    const [contacts, setContacts] = useLocalStorage("contacts");

    const [conversations, setConversations] = useLocalStorage("conversations")
    
    const [state, setState] = useState({
        selectedConversation: 0
    })

    return (
        <Context.Provider
            value={{ state, setState, id, setId, contacts, setContacts, conversations, setConversations }}
        >
            {children}
        </Context.Provider>
    )
}

export default GlobalContext
