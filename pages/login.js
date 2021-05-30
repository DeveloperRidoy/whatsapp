import Head from "next/head";
import { useContext, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { Context } from "../context/GlobalContext";
import { useRouter } from 'next/router';
import { NOTFOUND, NOTSET } from "../utils/variables";

function Login() {

  const Router = useRouter();

  const {id, setId } = useContext(Context);

  const idRef = useRef();

  const setUserId = (e) => {
    e.preventDefault();
    setId(idRef.current.value)
    };
    
  const setRandomUserId = () => {
    setId(uuidv4())
  }

  useEffect(() => id !== NOTSET && id !== NOTFOUND && Router.replace('/') , [id])

  return (
    <div>
      <Head>
        <title>Login</title>
        <link rel="icon" href="logo.png" />
      </Head>
      {id === NOTFOUND && (
        <div className="bg-emerald-500 min-h-screen text-white flex flex-col items-center">
          <div className="flex items-center py-10">
            <img src="logo.png" alt="whatsapp" className="h-12 w-12 mr-2" />
            <h3 className="text-5xl">WhatsApp</h3>
          </div>
          <form className="my-10 w-full sm:w-auto px-5" onSubmit={setUserId}>
            <label htmlFor="userId" className="block text-xl capitalize">
              enter your id
            </label>
            <input
              type="text"
              className="w-full sm:w-72 p-1 text-black focus:outline-none focus:ring rounded my-2"
              name="userId"
              id="userId"
              ref={idRef}
              required
            />
            <div>
              <button className="capitalize bg-emerald-800 py-1 px-3 rounded focus:outline-none focus:bg-emerald-900 hover:bg-emerald-900 focus:ring transition mr-2 transition">
                login
              </button>
              <button
                type="button"
                className="capitalize bg-gray-700 py-1 px-3 rounded focus:outline-none focus:ring transition hover:bg-gray-800 focus:bg-gray-800"
                onClick={setRandomUserId}
              >
                create a new id
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default Login;
