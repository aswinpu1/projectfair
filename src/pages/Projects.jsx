import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { Row,Col } from 'react-bootstrap'
import ProjectCard from '../components/ProjectCard'
import { allProjectApi } from '../sevice/allApi.JS'



const Projects = () => {


  const [searchKey,setSearchKey]=useState("")

const [allProjects,setAllProjects] =useState([])
useEffect(()=>{
  getAllProjects()
},[searchKey])
console.log(allProjects);

 const getAllProjects= async()=>{
const token =sessionStorage.getItem("token")
if(token){
  const reqHeader  = {
    "Content-Type":"application/json",
    "Authorization":`Bearer ${token}`
}
try {
  const result =await allProjectApi(searchKey,reqHeader)
  console.log(result);
  if(result.status==200){
setAllProjects(result.data)
  }else{
console.log(result.response.data);
}
  }
 catch (error) {
  console.log(err);
  
}
 }
}


  return (
    <>
    <Header/>
    <div style={{marginTop:'150px'}} className='container-fluid'>
      <div className='d-flex justify-content-between'>
        <h1 className=''>All Projects</h1>
        <input onChange={e=>setSearchKey(e.target.value)} placeholder='search projects by languages used' className='form-control w-25' type="text" />
      </div>
      <Row className='mt-3'>
        {
          allProjects?.length>0 ?
          allProjects?.map(project=>(
            <Col key={project?._id} className='mb-3' sm={12} md={6} lg={4}>
            <ProjectCard displayData={project}/>
            </Col>
          )
            
          ):
          <div className='fw-bolder text-danger m-5 text-center '>Project not found</div>
        }
      
      </Row>
    </div>
    </>
  )
}

export default Projects