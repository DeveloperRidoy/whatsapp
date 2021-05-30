import 'tailwindcss/tailwind.css'
import GlobalContext from '../context/GlobalContext'

function MyApp({ Component, pageProps }) {
  return (
    <div className="max-w-screen-2xl mx-auto">
      <GlobalContext>
        <Component {...pageProps} />
      </GlobalContext>
    </div>
  );
}

export default MyApp
