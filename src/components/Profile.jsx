
import React,{useState} from 'react'
import { Collapse } from 'react-bootstrap'
import uploadingimg from '../assets/upimg2.png'


const Profile = () => {
  const[open,setOpen]=useState(false)
  return (
   <>

   <div className="d-flex justify-content-evenly">
    <h3 className="text-warning">Profile</h3>
    <buttton onClick={()=>setOpen(!open)} className="btn text-warning fw-bolder"><i className='fa-solid fa-chevron-down'></i></buttton>
   </div>
   <Collapse in={open}>
       <div className="row align-items-center justify-content-center shadow rounded p-2" id='example-collapse-text'>
        <label  className="text-center mb-2">
          <input style={{display:'none'}} type="file"/>
          <img width={'200px'} className='rounded-circle' src={uploadingimg} alt="" />
        </label>
        <div className="mb-2">
          <input placeholder='GITHUB-URL' type="text" className='form-control' />
        </div>
        <div className="mb-2">
          <input placeholder='LINKEDIN URL' type="text" className='form-control' />
        </div>
        <div className="d-grid">
          <button className="btn btn-warning">Update profile</button>
        </div>
       </div>
      </Collapse>
   </>
  )
}

export default Profile