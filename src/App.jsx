import { useState ,useEffect} from 'react'
import Sidebar from './components/layout/Sidebar'
import { Routes, Route ,useLocation} from 'react-router-dom'
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const location = useLocation()
  useEffect(() => {
    if(location.pathname !== '/login'){
      setIsLoggedIn(true)
    }else{
      setIsLoggedIn(false)
    }
  }, [location.pathname])
  return (<>
    <div className="app-container" >
       {isLoggedIn && <Sidebar /> }
      <main className="main-content">
        <Routes>
           <Route path="/Dashboard" element={<h1>Home</h1> } />
           <Route path="/produits" element={<h1>Produits</h1> } />
           <Route path="/stock" element={<h1>Stock</h1> } />
           <Route path="/fournisseurs" element={<h1>Fournisseurs</h1> } />
           <Route path="/ventes" element={<h1>Ventes</h1> } />
           <Route path="/clients" element={<h1>Clients</h1> 
           } />
           <Route path="/stats" element={<h1>Stats</h1> } />
           <Route path="/parametres" element={<h1>Parametres</h1> } />
           <Route path="/login" element={<h1>login</h1>}/>
        </Routes>
      </main>
    </div>
  </>)
}

export default App