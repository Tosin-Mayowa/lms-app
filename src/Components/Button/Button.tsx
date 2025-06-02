"use client";
import { useRouter } from "next/navigation";

export const Button=()=>{
    const router=useRouter();
    return (
        <>
         <button onClick={()=>router.push("/login")} className="w-[90%] cursor-pointer rounded-md h-[40px] bg-background text-white special:w-[50%] md:h-[50px] md:text-lg md:w-[40%] lg:w-[50%] lg:text-[1.1rem] lg:tracking-wider">
            Get Started
          </button>
        </>
    )
}