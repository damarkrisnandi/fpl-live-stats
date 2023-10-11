"use client";
import { useEffect, useState } from "react"
import Link from 'next/link'
import { useRouter } from 'next/router';
import { usePathname } from 'next/navigation';


export async function getStaticProps() {
  return {
    props: {
      title: '...'
    },
  };
}

export default function HeaderMain() {
  const [open, isOpen] = useState(false)
  const [selected, setSelected] = useState('')
  const pathname = usePathname();

  const mapHeader = new Map();
    mapHeader.set('/', 'Live Match');

  const title = pathname ? mapHeader.get(pathname) || pathname : '';

  useEffect(() => {
    setInterval(() => {
      window.location.reload();
    }, 1000 * 60 * 5)
  })
  
  return (
        

    <nav className="bg-gradient-to-br from-purple-700 to-blue-500 fixed w-full z-20 top-0 left-0 border-b">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
      <a href="/" className="flex items-center">
          {/* <img src="https://flowbite.com/docs/images/logo.svg" className="h-8 mr-3" alt="Flowbite Logo"> */}
          <span className="self-center text-lg font-semibold whitespace-nowrap text-white dark:text-white">{ title }</span>
      </a>
      <div className="flex">
          <button data-collapse-toggle="navbar-sticky" type="button" className="inline-flex items-center p-2 text-sm text-white rounded-lg hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white dark:hover:bg-blue-700 dark:focus:ring-blue-600" aria-controls="navbar-sticky" aria-expanded="false"
            onClick={() => {window.location.reload()}}
          >
            <span className="sr-only">Open main menu</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
            </svg>

          </button>
      </div>
      <div className={`items-center justify-between ${open ? 'transition duration-300' : 'transition duration-300 hidden'} w-full md:flex `} id="navbar-sticky">
        {/* <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0 ">
          
          <li>
            <Link className={`flex py-2 pl-3 pr-4  text-white rounded md:hover:bg-transparent md:p-0 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 
            transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-gray-100 duration-300
            ${selected === '' && 'font-bold'}`} href='/' onClick={() => {setSelected(''); isOpen(!open)}}>All</Link>
          </li>
          
        </ul> */}
      </div>
      </div>
    </nav>



    )
}

function SelectLeague() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white ml-2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zm-7.518-.267A8.25 8.25 0 1120.25 10.5M8.288 14.212A5.25 5.25 0 1117.25 10.5" />
    </svg>
  )
}