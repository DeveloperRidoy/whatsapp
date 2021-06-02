import moment from "moment";
import { useContext, useState } from "react";
import { Context } from "../context/GlobalContext";


const MessageItem = ({ msg, className }) => {

  const [expand, setExpand] = useState(false);
  return (
    <div className={`flex flex-col my-2 ${className} ${msg.sender === "You" ? "self-end" : "self-start"}`}>
      <p
        className={`rounded-xl py-1.5 px-3 cursor-pointer ${
          msg.sender === "You" ? "bg-blue-500 self-end" : "bg-gray-500 self-start"
        }`}
        onClick={() => setExpand(!expand)}
      >
        {msg.text}
      </p>
      {expand && (
        <div className="mt-1 flex justify-end items-center text-xs">
          <p className="mr-2 bg-gray-600 py-1 px-2 rounded">
            {moment(msg.createdAt).fromNow()}
          </p>
          <p className="bg-gray-600 py-1 px-2 rounded ">{msg.sender}</p>
        </div>
      )}
    </div>
  );
};


export default MessageItem;