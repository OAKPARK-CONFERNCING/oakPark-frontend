
import {BrowserRouter,Route,Routes } from 'react-router'
import './index.css'
import Index from './index.tsx'
import Dashboard from './pages/Dashboard.tsx'

 const App = () => {
   return (
    <BrowserRouter>
    <Routes>
      <Route index path="/" element={<Index />} />
      <Route index path="/dashboard" element={<Dashboard />} />
      
    </Routes>
  </BrowserRouter>
   )
 }
 
 export default App