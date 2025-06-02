"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

export const LoginComponent = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [email,setEmail]=useState<string>('')
  const [password,setPassword]=useState<string>('')
  const [isClick,setIsClick]=useState<boolean>(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1025);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);
  const handleClick=()=>{
    setIsClick(true)
    setEmail('');
    setPassword('');
    setTimeout(()=>{setIsClick(false)},1000)
  }
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
        className="w-full h-full flex flex-col justify-center items-center bg-cover bg-center "
      >
        <div className="w-full h-[80%] sm400:h-[60%] md:h-[62%] flex flex-col items-start justify-between xl:h-full">
          <div className="w-[80%] self-center xl:flex xl:flex-col items-center">
            <h1 className="text-white ">Logo</h1>
            <h1 className="text-mobile font-bold text-white mt-[20px] sm400:mt-[60px] md:text-desktop xl:text-background">
              Login Account
            </h1>
            <p className="hidden text-center xl:flex xl:w-[80%] text-sm font-light xl:text-[#666362]">Empower your learning journey with a personalized dashboard, progress
          tracking, and access to a wide range of interactive courses. Sign in
          to continue where you left off.</p>
          </div>
          <div className="w-[80%] h-[50%] self-center">
            <div className="w-full h-[60px] ">
              <label htmlFor="email" className="text-md xl:text-[#666362] text-[#fff] md:text-md ">
                Email
              </label>
              <input
                type="text"
                name="email"
                className="bg-[#f5f5f5] p-[10px] w-full h-full mt-2 rounded-[10px] border-none focus:border-none"
                id="email"
                onChange={(e)=>setEmail(e.target.value)}
                value={email}
              />
            </div>

            <div className="w-full h-[60px] mt-[50px] lg:mt-[70px] xl:mt-[40px] ">
              <label htmlFor="password" className="text-md text-[#fff] xl:text-[#666362]">
                Password
              </label>
              <input
                type="password"
                className="bg-[#f5f5f5] p-[10px] w-full h-full mt-2 rounded-[10px] border-none focus:border-none"
                id="password"
                onChange={(e)=>setPassword(e.target.value)}
                value={password}
              />
            </div>
            <div className="mt-[40px] md:mt-[50px]">
              <label htmlFor="" className="text-[#fff] text-sm font-bold xl:text-[#666362]">
                <input type="checkbox" name="" id="" className="mr-[3px]" />
                Remember me
              </label>
            </div>
          </div>
          {/* Button */}
          <div className="w-[80%] h-[60px] self-center sm400:mt-[-50px] xl:mt-[-100px]">
            <button 
            className="w-full h-full bg-background cursor-pointer text-white font-bold text-[18px] rounded-[10px] md:text-md"
            onClick={handleClick}
              disabled={!email || !password}
            >
              {!isClick?"Login":"Login in..."}
            </button>
          </div>
          <div className="w-[80%] h-[60px] self-center flex flex-col mt-[-30px] xl:flex-row xl:justify-between">
            <p className="text-white font-bold text-[16px] md:text-sm xl:text-[#666362]">
              Don't have accout?
              <Link
                href="/signUp"
                className="text-[#DDD8C4] ml-[2px] text-sm decoration-none font-extrabold cursor-pointer md:text-sm xl:text-background"
              >
                sign up
              </Link>
            </p>
            <Link
              href="/forgot-password"
              className="mt-[2px] font-bold text-[#DDD8C4] text-sm xl:text-background cursor-pointer"
            >
              forgot password.
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
