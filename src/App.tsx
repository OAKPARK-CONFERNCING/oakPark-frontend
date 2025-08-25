
import { BrowserRouter, Route, Routes } from "react-router";
import "./index.css";
import Index from "./index.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import History from "./pages/history.tsx";
import Contact from "./pages/contact.tsx";
import AppLayout from "./layout/AppLayout.tsx";
import Ongoing from "./pages/ongoing.tsx";
import SessionDetails from "./id/sessionDetails.tsx";
import VideoConference from "./video/video-conference.tsx";
import Edit from "./components/Edit.tsx";
import GoogleCallback from './components/GoogleCallback.tsx'
import ProtectedRoute from "./components/ProtectedRoute.tsx";


const App = () => {
  return (
    <BrowserRouter>
{/* <<<<<<< HEAD
    <Routes> 
      <Route index path="/" element={<Index />} />
      <Route path="/auth/google/callback" element={<GoogleCallback />} />
      <Route element={<AppLayout/>}>
        <Route index path="/dashboard" element={<Dashboard />} />
        <Route  path="/history" element={<History />} />
        <Route path="/contacts" element={<Contact />} />
        <Route path='/ongoing' element={<Ongoing/>}/>
        <Route path='/history/:id' element={<SessionDetails/>}/>
      </Route>
      <Route path='/video' element={<VideoConference/>}/>
      <Route path='/edit-profile' element={<Edit/>}/>
      {/* <Route path='/new-session' element={<NewSession/>}/> *
    {/* </Routes>
  </BrowserRouter>
   )
 }
 
 export default App */}


      <Routes>
        <Route index path="/" element={<Index />} />
              <Route path="/auth/google/callback" element={<GoogleCallback />} />
        <Route
          element={
            // <ProtectedRoute>
            //   <AppLayout />
            // </ProtectedRoute>
             <AppLayout />
          }
        >
          <Route index path="/dashboard" element={<Dashboard />} />
          <Route path="/history" element={<History />} />
          <Route path="/contacts" element={<Contact />} />
          <Route path="/ongoing" element={<Ongoing />} />
          <Route path="/history/:id" element={<SessionDetails />} />
        </Route>
        <Route
          path="/video"
          element={
            <ProtectedRoute>
              <VideoConference />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-profile"
          element={
            <ProtectedRoute>
              <Edit />
            </ProtectedRoute>
          }
        />
        {/* <Route path='/new-session' element={<NewSession/>}/> */}
      </Routes>
    </BrowserRouter>
  );
};


export default App;
