"use client";
import {useState, useEffect} from "react";

import { useRouter } from "next/navigation";
export const SidebarComp:React.FC= ()=>{
     const [isDesktop, setIsDesktop] = useState<boolean>(false);
     const router=useRouter();

  useEffect(() => {
    const checkDeskTop = () => setIsDesktop(window.innerWidth > 1025);
    checkDeskTop();
    window.addEventListener("resize", checkDeskTop);
    return () => window.removeEventListener("resize", checkDeskTop);
  }, []);

  const handleBack=()=>{
    router.back();
  }
    return (
        <>
          <div 
          style={
              isDesktop
            ? {
                backgroundImage:
                  "linear-gradient(to top, rgba(0, 124, 119, 0.5), rgba(0, 124, 119, 0.5)), url('/image/boy.jpg')",
              }
            : {}
          }
          className="hidden sm1025:flex flex-col xl:w-[50%] xl:h-full xl:justify-center xl:items-center  bg-cover bg-center ">
          {/* heading box */}
          <div className="w-full flex flex-col">
            <h1 className="text-[50px] font-light text-center text-white">
              Welcome To ILearner
            </h1>
            <div className="w-[48px] h-[5px] bg-white self-center
            
            "></div>
          </div>
          <div className="w-full mt-[40px] ">
            <p className="text-white text-center text-[1rem] font-light"> We’re excited to have you on board! ILearner is your
                  all-in-one learning hub — whether you’re here to take courses,
                  create them, or manage learners, you’re in the right place.
                  Get started by exploring your dashboard, joining a course, or
                  customizing your profile. If you ever need help, our support
                  team is just a click away.</p>
            <div className="w-full h-[40px] mt-[20px] flex justify-center">
              {/* place buttons here */}
              <button className="w-[200px] cursor-pointer rounded-xl h-full font-bold border border-solid text-white bg-none border-background hover:bg-background hover:border-none"
              onClick={handleBack}>Back</button>
            </div>
          </div>
        </div>    
        </>
    )
}