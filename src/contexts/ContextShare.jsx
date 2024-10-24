import React ,{ createContext, useState } from "react"
 export const addResponseContext = createContext()


const ContextShare = ({children}) => {
    const [addResponse,setAddResponse]= useState("")
  return (
    <addResponseContext.Provider value={{addResponse,setAddResponse}}>
       {children}
    </addResponseContext.Provider>
  )
}

export default ContextShare