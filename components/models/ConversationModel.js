import { useContext, useState } from "react";
import { Context } from "../../context/GlobalContext";
import { NOTFOUND } from "../../utils/variables";
import Model from "./Model";

const ConversationModel = ({ closeModel }) => {

  const { contacts, conversations, setConversations } = useContext(Context);

  const [recepients, setRecepients] = useState([]);

  const changeRecepients = e => {
    if (e.target.checked) {
      setRecepients([...recepients, e.target.value])
    } else {
      setRecepients(recepients.filter(recepient => recepient !== e.target.value));
    }
  }

  const createNewConversation = e => {
    e.preventDefault();
    if (conversations === NOTFOUND) {
      setConversations([{ recepients, messages: [] }])
      return closeModel();
    } else {
      setConversations([...conversations, { recepients, messages: [] }]);
      return closeModel();
    }

  }

  return (
    <Model
      closeModel={closeModel}
      className="bg-gray-900"
      title="create conversation"
    >
      <form
        className="px-4 py-3 grid gap-y-2"
        onSubmit={createNewConversation}
      >
        <label>Recepients</label>
        <div className="overflow-y-auto max-h-52">
          {Array.isArray(contacts) ? (
            contacts.map((contact) => (
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
            ))
          ) : (
            <p>No contacts to create conversation</p>
          )}
        </div>
        <button className="bg-blue-600 hover:bg-blue-500 focus:outline-none focus:ring max-w-max p-1 rounded my-1">
          Create
        </button>
      </form>
    </Model>
  );
};

export default ConversationModel;
