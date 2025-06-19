"use client"
import { useEffect, useState,useContext } from 'react'
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import axiosInstance from '@/app/_lib/axiosConfig'
import { UserInfoContext } from '@/app/_lib/contextApi'
import { useRouter } from 'next/navigation'
import Image from 'next/image'


export const PhoneComp=()=>{
  const router=useRouter();
    const [value, setValue] = useState<string|undefined>("");
    const [isMobile, setIsMobile] = useState(false);
const user=useContext(UserInfoContext)
    
const sendPhnNumber=async ()=>{
     try {
      console.log({email:user?.emailInfo});
      
       user?.updatePhn?.(value ?? '')
console.log({value},typeof value);

      const resp=await axiosInstance.post("/api/v1/auth/submit-phone",{email:user?.emailInfo,phone:value})
     console.log({code:resp.data.data});
     
      user?.updateCode(resp.data.data)
      console.log(resp);
      
      if(resp){
             router.push('/verification') ;    
      }
     } catch (error) {
       console.log({error})
     }
      
    }
          
          useEffect(() => {
            const checkMobile = () => setIsMobile(window.innerWidth < 1025);
            checkMobile();
            window.addEventListener("resize", checkMobile);
            return () => window.removeEventListener("resize", checkMobile);
          }, []);
          const handleClick=()=>{
            sendPhnNumber();
            
          }
    return(
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
      
      className="flex flex-col items-center justify-center min-h-screen bg-white p-4 bg-center bg-cover">
         <div className="space-x-0  flex items-end md:h-[150px] p-0 m-0 xl:hidden">
                                      <Image
                                        src="/image/ILearnerLogo.png"
                                        alt=""
                                        width={600}
                                        height={600}
                                        className="p-0 m-0  w-full h-full lg:object-contain"
                                      />
                                    </div>
        <h2 className={`text-xl md:text-2xl font-semibold mb-4 text-center ${isMobile?"text-white":"text-[#1f1e1e]"}`}>Enter your PhoneNumber</h2>

        <div className="flex  w-[80%] h-[60px]">
          
    <PhoneInput
    className="PhoneInputInput bg-[#f5f5f5]  w-[60%] h-full mt-2 rounded-[10px] border-none focus:border-none"
      placeholder="Enter phone number"
      value={value}
      onChange={(val)=>setValue(val)}/>
       <div className="w-[20%] h-full mt-2 ml-[1px] flex justify-center">
              {/* place buttons here */}
              <button className={`w-full p-1 cursor-pointer rounded-xl h-full font-bold bg-none ${
            value
              ? "bg-background text-white"
              : "bg-[#f5f5f5] text-[#666632]"
          } border-none`}
              onClick={handleClick}>Send</button>
            </div>
        </div>
       
      </div>

  
        </>
    )
}