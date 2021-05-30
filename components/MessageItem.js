import moment from "moment";
import { useState } from "react";

const MessageItem = ({ msg }) => {
  const [expand, setExpand] = useState(false);
  return (
    <div className={`flex flex-col my-2 ${msg.sender === "me" ? "self-end" : "self-start"}`}>
      <p
        className={`self-end rounded-xl py-1.5 px-3 cursor-pointer ${
          msg.sender === "me" ? "bg-blue-500" : "bg-gray-500"
        }`}
        onClick={() => setExpand(!expand)}
      >
        {msg.text}
      </p>
      {expand && (
        <div className="mt-1 flex justify-end items-center text-sm">
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