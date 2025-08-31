
import React, { useEffect, useState } from "react";
import "./Nav.css";
import { HiMenu } from "react-icons/hi";
import { IoClose } from "react-icons/io5";

function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  const burger = () => {
    // Toggle the state of isOpen
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"; // Disable scrolling when menu is open
    } else {
      document.body.style.overflow = "auto"; // Enable scrolling when menu is closed
    }
  }, [isOpen]);

  useEffect(() => {
    window.addEventListener("resize", () => {
      if (window.innerWidth > 768) {
        setIsOpen(false); // Close the menu if the screen width is greater than 768px
      }
    });

    return () => {
      window.removeEventListener("resize", () => {
        if (window.innerWidth > 768) {
          setIsOpen(false); // Close the menu if the screen width is greater than 768px
        }
      }); // Cleanup the event listener on component unmount
    };
  }, []);

  return (
    <>
      <div>
        {/* for burger menu */}
        
        {/* {!isOpen && (
          <div
            onClick={burger}
            className=" text-white  cursor-pointer md:hidden"
          >
            <HiMenu size={30} />
          </div>
        )}

        {isOpen && (
          <div
            onClick={burger}
            className="ml-25 text-white  cursor-pointer md:hidden z-20"
          >
            <IoClose size={30} />
          </div>
        )} */}

        {isOpen ? (
          <div className=" bg-gray-900 overflow-y-hidden fixed z-0 top-13 left-0 w-screen min-h-screen flex justify-center items-center flex-col gap-10 duration-300 ease-in">
           
            {/* <a href="#">home</a>
      <a href="#">about</a>
      <a href="#">contact</a> */}

            <ul className=" justify-end items-center gap-4 space-x-8 text-white  md:hidden  p-4">
              <li className=" md:inline   hover:text-orange-400 active:underline hover:underline font-bold">
                Home
              </li>
              <li className="md:inline  hover:text-orange-400 active:underline hover:underline  font-bold">
                About
              </li>
              <li className="md:inline  hover:text-orange-400 active:underline hover:underline font-bold">
                Contact Us
              </li>
            </ul>

            <div className="space-y-4 items-center gap-4  md:hidden">
              <button className="p-2 block w-20 rounded text-white bg-blue-500 mr-5">
                Login
              </button>
              <button className="p-2 rounded w-20 text-white bg-blue-500 mr-5">
                Sign Up
              </button>
            </div>
          </div>
        ) : (
          <div className=" bg-gray-800 overflow-y-hidden fixed z-10 top-0 left-[-150%]  w-screen min-h-screen flex justify-center items-center flex-col gap-10 duration-300 ease-in"></div>
        )}

        <div className={`   justify-end  md:block   hidden  `}>
          <ul className="md:flex justify-end items-center gap-4 space-x-8 text-white    p-4">
            <li className=" md:inline   hover:text-orange-400 active:underline hover:underline font-bold">
              Home
            </li>
            <li className="md:inline  hover:text-orange-400 active:underline hover:underline  font-bold">
              About
            </li>
            <li className="md:inline  hover:text-orange-400 active:underline hover:underline font-bold">
              Contact Us
            </li>
          </ul>
        </div>
      </div>
      <div className="my-auto items-center gap-4 md:flex hidden">
        <button className="p-2 rounded text-white bg-blue-500 mr-5">
          Login
        </button>
        <button className="p-2 rounded text-white bg-blue-500 mr-5">
          Sign Up
        </button>
      </div>

      {/* 
    <div>
      <button onClick={burger} className='md:hidden text-white inline mt-5 mb-2'>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
</svg>

      </button>
    </div> */}
    </>
  );
}

export default Nav;
