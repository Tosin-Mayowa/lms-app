"use client"

import { useEffect, useState } from "react";

export type IEventHandler = {
  handleInput: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>, index: number) => void;
};
export const VerifyComp=() =>{
     const [isMobile, setIsMobile] = useState(false);
      
      useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 1024);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
      }, []);
  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const input = e.target;
    const value = input.value;
    if (!/^\d?$/.test(value)) return; // Only allow digits

    const nextInput = document.getElementById(`pin-${index + 1}`);
    if (value && nextInput) {
      (nextInput as HTMLInputElement).focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    const input = e.currentTarget;
    if (e.key === "Backspace" && !input.value && index > 0) {
      const prevInput = document.getElementById(`pin-${index - 1}`);
      (prevInput as HTMLInputElement)?.focus();
    }
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
      
      className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4 bg-center bg-cover">
        <h2 className={`text-xl md:text-2xl font-semibold mb-4 text-center ${isMobile?"text-white":"text-[#1f1e1e]"}`}>Enter your 6-digit verification code</h2>

        <div className="flex space-x-2 md:space-x-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <input
              key={i}
              id={`pin-${i}`}
              type="text"
              inputMode="numeric"
              maxLength={1}
              onChange={(e) => handleInput(e, i)}
              onKeyDown={(e) => handleKeyDown(e, i)}
              className={`w-10 md:w-12 h-12 md:h-14   rounded-lg text-center text-xl ${isMobile?"border-3 border-white text-white":"border border-gray-300"} focus:outline-none focus:ring-2 focus:ring-bg-primary`}
            />
          ))}
        </div>
      </div>
    </>
  );
}
