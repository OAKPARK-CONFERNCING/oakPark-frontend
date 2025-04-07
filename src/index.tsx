
import { useState } from 'react'
import GoogleLogo from './assets/icons/googleLogo.png'
import homeImage from './assets/images/home image.png'
import videoRecording from './assets/icons/video-recording.png'


const App = () => {

  const [email, setEmail] = useState('')

  return (
    <div className='h-screen'>
      <header className=" w-[80%] mx-auto mt-20 flex justify-between items-center">
        <div className='flex items-center space-x-1'>
        <img src={videoRecording} alt="video recorder icon" />
        <p className="font-inter-700 text-medium-green ">
          
          OakPark
        </p>
        </div>

        <div className="text-text-primary font-inter-700 border border-black rounded-2xl text-sm px-4 py-2">
          Join session
        </div>
      </header>

      <section className="w-[80%] mx-auto mt-20 flex-col md:flex-row flex justify-between space-y-10">
        <div className="text-center md:text-left md:w-[70%] space-y-3">
          <h1 className="text-header-text-primary font-inter-900 text-3xl md:text-5xl sm:w-[70%] mx-auto md:mx-0">
          Fast, reliable and secure conferencing
          </h1>
          <p className="text-text-primary sm:w-[80%] sm:mx-auto md:mx-0 mx-0 w-full">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid vel voluptatum sunt adipisci non, labore voluptas vero ex quae, reiciendis eveniet atque consectetur ducimus molestias a, culpa modi inventore unde.</p>
        </div>
        <div className="md:w-[40%] w-full space-y-3">
          <label htmlFor="email" className="sr-only ">Email</label>

          <input type="text" name="Email" id="email" className="bg-grey p-3 rounded-2xl w-full indent-3 font-inter-400" placeholder="Enter your email address"/>

          <input 
            type="text" 
            name="Email" 
            id="email" 
            onChange={(e) => setEmail(e.target.value)} 
            className="bg-grey p-3 rounded-2xl w-full indent-3 font-inter-400" 
            placeholder="Enter your email address"
          />
          {email && <div >
            <p className='text-text-grey underline font-inter-400 text-right'>Forget password?</p>
            <label htmlFor="password" className="sr-only ">Password</label>
            <input type="text" name="Email" id="password" className=" mt-2 bg-grey p-3 rounded-2xl w-full indent-3 font-inter-400" placeholder="Password"/>
          </div>}
          <button className="font-inter-400 text-white p-3 bg-medium-green rounded-2xl w-full">Create a session</button>
          <p className="text-text-grey uppercase text-center font-inter-400">or</p>
          <button className='p-3 border border-border-color-grey w-full rounded-2xl flex justify-center items-center space-x-2'>
            <img src={GoogleLogo} className='size-8' alt="google logo" />
            <span className="font-inter-400">Continue with Google</span>
          </button>
        </div>
      </section>
      <section className="w-[90%] mx-auto mt-20">
        <img src={homeImage} alt="home image" className='w-full' />
      </section>
    </div>
  )
}

export default App
