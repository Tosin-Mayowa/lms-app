"use client";

import axiosInstance from "@/app/_lib/axiosConfig";
import { UserInfoContext } from "@/app/_lib/contextApi";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export const VerifyComp = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [pin, setPin] = useState<string[]>(Array(6).fill(""));
  const router = useRouter();
  const user = useContext(UserInfoContext);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);


  // ✅ Autofill PIN from context code (only once on load or when code changes)
  useEffect(() => {
    if (user?.code && user.code.length === 6) {
      const codeArray = user.code.split("");
      setPin(codeArray);

      // Optional: Autofocus the last input box
      const lastInput = document.getElementById("pin-5") as HTMLInputElement | null;
      lastInput?.focus();
    }
  }, [user?.code]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;

    if (!/^\d?$/.test(value)) return;

    const newPin = [...pin];
    newPin[index] = value;
    setPin(newPin);

    if (value && index < 5) {
      const nextInput = document.getElementById(`pin-${index + 1}`) as HTMLInputElement | null;
      nextInput?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !pin[index] && index > 0) {
      const prevInput = document.getElementById(`pin-${index - 1}`) as HTMLInputElement | null;
      prevInput?.focus();
    }
  };

  const handleClick = async () => {
    const fullPin = pin.join("");
    if (fullPin.length !== 6) {
      alert("Please enter all 6 digits");
      return;
    }

    try {
      const resp = await axiosInstance.post("/api/v1/auth/verify-phone", {
        phone: user?.phone,
        code: fullPin,
      });
    if (resp.data.message) {
        router.push("/login");
    }
    } catch (err) {
      console.error("Verification failed", err);
      alert("Invalid or expired code.");
    }
  };

  return (
    <div
      style={
        isMobile
          ? {
              backgroundImage:
                "linear-gradient(to top, rgba(0, 124, 119, 0.7), rgba(0, 124, 119, 0.7)), url('/image/boy.jpg')",
            }
          : {}
      }
      className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4 bg-center bg-cover"
    >
      <h2
        className={`text-xl md:text-2xl font-semibold mb-4 text-center ${
          isMobile ? "text-white" : "text-[#1f1e1e]"
        }`}
      >
        Enter 6-digit verification code sent to your phone
      </h2>

      <div className="flex space-x-2 md:space-x-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <input
            key={i}
            id={`pin-${i}`}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={pin[i]}
            onChange={(e) => handleInput(e, i)}
            onKeyDown={(e) => handleKeyDown(e, i)}
            className={`w-10 md:w-12 h-12 md:h-14 rounded-lg text-center text-xl ${
              isMobile
                ? "border-3 border-white text-white"
                : "border border-gray-300"
            } focus:outline-none focus:ring-2 focus:ring-bg-primary`}
          />
        ))}
      </div>

      <div className="w-full h-[40px] mt-[20px] flex justify-center">
        <button
          className={`w-[200px] cursor-pointer rounded-xl h-full font-bold border-background ${
            pin.join("").length === 6
              ? "bg-background text-white"
              : "bg-[#f5f5f5] text-[#666632]"
          }`}
          onClick={handleClick}
          disabled={pin.join("").length !== 6}
        >
          Send
        </button>
      </div>
    </div>
  );
};















// "use client";

// import axiosInstance from "@/app/_lib/axiosConfig";
// import { UserInfoContext } from "@/app/_lib/contextApi";
// import { useContext, useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// export const VerifyComp = () => {
//   const [isMobile, setIsMobile] = useState(false);
//   const [pin, setPin] = useState<string[]>(Array(6).fill(""));
//   const router=useRouter();
// const user=useContext(UserInfoContext)
//   useEffect(() => {
//     const checkMobile = () => setIsMobile(window.innerWidth < 1024);
//     checkMobile();
//     window.addEventListener("resize", checkMobile);
//     return () => window.removeEventListener("resize", checkMobile);
//   }, []);

//   const handleInput = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
//     const value = e.target.value;

//     // Only allow digits
//     if (!/^\d?$/.test(value)) return;

//     const newPin = [...pin];
//     newPin[index] = value;
//     setPin(newPin);

//     if (value && index < 5) {
//       const nextInput = document.getElementById(`pin-${index + 1}`) as HTMLInputElement | null;
//       nextInput?.focus(); // Optional chaining to avoid "possibly null" error
//     }
//   };

//   const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
//     if (e.key === "Backspace" && !pin[index] && index > 0) {
//       const prevInput = document.getElementById(`pin-${index - 1}`) as HTMLInputElement | null;
//       prevInput?.focus(); // Optional chaining
//     }
//   };

//   const handleClick = async () => {
//     const fullPin = pin.join("");
//     if (fullPin.length !== 6) {
//       alert("Please enter all 6 digits");
//       return;
//     }

