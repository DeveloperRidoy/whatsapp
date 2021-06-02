import { useContext, useState } from "react";
import { Context } from "../../context/GlobalContext";
import { NOTFOUND } from "../../utils/variables";
import Model from "./Model";
import { v4 as uuidv4 } from 'uuid';
import arraysEqual from "../../utils/arraysEqual";

const ConversationModel = ({ closeModel }) => {

  const { contacts, conversations, setConversations, id } = useContext(Context);

  const [recepients, setRecepients] = useState([]);

  const [error, setError] = useState(null);

  const changeRecepients = e => {
    if (e.target.checked) {
      setRecepients([...recepients, e.target.value])
    } else {
      setRecepients(recepients.filter(recepient => recepient !== e.target.value));
    }
  }

  const createNewConversation = e => {
    e.preventDefault();

    if (recepients.length === 0) return setError('select a contact first');

    if (Array.isArray(conversations)) {
      const duplicateConvesation = conversations.find(c => arraysEqual(c.recepients, [...recepients, id]));
      if (duplicateConvesation) return setError(`conversation with same people already exists`);
    }

    if (conversations === NOTFOUND) {
      setConversations([{id:uuidv4(), recepients: [...recepients, id], messages: [] }])
      return closeModel();
    } else {
      setConversations([
        ...conversations,
        {id:uuidv4(), recepients: [...recepients, id], messages: [] },
      ]);
      return closeModel();
    }


  }

  return (
    <Model
      closeModel={closeModel}
      className="bg-gray-900"
      title="create conversation"
    >
      <form className="px-4 py-3 grid gap-y-2" onSubmit={createNewConversation}>
        {error && <p className="p-1 rounded bg-red-500">{error}</p>}
        {Array.isArray(contacts) && contacts.length > 0 ? (
          <>
            <label>Recepients</label>
            <div className="overflow-y-auto max-h-52">
              {contacts.map((contact) => (
                <div key={contact.id} className="mb-2 flex items-center">
                  <input
                    type="checkbox"
                    name={contact.name}
                    id={contact.id}
                    checked={recepients.includes(contact.id)}
                    value={contact.id}
                    className="mr-1 border-0 h-4 w-4"
                    onChange={changeRecepients}
                  />
                  <label htmlFor={contact.id}>{contact.name}</label>
                </div>
              ))}
            </div>
            <button className="bg-blue-600 hover:bg-blue-500 focus:outline-none focus:ring max-w-max p-1 rounded my-1">
              Create
            </button>
          </>
        ) : (
          <p>no contacts to create conversation</p>
        )}
      </form>
    </Model>
  );
};

export default ConversationModel;
