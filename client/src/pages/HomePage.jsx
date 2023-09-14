import React from 'react';
import { NavLink } from "react-router-dom";

export default function HomePage() {
  return (
    <div >
      <div className="relative isolate h-screen overflow-hidden bg-gray-900 px-6 pt-16 shadow-2xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">
        <svg
          viewBox="0 0 1024 1024"
          className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2 lg:translate-y-0"
          aria-hidden="true"
        >
          <circle cx={512} cy={512} r={512} fill="url(#759c1415-0410-454c-8f7c-9a820de03641)" fillOpacity="0.7" />
          <defs>
            <radialGradient id="759c1415-0410-454c-8f7c-9a820de03641">
              <stop stopColor="#7775D6" />
              <stop offset={1} stopColor="#E935C1" />
            </radialGradient>
          </defs>
        </svg>
        <div className="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Boost your productivity.
            <br />
            Start using CodeMagic today.
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            CodeMagic is your ultimate coding playground. Create, edit, and experiment
            with HTML, CSS, and JavaScript like never before. With features like folder
            management, integrated console, and live server, you can develop and view
            your web projects seamlessly, just like in VS Code.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
            <NavLink
              to="/code-editor"
              className="rounded-md bg-white hover:bg-blue-500 hover:text-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Get started
            </NavLink>
            <p className='text-lg lg:text-xl text-white'>
              Already have an account?{' '}
              <NavLink className="text-lg font-bold leading-6 text-blue-600" to='/signin'>
                Sign In <span aria-hidden="true">→</span>
              </NavLink>
            </p>
          </div>
        </div>
        <div className="relative mt-16 h-80 lg:mt-8">
          <img
            className="absolute left-0 top-0 w-[50rem] max-w-none rounded-md bg-white/5 ring-1 ring-white/10"
            src="/images/Screenshot.png"
            alt="App screenshot"
          />
        </div>
      </div>
    </div>
  )
}


