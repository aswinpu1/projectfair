import React, { useEffect, useState } from 'react'
import ProjectCard from '../components/ProjectCard'
import Header from '../components/Header'
import { Col, Row } from 'react-bootstrap'
import { allProjectApi } from '../sevice/allApi'


const Projects = () => {

  const [allProjects,setAllProjects]=useState([])
  useEffect(()=>{
    getAllProjects()
  },[])
  console.log(allProjects);


  const getAllProjects = async()=>{
    const token =sessionStorage.getItem("token")
    if(token){
      const reqHeader={
        "Content-Type":"application/json",
        "Authorization":`Bearer ${token}`
      }
      try {
        const result = await allProjectApi(reqHeader)
        console.log(result);
        if(result.status==200){
          setAllProjects(result.data)
        }else{
          console.log(result.response.data);
          
        }
        
      } catch (err) {
        console.log(err);
        
      }
    }
  }
  

  return (
    <>
      <Header />
      <div style={{ marginTop: "150px" }} className="container-fluid">
        <div className="d-flex justify-content-between">
          <h1>All projects</h1>
          <input placeholder='Search projects by Languages Used!' className='form-control w-25' type="text" />

        </div>
        <Row className="mt-3">
          {
            allProjects?.length>0?
            allProjects?.map(Project=>(
              <Col className="mb-3" sm={12} md={6} ld={4}>
            <ProjectCard displayData={Project} />
            </Col>
            ))
            :
            <div className='fw-bolder text-danger m-5 text-cneter'>Project not found!!!</div>

          }
        </Row>

      </div>
    </>
  )
}

export default Projects