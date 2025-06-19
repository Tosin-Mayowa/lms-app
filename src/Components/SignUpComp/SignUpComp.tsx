"use client";
import axiosInstance from "@/app/_lib/axiosConfig";
import Link from "next/link";
import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import { UserInfoContext } from "@/app/_lib/contextApi";
import Image from "next/image";
export const SignUpComp = () => {
  const user=useContext(UserInfoContext)
  const router=useRouter();
  const [isMobile, setIsMobile] = useState(false);
  const [inputData, setInputData] = useState({
    fullname: "",
    email: "",
    password: "",
  });
  const sendData=async ()=>{
    try{
      const {fullname,email,password}=inputData;
      user?.updateEmail(email)
  const res = await axiosInstance.post("/api/v1/auth/register",{
fullname,email,password,
    isActive:false
  });
  console.log({res});
if(res.data.message){
   router.push('/phoneNumber')
}
    }catch(e){
      console.log(e)
    }
  }
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1025);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);
  const handleClick = () => {
    sendData();
    setInputData(prev=>({...prev,...{
    fullname: "",
    email: "",
    password: "",
  }}));
   
  };
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
        <div className="w-full h-full p-2 sm400:h-[80%]  lg:h-[60%] md:h-[70%] flex flex-col items-start justify-between xl:h-full">
          <div className="w-[80%]  self-center xl:flex xl:flex-col items-center">
           <div className="space-x-0  flex items-end md:h-[150px] p-0 m-0 xl:hidden">
                        <Image
                          src="/image/ILearnerLogo.png"
                          alt=""
                          width={600}
                          height={600}
                          className="p-0 m-0  w-full h-full lg:object-contain"
                        />
                      </div>
            <h1 className="text-mobile text-center font-bold text-white  md:text-desktop xl:mt-0 xl:text-background">
              Sign Up
            </h1>
            <p className="hidden text-center xl:flex xl:w-[80%] text-sm font-light xl:text-[#666362]">
              Empower your learning journey with a personalized dashboard,
              progress tracking, and access to a wide range of interactive
              courses. Create account to get started.
            </p>
          </div>
          <div className="w-[80%] h-[47%] sm400:h-[45%] self-center">
            <div className="w-full h-[60px] ">
              <label
                htmlFor="fullname"
                className="text-md xl:text-[#666362] text-[#fff] md:text-md "
              >
                Fullname
              </label>
              <input
                type="text"
                name="fullname"
                className="bg-[#f5f5f5] p-[10px] w-full h-full mt-2 rounded-[10px] border-none focus:border-none"
                id="fullname"
                onChange={(e) => {
                  const { value, name } = e.target;
                  setInputData((prev) => {
                    return { ...prev, [name]: value };
                  });
                }}
                value={inputData.fullname}
              />
            </div>

            <div className="w-full h-[60px] mt-[50px] lg:mt-[70px] xl:mt-[40px] ">
              <label
                htmlFor="email"
                className="text-md text-[#fff] xl:text-[#666362]"
              >
                Email
              </label>
              <input
                type="email"
                className="bg-[#f5f5f5] p-[10px] w-full h-full mt-2 rounded-[10px] border-none focus:border-none"
                id="email"
                name="email"
                onChange={(e) => {
                  const { value, name } = e.target;
                  setInputData((prev) => {
                    return { ...prev, [name]: value };
                  });
                }}
                value={inputData.email}
              />
            </div>
            <div className="w-full h-[60px] mt-[50px] lg:mt-[70px] xl:mt-[40px] ">
              <label
                htmlFor="password"
                className="text-md text-[#fff] xl:text-[#666362]"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                className="bg-[#f5f5f5] p-[10px] w-full h-full mt-2 rounded-[10px] border-none focus:border-none"
                id="password"
                onChange={(e) => {
                  const { value, name } = e.target;
                  setInputData((prev) => {
                    return { ...prev, [name]: value };
                  });
                }}
                value={inputData.password}
              />
            </div>
          </div>
          {/* Button */}
          <div className="w-[80%] h-[60px] self-center ">
            <button
              className={`w-full h-full cursor-pointer font-bold text-[18px]  ${inputData.email&&inputData.fullname&&inputData.password?"bg-background text-white hover:bg-[#1a8d89]":"bg-[#5ba7a4] text-white"} rounded-[10px] md:text-md`}
              onClick={handleClick}
              disabled={
                !inputData.email || !inputData.password || !inputData.fullname
              }
            >
              Sign Up
            </button>
          </div>
          <div className="w-[80%] h-[60px] self-center flex flex-col mt-[-20px] sm400:mt-[-30px] xl:mt-[-20px]  lg:flex-row lg:justify-between xl:flex-row xl:justify-between">
            <p className="text-white font-bold text-[16px] md:text-sm xl:text-[#666362]">
              {`Already have accout?`}
              <Link
                href="/login"
                className="text-[#DDD8C4] ml-[2px] text-[16px] decoration-none font-extrabold cursor-pointer md:text-sm xl:text-background"
              >
                Login
              </Link>
            </p>
            <Link
              href="#"
              className="mt-[1px] font-bold text-[#DDD8C4] text-sm xl:text-background cursor-pointer opacity-0"
            ></Link>
          </div>
        </div>
      </div>
    </>
  );
};
