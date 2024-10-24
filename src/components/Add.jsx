import React, { useContext, useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import profilepicupld from '../assets/profilepicupld.png'
import { addProjectApi } from '../sevice/allApi'
import { addResponseContext } from '../contexts/ContextShare'





const Add = () => {
  const {addResponse,setAddResponse}=useContext(addResponseContext)
  const [imageFileStatus, SetImageFileStatus] = useState(false)
  const [preview, setPreview] = useState(profilepicupld)
  const [projectData, setProjectData] = useState({
    title: "", languages: "", overview: "", github: "", website: "", projectimg: ""
  })
  console.log(projectData);



  // const Add = () => {
  //   const[projectData,setProjectData]=useState({
  //     title:"",languages:"",overview:"",github:"",website:"",projectImg:""
  //   })
  //   console.log(projectData);



  const [show, setShow] = useState(false);
  useEffect(() => {
    if (projectData.projectimg.type == "image/png" || projectData.projectimg.type == "image/jpg" || projectData.projectimg.type == "image/jpeg") {
      SetImageFileStatus(true)
      setPreview(URL.createObjectURL(projectData.projectimg))
    } else {
      SetImageFileStatus(false)
      setPreview(profilepicupld)
      setProjectData({ ...projectData, projectimg: "" })
    }
  }, [projectData.projectimg])

  const handleClose = () => {
    setShow(false);
    setProjectData({ title: "", languages: "", overview: "", github: "", website: "", projectimg: "" })

  }
  const handleShow = () => setShow(true);

  const handleSaveProject = async() => {
    const { title, languages, overview, github, website, projectimg } = projectData
    if (title && languages && overview && github && website && projectimg) {
      //api call - post request    
      const reqBody = new FormData()
      reqBody.append("title", title)
      reqBody.append("languages", languages)
      reqBody.append("overview", overview)
      reqBody.append("github", github)
      reqBody.append("website", website)
      reqBody.append("projectimg", projectimg)
      const token = sessionStorage.getItem("token")
      if (token) {
        const reqHeader = {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}`
        }
        //api call-post request
        try {
          const result = await addProjectApi(reqBody, reqHeader)
          console.log(result);
          if (result.status == 200) {
            handleClose()
            // alert("project Added succesfully!!")
            //share result via context
            setAddResponse(result)
          } else {
            alert(result.response.data)
          }
        } catch (err) {
          console.log(err);

        }
      }

    } else {
      alert("please fill the form completely")
    }
  }



  return (
    <>
      <button onClick={handleShow} className="btn btn-primary"> <i className="fa-solid fa-plus"></i>New Project</button>
      <Modal size='lg'
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>New project details!!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row align-items-center">
            <div className="col-lg-4">
              <label >
                <input onChange={e => setProjectData({ ...projectData, projectimg: e.target.files[0] })} style={{ display: 'none' }} type="file" />
                <img height={'100px'} width={'200px'} className='img-fluid' src={preview} alt="" />
              </label>
              {
                !imageFileStatus && <div className="text-warning fw-bolder my-2">*Upload ony the following types(jpeg,jpg,png)here!!</div>

              }
            </div>



            {/* <input onChange={e=>setProjectData({...projectData,projectImg:e.target.files[0]})} style={{display:'none'}} type="file" />
            <img height={'100px'} width={'200px'} className='img-fluid' src={preview} alt="" />
           </label>
          { !imageFileStatus && <div className='text-danger fw-bolder my-2' >Upload only the following file types(jpeg,jpg,png)</div>}
          </div> */}




            <div className="col-lg-8">
              <div className="mb-2">
                <input value={projectData.title} onChange={e => setProjectData({ ...projectData, title: e.target.value })} placeholder='project-title' type="text" className="form-control" />
              </div>
              <div className="mb-2">
                <input value={projectData.languages} onChange={e => setProjectData({ ...projectData, languages: e.target.value })} placeholder='langiages used in project' type="text" className="form-control" />
              </div>
              <div className="mb-2">
                <input value={projectData.overview} onChange={e => setProjectData({ ...projectData, overview: e.target.value })} placeholder='project overview' type="text" className="form-control" />
              </div>
              <div className="mb-2">
                <input value={projectData.github} onChange={e => setProjectData({ ...projectData, github: e.target.value })} placeholder='project-github link' type="text" className="form-control" />
              </div>
              <div className="mb-2">
                <input value={projectData.website} onChange={e => setProjectData({ ...projectData, website: e.target.value })} placeholder='project-websitelink' type="text" className="form-control" />
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSaveProject} >Add</Button>
        </Modal.Footer>
      </Modal>

    </>
  )
}

export default Add