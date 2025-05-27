import { useState } from "react";
import GoogleLogo from "./assets/icons/googleLogo.png";
import homeImage from "./assets/images/Meeting-room.png";
import videoRecording from "./assets/icons/video-recording.png";
import SignIn from "./components/sign-in";


import gridBg from "./assets/images/grid.png";
import SessionModal from "./components/SessionalModal";
import { Link } from "react-router";

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // const [email, setEmail] = useState("");

  return (
    <div className="1lg:h-auto sm:h-screen overflow-hidden  bg-gradient-to-r from-btn-primary/50  from-10%  to-white to-40% ">
      <img src={gridBg} alt="bachgroung image" className="absolute z-0 inset-0 h-[100vh] w-screen" />
      <div className=" max-w-[2000px] mx-auto z-10">
        <header className=" w-[80%] mx-auto lg:mt-14 mt-10 flex justify-between items-center">
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
          <div className="md:space-y-0  md:space-x-5 flex md:flex-row flex-col  items-center justify-center space-y-3">
          <button className="z-0 group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-md bg-medium-green px-6 font-medium text-white cursor-pointer transition duration-300 hover:scale-110"><span>Create Account</span><div className="absolute  inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-100%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(100%)]"><div className="relative h-full w-8 bg-white/20"></div></div></button>

          <button onClick={() => setIsModalOpen(true)} className="z-0 group w-full md:w-auto relative inline-flex h-12 items-center justify-center overflow-hidden rounded-md bg-medium-green px-6 font-medium text-white cursor-pointer transition duration-300 hover:scale-110"><span>Log in</span><div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-100%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(100%)]"><div className="relative h-full w-8 bg-white/20"></div></div></button>
          </div>

        </section>
        <section className="mt-10 sm:mt-0  w-[95vw] 1lg:w-[70%] mx-auto sm:absolute relative  sm:bottom-0  right-0 left-0 z-10">
          <img src={homeImage} alt="home image" className="w-full" />
        </section>

        {/* The modal */}
        <SignIn
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </div>
    </div>
  );
};

export default App;

// import { useState } from 'react'
// import GoogleLogo from './assets/icons/googleLogo.png'
// import homeImage from './assets/images/home image.png'
// import videoRecording from './assets/icons/video-recording.png'

// import SessionModal from './components/SessionalModal'
// import { Link } from 'react-router'

// const App = () => {

//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const [email, setEmail] = useState('')

//   return (
//     <div className='h-screen max-w-[2000px] mx-auto '>
//       <header className=" w-[80%] mx-auto lg:mt-20 mt-10 flex justify-between items-center">
//         <Link to="/" className='cursor-pointer flex items-center space-x-1'>
//         <img src={videoRecording} alt="video recorder icon" />
//         <p className="font-inter-700 text-medium-green ">

//           OakPark
//         </p>
//         </Link>

//           <button onClick={() => setIsModalOpen(true)}
//           className="hover:cursor-pointer text-text-primary font-inter-700 border border-black rounded-2xl text-sm px-4 py-2"
//             >Join session</button>

//       </header>

//       <section className="w-[80%] mx-auto mt-20 flex-col md:flex-row flex justify-between space-y-10">
//         <div className="text-center md:text-left md:w-[70%] space-y-3">
//           <h1 className="text-header-text-primary font-inter-900 text-3xl md:text-5xl sm:w-[70%] mx-auto md:mx-0">
//           Fast, reliable and secure conferencing
//           </h1>
//           <p className="text-text-primary sm:w-[80%] sm:mx-auto md:mx-0 mx-0 w-full">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid vel voluptatum sunt adipisci non, labore voluptas vero ex quae, reiciendis eveniet atque consectetur ducimus molestias a, culpa modi inventore unde.</p>
//         </div>
//         <div className="md:w-[40%] w-full space-y-3">
//           <label htmlFor="email" className="sr-only ">Email</label>

//           <input
//             type="email"
//             name="Email"
//             id="email"
//             onChange={(e) => setEmail(e.target.value)}
//             className="bg-grey p-3 rounded-2xl w-full indent-3 font-inter-400"
//             placeholder="Enter your email address"
//           />
//           {email && <div >
//             <p className='text-text-grey underline font-inter-400 text-right'>Forget password?</p>
//             <label htmlFor="password" className="sr-only ">Password</label>
//             <input type="text" name="Email" id="password" className=" mt-2 bg-grey p-3 rounded-2xl w-full indent-3 font-inter-400" placeholder="Password"/>
//           </div>}
//           <Link to ="/dashboard"><button className="cursor-pointer font-inter-400 text-white p-3 bg-medium-green rounded-2xl w-full">Create an account </button></Link>
//           <p className="text-text-grey uppercase text-center font-inter-400">or</p>
//           <button className='p-3 border border-border-color-grey w-full rounded-2xl flex justify-center items-center space-x-2'>
//             <img src={GoogleLogo} className='size-8' alt="google logo" />
//             <span className="font-inter-400">Continue with Google</span>
//           </button>
//         </div>
//       </section>
//       <section className="w-[90%] mx-auto mt-20">
//         <img src={homeImage} alt="home image" className='w-full' />
//       </section>

//       {/* The modal */}
//       <SessionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
//     </div>
//   )
// }

// export default App
