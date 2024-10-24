import { Route,Routes } from 'react-router-dom'
import './App.css'
import Auth from './pages/Auth'
import Home from './pages/Home'
import Dashbooard from './pages/Dashbooard'
import Projects from './pages/Projects'
import Footer from './components/Footer'


function App() {
  return (
   <>
    <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/register" element={<Auth insideRegister={true}/>}/>
          <Route path="/dashboard" element={<Dashbooard />}/>
          <Route path="/projects" element={<Projects />}/>
        </Routes>
        <Footer/>
   </>
  )
}

export default App