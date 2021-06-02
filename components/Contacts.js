import { useContext } from "react"
import { Context } from "../context/GlobalContext"

const Contacts = () => {
    
    const { contacts, setContacts } = useContext(Context);

    const deleteContact = (e, contact) => {
        e.stopPropagation();
        if (!confirm('delete this contact?')) return;
        setContacts(contacts.filter(c => c.id !== contact.id))
    }

    return (
        <div className="overflow-auto p-2">
            {Array.isArray(contacts) && contacts.map(contact => (
                <div key={contact.id} className="p-1 mb-1 border-b border-gray-600 flex justify-between">
                    <p>{contact.name}</p>
                    <button className="px-2" onClick={e => deleteContact(e, contact)}><i aria-hidden className="fas fa-times"></i></button>
                </div>
            ))}
        </div>
    )
}

export default Contacts
