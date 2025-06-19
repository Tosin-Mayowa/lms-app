"use client"

import {useState, createContext} from 'react';

type IUserInfo={
    emailInfo:string;
    updateEmail:(val:string)=>void;
    updatePhn:(val:string)=>void;
    updateCode:(val:string)=>void;
    phone:string;
    code:string;
}

export const UserInfoContext=createContext<IUserInfo|undefined>(undefined);

export const UserInfoProvider:React.FC<{children:React.ReactNode}>=({children})=>{
    const [emailInfo,setEmailInfo]=useState('');
    const [phone,setPhone]=useState('');
    const [code,setCode]=useState('');
const updateEmail=(val:string)=>{
    setEmailInfo(val)
};
const updatePhn=(val:string)=>{
    setPhone(val)
};
const updateCode=(val:string)=>{
    setCode(val)
};
   return <UserInfoContext.Provider value={{emailInfo,phone,updateEmail,updatePhn,updateCode,code}}>
        {children}
    </UserInfoContext.Provider>
}