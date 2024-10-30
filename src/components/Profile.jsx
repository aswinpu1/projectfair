
import React,{useEffect, useState} from 'react'
import { Collapse } from 'react-bootstrap'
import uploadingimg from '../assets/upimg2.png'
import SERVERURL from '../sevice/seviceUrl'
import { editUserApi } from '../sevice/allApi'
import { json } from 'react-router-dom'


const Profile = () => {
  const[preview,setPreview]=useState("")
  const[existingUserImg,setExistingUserImg]=useState("")

  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    github:"",
    linkedin:"",
    profilepic:""  
  })

  const[open,setOpen]=useState(false)

useEffect(()=>{
  if(sessionStorage.getItem("user")){
    const existingUserDetails = JSON.parse(sessionStorage.getItem("user"))
    setUserData({...userData,username:existingUserDetails.username,email:existingUserDetails.email,password:existingUserDetails.password,github:existingUserDetails.github,linkedin:existingUserDetails.linkedin})
    setExistingUserImg(existingUserDetails.profilepic)
  }
},[open])




useEffect(()=>{
  if(userData.profilepic){
   setPreview(URL.createObjectURL(userData.profilepic))
  }else{
    setPreview("")
  }
},[userData.profilepic])


const handleUpdateProfile= async()=>{
  const {username,email,password,github,linkedin,profilepic}=userData
  if(github && linkedin){
    const reqBody = new FormData()
    reqBody.append("username",username)
    reqBody.append("email",email)
    reqBody.append("password",password)
    reqBody.append("github",github)
    reqBody.append("linkedin",linkedin)
    preview ? reqBody.append("profilepic",profilepic):reqBody.append("profilepic",existingUserImg)
    const token = sessionStorage.getItem("token")
      if (token) {
        const reqHeader = {
          "Content-Type": preview ? "multipart/form-data" : "application/json",
          "Authorization": `Bearer ${token}`
        }
        //api call
        try {
          const result = await editUserApi(reqBody,reqHeader)
          if(result.status==200){
            sessionStorage.setItem("user",JSON.stringify(result.data))
            setOpen(!open)
          }else{
            console.log(result);     
          }
        } catch (err) {
          console.log(err);       
        }
      }
  }else{
    alert("please fill the form completely")
  }
}
  return (
   <>

   <div className="d-flex justify-content-evenly">
    <h3 className="text-warning">Profile</h3>
    <buttton onClick={()=>setOpen(!open)} className="btn text-warning fw-bolder"><i className='fa-solid fa-chevron-down'></i></buttton>
   </div>
   <Collapse in={open}>
       <div className="row align-items-center justify-content-center shadow rounded p-2" id='example-collapse-text'>
        <label  className="text-center mb-2">
          <input onChange={e=>setUserData({...userData,profilepic:e.target.files[0]})} style={{display:'none'}} type="file"/>
          {
existingUserImg==""?
<img width={'200px'} height={'200px'} className='rounded-circle' src={preview?preview:uploadingimg} alt="" />
:

<img width={'200px'} height={'200px'} className='rounded-circle' src={preview?preview:`${SERVERURL}/uploads/${existingUserImg}`} alt="" />

          }
          
        </label>
        <div className="mb-2">
          <input onChange={e=>setUserData({...userData,github:e.target.value})} value={userData.github} placeholder='GITHUB-URL' type="text" className='form-control' />
        </div>
        <div className="mb-2">
          <input onChange={e=>setUserData({...userData,linkedin:e.target.value})} value={userData.linkedin} placeholder='LINKEDIN URL' type="text" className='form-control' />
        </div>
        <div className="d-grid">
          <button onClick={handleUpdateProfile} className="btn btn-warning">Update profile</button>
        </div>
       </div>
      </Collapse>
   </>
  )
}

export default Profile