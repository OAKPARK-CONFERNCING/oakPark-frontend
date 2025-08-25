import { useState } from "react";
// import GoogleLogo from "./assets/icons/googleLogo.png";
import homeImage from "./assets/images/Meeting-room.png";
import videoRecording from "./assets/icons/video-recording.png";
import SignIn from "./components/sign-in";
import MultiStepSignup from "./components/MultiStepSignup";
import { AnimatePresence } from "framer-motion";
import gridBg from "./assets/images/grid.png";
// import SessionModal from "./components/SessionalModal";
import { Link } from "react-router";
import Toasts from "./components/Toasts";

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreateAccountOpen, setIsCreateAccountOpen] = useState(false);


  // const [email, setEmail] = useState("");

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-r from-btn-primary/50 from-10% to-white to-40%">
      <img src={gridBg} alt="background image" className="absolute inset-0 w-full h-full object-cover z-0" />
      <div className="relative z-10 max-w-[2000px] mx-auto min-h-screen flex flex-col">
        <header className="w-[80%] mx-auto lg:mt-14 mt-10 flex justify-between items-center">
          <Link to="/" className="cursor-pointer flex items-center space-x-1">
            <img src={videoRecording} alt="video recorder icon" />
            <p className="font-inter-700 text-medium-green ">OakPark</p>
          </Link>
        </header>

        <section className="w-[80%] mx-auto mt-20 1lg:mt-20 z-10 flex-col items-center flex justify-center space-y-10">
          <div className="text-center md:w-[70%] flex z-10 flex-col items-center justify-center space-y-3">
            <h1 className="text-header-text-primary font-inter-900 text-3xl md:text-5xl sm:w-[70%] mx-auto md:mx-0">
              Fast, reliable and secure conferencing
            </h1>
            
            <p className="text-text-primary sm:w-[80%] sm:mx-auto md:mx-0 mx-0 w-full">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid
              vel voluptatum sunt adipisci non, labore voluptas vero ex quae,
              reiciendis eveniet atque consectetur ducimus molestias a, culpa
              modi inventore unde.
            </p>
          </div>
          <div className="md:space-y-0 mb-20  md:space-x-5 flex md:flex-row flex-col  items-center justify-center space-y-3">
          <button onClick={() => setIsCreateAccountOpen(true)} className="z-0 group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-md bg-medium-green px-6 font-medium text-white cursor-pointer transition duration-300 hover:scale-110"><span>Create Account</span><div className="absolute  inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-100%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(100%)]"><div className="relative h-full w-8 bg-white/20"></div></div></button>

          <button onClick={() => setIsModalOpen(true)} className="z-0 group w-full md:w-auto relative inline-flex h-12 items-center justify-center overflow-hidden rounded-md bg-medium-green px-6 font-medium text-white cursor-pointer transition duration-300 hover:scale-110"><span>Log in</span><div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-100%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(100%)]"><div className="relative h-full w-8 bg-white/20"></div></div></button>
          </div>

        </section>
        <section className="w-[95vw] 1lg:w-[70%]  mx-auto mt-auto">
          <img src={homeImage} alt="home image" className="w-full" />
        </section>

        {/* The modals */}
        <AnimatePresence mode="wait">
          {isModalOpen && (
            <SignIn
              key="signin-modal"
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
            />
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {isCreateAccountOpen && (
            <MultiStepSignup
              key="multi-step-signup-modal"
              isOpen={isCreateAccountOpen}
              onClose={() => setIsCreateAccountOpen(false)}
            />
          )}
        </AnimatePresence>
        
        {/* Toast notifications */}
        <Toasts />
      </div>
    </div>
  );
};

export default App;

