
import {BrowserRouter,Route,Routes } from 'react-router'
import './index.css'
import Index from './index.tsx'


 
 
 const App = () => {
   return (
    <BrowserRouter>
    <Routes>
      <Route index path="/" element={<Index />} />
    </Routes>
  </BrowserRouter>
   )
 }
 
 export default App