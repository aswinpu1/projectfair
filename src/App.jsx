import { Navigate, Route,Routes } from 'react-router-dom'
import './App.css'
import Auth from './pages/Auth'
import Home from './pages/Home'
import Dashbooard from './pages/Dashbooard'
import Projects from './pages/Projects'
import Footer from './components/Footer'
import { useContext } from 'react'
import { tokenAuthContext } from './contexts/AuthContext'



function App() {

  const {isAuthorised,setIsAuthorised} = useContext(tokenAuthContext)


  return (
   <>
    <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/register" element={<Auth insideRegister={true}/>}/>
           <Route path="/projects" element={isAuthorised?<Projects />:<Navigate to={'/login'}/>}/>
          <Route path="/dashboard" element={isAuthorised?<Dashbooard />:<Navigate to={'/login'}/>}/>
         
        </Routes>
        <Footer/>
   </>
  )
}

export default App