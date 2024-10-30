import React, { useState, useEffect, useContext } from 'react'
import { Button, Modal } from 'react-bootstrap'
import profilepicupld from '../assets/profilepicupld.png'
import SERVERURL from '../sevice/seviceUrl'
import { editResponseContext } from '../contexts/ContextShare'
import { editProjectApi } from '../sevice/allApi'



const Edit = ({ project }) => {
  const {editResponse,SetEditResponse} = useContext(editResponseContext)

  const [imageFileStatus, SetImageFileStatus] = useState(false)


  const [preview, setPreview] = useState("")

  const [projectData, setProjectData] = useState({
    id: project?._id, title: project?.title, languages: project?.languages, overview: project?.overview, github: project?.github, website: project?.website, projectimg: ""
  })


  console.log(projectData);


  useEffect(() => {
    if (projectData.projectimg.type == "image/png" || projectData.projectimg.type == "image/jpg" || projectData.projectimg.type == "image/jpeg") {
      SetImageFileStatus(true)
      setPreview(URL.createObjectURL(projectData.projectimg))
    } else {
      SetImageFileStatus(false)
      setPreview("")
      setProjectData({ ...projectData, projectimg: "" })
    }
  }, [projectData.projectimg])




  const [show, setShow] = useState(false);





  const handleClose = () => {
    setShow(false);

    setProjectData({
      id: project?._id, title: project?.title, languages: project?.languages, overview: project?.overview, github: project?.github, website: project?.website, projectimg: ""
    })
  }

  const handleShow = () => {
    setShow(true);

    setProjectData({  //used :not to change the value or data in the text before clicking the update button
      id: project?._id, title: project?.title, languages: project?.languages, overview: project?.overview, github: project?.github, website: project?.website, projectimg: ""
    })
  }




  const handleUpdateProject = async () => {
    const { id, title, languages, overview, github, website, projectimg } = projectData
    if (title && languages && overview && github && website) {
      //api call

      const reqBody = new FormData()
      reqBody.append("title", title)
      reqBody.append("languages", languages)
      reqBody.append("overview", overview)
      reqBody.append("github", github)
      reqBody.append("website", website)
      preview ? reqBody.append("projectimg", projectimg) : reqBody.append("projectimg", project?.projectimg)
      const token = sessionStorage.getItem("token")
      if (token) {
        const reqHeader = {
          "Content-Type": preview ? "multipart/form-data" : "application/json",
          "Authorization": `Bearer ${token}`
        }
        //api call - put request


        try {
          const result = await editProjectApi(id, reqBody, reqHeader)
          if (result.status == 200) {
            alert("project updated sucesfully")
            handleClose()
            SetEditResponse(result)
          } else {
            console.log(result);

          }
        } catch (err) {
          console.log(err);
        }
      }

      } else {
        alert("please fill the form completely")
      }
    }
  //error in this place
  return (
    <>
      <button onClick={handleShow} className="btn "> <i className="fa-solid fa-edit"></i></button>
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
                <img height={'100px'} width={'200px'} className='img-fluid' src={preview ? preview : `${SERVERURL}/uploads}/${project?.projectimg}`} alt="" />
              </label>
              {
                !imageFileStatus && <div className="text-warning fw-bolder my-2">*Upload ony the following types(jpeg,jpg,png)here!!</div>

              }
            </div>







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
          <Button onClick={handleUpdateProject} variant="primary">Update</Button>
        </Modal.Footer>
      </Modal>

    </>
  )
}

export default Edit