import { motion } from "framer-motion";
import { useEffect } from "react";

const Model = ({ children, closeModel, className, title }) => {

  useEffect(() => {
    const escapeModel = (e) => e.keyCode === 27 && closeModel();
    addEventListener('keydown', escapeModel)
    return () => document.removeEventListener('keydown', escapeModel)
  }, [])

  return (
    <div>
      <motion.div
        className={`w-5/6 sm:w-96 fixed left-1/2 transform -translate-x-1/2 shadow-lg rounded-lg z-30 ${className}`}
        initial={{ opacity: 0, top: "10%" }}
        animate={{ top: "20%", opacity: 1, transition: { duration: 0.4 } }}
        exit={{ opacity: 0, top: "10%", transition: { duration: 0.5 } }}
      >
        <div className="p-4 flex w-full justify-between items-center border-b">
          <p className="text-xl mr-3 capitalize">{title}</p>
          <button className="h-5 w-5 overflow-hidden" onClick={closeModel}>
            <i className="fas fa-times" aria-hidden></i>
          </button>
        </div>
        {children}
      </motion.div>
      <div className="absolute inset-0 z-20" onClick={closeModel}></div>
    </div>
  );
};

export default Model;
