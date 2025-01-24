import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Header } from './components/Header.jsx'
import { Footer } from './components/Footer.jsx'
import {db} from './data/db.js'
import { Guitar } from './components/Guitar.jsx'

function App() {
  const [data, setData] = useState(db)

  return (
    <>
      <Header/>
        <main className="container-xl mt-5">
          <h2 className="text-center">Nuestra Colección</h2>

          <div className="row mt-5">
              <Guitar/>
              <Guitar/>
          </div>
        </main>
      <Footer/>
    </>
  )
}

export default App