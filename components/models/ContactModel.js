import { createRef, useContext, useState } from "react";
import { Context } from "../../context/GlobalContext";
import { NOTFOUND } from "../../utils/variables";
import Model from "./Model";

const ContactModel = ({ closeModel }) => {
  
  const idRef = createRef();
  const nameRef = createRef();
 
  const {contacts, setContacts, id } = useContext(Context);
  const [error, setError] = useState(null);

  const createNewContact = (e) => {
    e.preventDefault();
    if (Array.isArray(contacts)) {
      const duplicateName = contacts.find(c => c.name === nameRef.current.value);
      if (duplicateName) return setError('contact with same name already exists');

      const duplicateId = contacts.find(c => c.id === idRef.current.value);
      if (duplicateId) return setError(`the id you entered is the same as contact ${duplicateId.name}`);

      const ownId = idRef.current.value === id;
      if (ownId) return setError(`the id you entered is the same as your id`);

    }
    if (contacts === NOTFOUND) {
      setContacts([{ id: idRef.current.value, name: nameRef.current.value }]);
      return closeModel();
    } else {
       setContacts((prevContacts) => [
         ...prevContacts,
         { id: idRef.current.value, name: nameRef.current.value },
       ]);
      return closeModel();
    }
  };

  return (
    <Model
      closeModel={closeModel}
      className="bg-gray-900"
      title="create contact"
    >
      <form
        className="px-2 md:px-4 py-3 grid gap-y-2"
        onSubmit={createNewContact}
      >
        {error && <p className="p-1 rounded bg-red-500">{error}</p> }
        <label htmlFor="id">Id</label>
        <input
          type="text"
          name="id"
          id="id"
          ref={idRef}
          className="rounded focus:outline-none focus:ring text-black p-1"
          required
        />
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          ref={nameRef}
          className="rounded focus:outline-none focus:ring text-black p-1"
          required
        />
        <button className="bg-blue-600 hover:bg-blue-500 focus:outline-none focus:ring max-w-max p-1 rounded my-1">
          Create
        </button>
      </form>
    </Model>
  );
};

export default ContactModel;
