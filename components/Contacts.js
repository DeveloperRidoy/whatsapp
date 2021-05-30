import { useContext } from "react"
import { Context } from "../context/GlobalContext"

const Contacts = () => {
    
    const { contacts } = useContext(Context);

    return (
        <div className="overflow-auto p-2">
            {Array.isArray(contacts) && contacts.map(contact => (
                <div key={contact.id} className="p-1 mb-1 border-b border-gray-600">{contact.name}</div>
            ))}
        </div>
    )
}

export default Contacts
