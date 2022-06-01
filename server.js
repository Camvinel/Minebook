import Express from "express"
import Next from "next"
import { initializeApp } from "firebase/app"
import { collection, query, doc, getFirestore, getDocs, where } from "firebase/firestore"
import firebaseConfig from "./firebase.js"

// firebase initialisation
const fApp = initializeApp(firebaseConfig)
const db = getFirestore(fApp)

const dev = process.env.NODE_ENV !== 'production'
const app = Next({ dev })
const handle = app.getRequestHandler()

app.prepare()
  .then(() => {
    const server = Express()

    server.get("/api/users", async (req, res) => {
      const usersRef = collection(db, "users")
      const q = query(usersRef)
      const querySnapshot = await getDocs(q)
      res.json(querySnapshot.docs.map((doc) => doc.data()))
    })

    server.get("/api/users/:username", async (req, res) => {
      const username = req.params.username
      const usersRef = collection(db, "users")
      const q = query(usersRef, where("username", "==", username))
      const querySnapshot = await getDocs(q)
      querySnapshot.forEach((d) => console.log(d.data()))
      res.json(querySnapshot.docs.map((doc) => doc.data()))
    })

    server.get('*', (req, res) => {
      return handle(req, res)
    })

    server.listen(3000, (err) => {
      if (err) throw err
      console.log('> Ready on http://localhost:3000')
    })
  })
  .catch((ex) => {
    console.error(ex.stack)
    process.exit(1)
  })
