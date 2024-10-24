import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import View from '../components/View'
import Profile from '../components/Profile'
import { Row } from 'react-bootstrap'
const Dashbooard = () => {
  
  const [username,setUsername] = useState("")

useEffect(()=>{
  if(sessionStorage.getItem("user")){
    setUsername(JSON.parse(sessionStorage.getItem("user")).username)
  }else{
    setUsername("")
  }
},[])

  return (
    <>

      <Header insideDashboard={true} />
      <Row style={{ marginTop: "100px" }} className='container-fluid'>
        <div className="row mt-3">
          <div className="col-lg-8">
            <h1>Welcome<span className='text-warning'> {username}</span>,</h1>
            <View />
          </div>
          <div className="col-lg-4">
            <Profile />
          </div>
        </div>
      </Row>
    </>
  )
}

export default Dashbooard