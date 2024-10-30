import React ,{ createContext, useState } from "react"
 export const addResponseContext = createContext()
 export const editResponseContext  =  createContext()


const ContextShare = ({children}) => {
    const [addResponse,setAddResponse]= useState("")
    const [editResponse,SetEditResponse] = useState("")
  return (
    <addResponseContext.Provider value={{addResponse,setAddResponse}}>
       <editResponseContext.Provider value={{editResponse,SetEditResponse}}>
        {children}
        </editResponseContext.Provider>
    </addResponseContext.Provider>
  )
}

export default ContextShare