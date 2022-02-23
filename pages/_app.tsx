import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/globals.css'

const bootstrap = typeof window !== `undefined` && import("bootstrap")

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
