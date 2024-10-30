//register called by auth

import commonApi from "./commonApi"
import SERVERURL from "./seviceUrl"

export const registerApi = async(reqBody)=>{
   return await commonApi("POST",`${SERVERURL}/register`,reqBody)
}

//login called by auth
export const loginApi = async(reqBody)=>{
   return await commonApi("POST",`${SERVERURL}/login`,reqBody)
}

//addProject API called by Add
export const addProjectApi = async(reqBody,reqHeader)=>{
   return await commonApi("POST",`${SERVERURL}/add-project`,reqBody,reqHeader)
}

//homeProjectApi API called by home
export const homeProjectApi = async()=>{
   return await commonApi("GET",`${SERVERURL}/home-projects`,"")
   
}


//allProjectApi  called by projects
export const allProjectApi = async(searchKey,reqHeader)=>{
   return await commonApi("GET",`${SERVERURL}/all-projects?search=${searchKey}`,"",reqHeader)
   
}

//allProjectApi  called by view
export const userProjectApi = async(reqHeader)=>{
   return await commonApi("GET",`${SERVERURL}/user-projects`,"",reqHeader)
   
}

//deleteProjectApi called by view : "http://localhost:3000/pid/remove-project"
export const deleteProjectApi=async(pid,reqHeader)=>{
   return await commonApi("DELETE",`${SERVERURL}/${pid}/remove-projects`,{},reqHeader)
}



//editProjectApi called by edit : "http://localhost:3000/pid/edit-project"
export const editProjectApi=async(pid,reqBody,reqHeader)=>{
   return await commonApi("PUT",`${SERVERURL}/${pid}/edit-project`,reqBody,reqHeader)
}

//editProjectApi called by profile : put request to "http://localhost:3000/user/edit"
export const editUserApi=async(reqBody,reqHeader)=>{
   return await commonApi("PUT",`${SERVERURL}/${pid}/user/edit`,reqBody,reqHeader)
}









// import commonAPI from "./commonAPI"
// import SERVERURL from "./serverUrl"

// export const registerApi= async(reqBody)=>{
    
// return await commonAPI("POST",${SERVERURL}/register,reqBody)

// }

// //login called by auth
// export const loginAPI = async (reqBody)=>{
//     return await commonAPI("POST",${SERVERURL}/login,reqBody)
// }

// //addProject API called by Add
// export const addProjectAPI = async(reqBody,reqHeader)=>{
//     return await commonAPI("POST",${SERVERURL}/add-project,reqBody,reqHeader)
// }