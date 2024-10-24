import React, { useState } from 'react'
import login from '../assets/login2.png'
import { FloatingLabel, Form, Spinner } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { loginApi, registerApi } from '../sevice/allApi'


const Auth = ({ insideRegister }) => {
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: ""
  })
  // console.log(userData);
  const handleRegister = async (e) => {
    e.preventDefault()
    if (userData.username && userData.email && userData.password) {
      //apicall
      try {
        const result = await registerApi(userData)
        console.log(result);
        if (result.status == 200) {
          alert(`welcome ${result?.data?.username}....please login to explore our website`)
          setUserData({ username: "", email: "", password: "" })
          navigate('/login')
        } else {
          if (result.response.status == 406) {
            alert(result.response.data)
            setUserData({ username: "", email: "", password: "" })
          }
        }
      
      } catch (err) {
        console.log(err);

      }
    } else {
      alert("please fill the form completely!!")
    }

  }

  const handleLogin = async (e) => {
    e.preventDefault()
    if (userData.email && userData.password) {
      //api call
      try {
        const result = await loginApi(userData)
        console.log(result);
        if (result.status == 200) {
          sessionStorage.setItem("user", JSON.stringify(result.data.user))
          sessionStorage.setItem("token", result.data.token)
          setIsLoading(true)
          setTimeout(() => {
            setUserData({ username: "", email: "", password: "" })
            navigate('/')
            setIsLoading(false)
          }, 2000);

        } else {
          if (result.response.status == 404) {
            alert(result.response.data)
          }
        }

      } catch (err) {
        console.log(err);

      }
    } else {
      alert("please fill the form completely")
    }
  }
  return (
    <div style={{ width: '100%', height: '100vh' }} className='d-flex justify-content-center align-items-center'>
      <div className="w-75 container">
        <div className="card shadow p-2">
          <div className="row align-items-center">
            <div className="col-lg-6 p-2">
              <img src={login} alt="" className='w-100' />
            </div>
            <div className="col-lg-6">
              <h1 style={{ fontSize: '40px' }}><i className="fa-brands fa-docker me-2"></i>Project Fair</h1>
              <h5 className='fw-bolder'>Sign {insideRegister ? "Up" : "In"} to your Account</h5>
              <Form>
                {
                  insideRegister &&
                  <FloatingLabel
                    controlId="floatingName"
                    label="Username"
                    className="mb-3"
                  >
                    <Form.Control value={userData.username} onChange={e => setUserData({ ...userData, username: e.target.value })} type="text" placeholder="Username" />
                  </FloatingLabel>
                }
                <FloatingLabel
                  controlId="floatingInput"
                  label="Email address"
                  className="mb-3"
                >
                  <Form.Control value={userData.email} onChange={e => setUserData({ ...userData, email: e.target.value })} type="email" placeholder="name@example.com" />
                </FloatingLabel>
                <FloatingLabel controlId="floatingPassword" label="Password">
                  <Form.Control value={userData.password} onChange={e => setUserData({ ...userData, password: e.target.value })} type="password" placeholder="Password" />
                </FloatingLabel>
                {
                  insideRegister ?
                    <div className="mt-3">
                      <button onClick={handleRegister} className='btn btn-warning mb-2 ' >Register</button>
                      <p >Already have an account? Click here to <Link to={'/login'}>Login</Link></p>
                    </div>
                    :
                    <div className="mt-3">
                      <button onClick={handleLogin} className='btn btn-warning mb-2 ' >login {isLoading && <Spinner animation="border" variant="light" />}   </button>
                      <p >New user? Click here to <Link to={'/register'}>Register</Link></p>
                    </div>
                }

              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Auth