//     console.log("Verification PIN to send:", fullPin);
//    const resp=await axiosInstance.post("/api/v1/auth/verify-phone",{phone:user?.phone, code:fullPin });
//    router.push('/login')
//   };

//   return (
//     <div
//       style={
//         isMobile
//           ? {
//               backgroundImage:
//                 "linear-gradient(to top, rgba(0, 124, 119, 0.7), rgba(0, 124, 119, 0.7)), url('/image/boy.jpg')",
//             }
//           : {}
//       }
//       className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4 bg-center bg-cover"
//     >
//       <h2
//         className={`text-xl md:text-2xl font-semibold mb-4 text-center ${
//           isMobile ? "text-white" : "text-[#1f1e1e]"
//         }`}
//       >
//         Enter 6-digit verification code sent to your phone
//       </h2>

//       <div className="flex space-x-2 md:space-x-4">
//         {Array.from({ length: 6 }).map((_, i) => (
//           <input
//             key={i}
//             id={`pin-${i}`}
//             type="text"
//             inputMode="numeric"
//             maxLength={1}
//             value={pin[i]}
//             onChange={(e) => handleInput(e, i)}
//             onKeyDown={(e) => handleKeyDown(e, i)}
//             className={`w-10 md:w-12 h-12 md:h-14 rounded-lg text-center text-xl ${
//               isMobile
//                 ? "border-3 border-white text-white"
//                 : "border border-gray-300"
//             } focus:outline-none focus:ring-2 focus:ring-bg-primary`}
//           />
//         ))}
//       </div>

//       <div className="w-full h-[40px] mt-[20px] flex justify-center">
//         <button
//           className={`w-[200px] cursor-pointer rounded-xl h-full font-bold  bg-none border-background ${pin.join("").length===6?"bg-background text-white":"bg-[#f5f5f5] text-[#666632]"} border-none`}
//           onClick={handleClick}
//           disabled={pin.join("").length!==6}
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   );
// };























// "use client"

// import { useEffect, useState } from "react";

// export type IEventHandler = {
//   handleInput: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void;
//   handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>, index: number) => void;
// };
// export const VerifyComp=() =>{
//      const [isMobile, setIsMobile] = useState(false);
      
//       useEffect(() => {
//         const checkMobile = () => setIsMobile(window.innerWidth < 1024);
//         checkMobile();
//         window.addEventListener("resize", checkMobile);
//         return () => window.removeEventListener("resize", checkMobile);
//       }, []);
//   const handleInput = (
//     e: React.ChangeEvent<HTMLInputElement>,
//     index: number
//   ) => {
//     const input = e.target;
//     const value = input.value;
//     if (!/^\d?$/.test(value)) return; // Only allow digits

//     const nextInput = document.getElementById(`pin-${index + 1}`);
//     if (value && nextInput) {
//       (nextInput as HTMLInputElement).focus();
//     }
//   };

//   const handleKeyDown = (
//     e: React.KeyboardEvent<HTMLInputElement>,
//     index: number
//   ) => {
//     const input = e.currentTarget;
//     if (e.key === "Backspace" && !input.value && index > 0) {
//       const prevInput = document.getElementById(`pin-${index - 1}`);
//       (prevInput as HTMLInputElement)?.focus();
//     }
//   };
//   const handleClick=()=>{

//   }
//  return (
//     <>
//       <div 
//        style={
//           isMobile
//             ? {
//                 backgroundImage:
//                   "linear-gradient(to top, rgba(0, 124, 119, 0.7), rgba(0, 124, 119, 0.7)), url('/image/boy.jpg')",
//               }
//             : {}
//         }
      
//       className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4 bg-center bg-cover">
//         <h2 className={`text-xl md:text-2xl font-semibold mb-4 text-center ${isMobile?"text-white":"text-[#1f1e1e]"}`}>Enter your 6-digit verification code</h2>

//         <div className="flex space-x-2 md:space-x-4">
//           {Array.from({ length: 6 }).map((_, i) => (
//             <input
//               key={i}
//               id={`pin-${i}`}
//               type="text"
//               inputMode="numeric"
//               maxLength={1}
//               onChange={(e) => handleInput(e, i)}
//               onKeyDown={(e) => handleKeyDown(e, i)}
//               className={`w-10 md:w-12 h-12 md:h-14   rounded-lg text-center text-xl ${isMobile?"border-3 border-white text-white":"border border-gray-300"} focus:outline-none focus:ring-2 focus:ring-bg-primary`}
//             />
//           ))}
//         </div>
//         <div className="w-full h-[40px] mt-[20px] flex justify-center">
//               {/* place buttons here */}
//               <button className="w-[200px] cursor-pointer rounded-xl h-full font-bold border border-solid text-white bg-none border-background hover:bg-background hover:border-none"
//               onClick={handleClick}>Send</button>
//             </div>
//       </div>
//     </>
//   );
// }
