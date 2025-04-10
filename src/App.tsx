import  { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import Loader from "./loader/loader";
import AppLayout from "./layout/AppLayout";
import Index from "./index";
// Lazy load pages
const Dashboard = lazy(() => import("./pages/Dashboard"));
const History = lazy(() => import("./pages/history"));
const Contacts = lazy(() => import("./pages/contact"));

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route element={<AppLayout />}>
          <Route
            path="/dashboard"
            element={
              <Suspense fallback={<Loader />}>
                <Dashboard />
              </Suspense>
            }
          />
          <Route
            path="/history"
            element={
              <Suspense fallback={<Loader />}>
                <History />
              </Suspense>
            }
          />
          <Route
            path="/contacts"
            element={
              <Suspense fallback={<Loader />}>
                <Contacts />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;

// import {BrowserRouter,Route,Routes } from 'react-router'
// import './index.css'
// import Index from './index.tsx'
// import Dashboard from './pages/Dashboard.tsx'
// import History from './pages/history.tsx'
// import Contact from './pages/contact.tsx'

//  const App = () => {
//    return (
//     <BrowserRouter>
//     <Routes> 
//       <Route index path="/" element={<Index />} />
//       <Route index path="/dashboard" element={<Dashboard />} />
//       <Route index path="/history" element={<History />} />
//       <Route index path="/contacts" element={<Contact />} />
//     </Routes>
//   </BrowserRouter>
//    )
//  }
 
//  export default App

// App.tsx
