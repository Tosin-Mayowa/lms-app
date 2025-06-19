"use client";
import { useState,useEffect } from "react";



export const Loader=()=>{
const [isMobile, setIsMobile] = useState(false);
  
  

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1025);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);
    return (
        <>
          <div
        style={
          isMobile
            ? {
                backgroundImage:
                  "linear-gradient(to top, rgba(0, 124, 119, 0.7), rgba(0, 124, 119, 0.7)), url('/image/boy.jpg')",
              }
            : {}
        }
        className="w-full h-full flex flex-col justify-start lg:justify-center  items-center bg-cover bg-center "
      >
      <div
        className="w-16 h-16 border-4 border-t-transparent border-solid rounded-full animate-spin mb-4"
        style={{ borderColor: '#007C77', borderTopColor: 'transparent' }}
      ></div>
      <h1 className={`text-lg font-semibold ${!isMobile?"text-[#007C77]":"text-white"}`}>Loading...</h1>
    </div>
        </>
    )
 }