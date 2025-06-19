"use client";

import axiosInstance from "@/app/_lib/axiosConfig";
import { UserInfoContext } from "@/app/_lib/contextApi";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export const VerifyComp = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [pin, setPin] = useState<string[]>(Array(6).fill(""));
  const router = useRouter();
  const user = useContext(UserInfoContext);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1025);
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
      <div className="space-x-0  flex items-end md:h-[150px] p-0 m-0 xl:hidden">
                              <Image
                                src="/image/ILearnerLogo.png"
                                alt=""
                                width={600}
                                height={600}
                                className="p-0 m-0  w-full h-full lg:object-contain"
                              />
                            </div>
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














