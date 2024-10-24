import React, { useEffect, useState } from 'react'
import landingimageai from '../assets/landingimageai.jpg'
import { Link, useNavigate } from 'react-router-dom'
import ProjectCard from '../components/ProjectCard'
import { Card } from 'react-bootstrap'
import { homeProjectApi } from '../sevice/allApi'





const Home = () => {



    const [allHomeProjects, setAllHomeProjects] = useState([])
    const navigate = useNavigate()

    console.log(allHomeProjects);

    useEffect(() => {
        getAllHomeProjects()
    }, [])

    const getAllHomeProjects = async () => {
        try {
            const result = await homeProjectApi()
            if (result.status == 200) {
                setAllHomeProjects(result.data)
            }
        } catch (err) {
            console.log(err);

        }
    }


    const handleProjects = () => {
        if (sessionStorage.getItem("token")) {
            navigate('/projects')
        } else {
            alert("please login to get full acces to the project!!!1")
        }
    }
    return (
        <>
            <div style={{ minHeight: "100vh" }} className="d-flex justify-content-center align-items-center rounded shadow w-100" >
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6">
                            <h1 style={{ fontSize: '80px' }}><i className="fa-brands fa-r-project"> </i> Project fair</h1>
                            <p style={{ textAlign: 'justify' }}>Loremjnefenffekfkckdjnrevjerjkvnjernvjrnevnereuvnuerenvuirenvnrevnrenvrenvnerevnerovnorenvorenviornevoionerehvfjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj vvvvvvvvvvvvvvvvvuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuubbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb</p>
                            {
                                sessionStorage.getItem("token") ?
                                    <Link to={'/dashboard'} className='btn btn-warning'>MANAGE YOUR PROJECTS</Link>
                                    :
                                    <Link to={'/login'} className='btn btn-warning'>START TO EXPLORE</Link>
                            }


                        </div>
                        <div className="col-lg-6">
                            <img className='img-fluid' src={landingimageai}></img>
                        </div>
                    </div>
                </div>
            </div>
            <div className="my-5 text-center">
                <h1 className="mb-5">
                    Explore Our Projects
                </h1>
                <marquee>
                    <div className="d-flex">
                        {
                            allHomeProjects?.length > 0 &&
                            allHomeProjects?.map(project =>
                                 { return(
                                    <div key={project?._id} className='me-5'>
                                    <ProjectCard displayData={project} />
                                </div>
                                 )
                                
                            })
                        }

                    </div>



                </marquee >
                <button onClick={handleProjects} className="btn btn-link mt-5"> CLICK HERE TO VIEW MORE PROJECTS..</button>

            </div >
            <div className="d-flex justify-content-evenly align-items-center flex-column">
                <h1>Our Testimonials</h1>
                <div className="d-flex justify-content-evenly align-items-center mt-3 w-100">
                    <Card style={{ width: '18rem' }}>

                        <Card.Body>
                            <Card.Title className='d-flex justify-content-center align-items-center flex-column'><img width={'60px'} height={'60px'} className='rounded-circle img-fluid' src="https://cdn-icons-png.flaticon.com/512/8345/8345328.png" alt="" /><span>Max Miller</span></Card.Title>
                            <Card.Text>
                                <div className="d-flex justify-content-center align-items-center">
                                    <i className="fa-solid fa-star text-warning"></i>
                                    <i className="fa-solid fa-star text-warning"></i>
                                    <i className="fa-solid fa-star text-warning"></i>
                                    <i className="fa-solid fa-star text-warning"></i>
                                    <i className="fa-solid fa-star text-warning"></i>
                                </div>
                                <p style={{ textAlign: 'justify' }}>Loremjnefenffekfkckdjnrevjerjkvnjernvjrnevnereuvnuerenvuirenvnrevnrenvrenvnerevnerovnorenvorenviornevoionere</p>
                            </Card.Text>

                        </Card.Body>
                    </Card>
                    <Card style={{ width: '18rem' }}>

                        <Card.Body>
                            <Card.Title className='d-flex justify-content-center align-items-center flex-column'><img width={'60px'} height={'60px'} className='rounded-circle img-fluid' src="https://cdn-icons-png.flaticon.com/512/8345/8345328.png" alt="" /><span>Max Miller</span></Card.Title>
                            <Card.Text>
                                <div className="d-flex justify-content-center align-items-center">
                                    <i className="fa-solid fa-star text-warning"></i>
                                    <i className="fa-solid fa-star text-warning"></i>
                                    <i className="fa-solid fa-star text-warning"></i>
                                    {/* <i className="fa-solid fa-star text-warning"></i>
                                    <i className="fa-solid fa-star text-warning"></i> */}
                                </div>
                                <p style={{ textAlign: 'justify' }}>Loremjnefenffekfkckdjnrevjerjkvnjernvjrnevnereuvnuerenvuirenvnrevnrenvrenvnerevnerovnorenvorenviornevoionere</p>
                            </Card.Text>

                        </Card.Body>
                    </Card>
                    <Card style={{ width: '18rem' }}>

                        <Card.Body>
                            <Card.Title className='d-flex justify-content-center align-items-center flex-column'><img width={'60px'} height={'60px'} className='rounded-circle img-fluid' src="https://cdn-icons-png.flaticon.com/512/8345/8345328.png" alt="" /><span>Max Miller</span></Card.Title>
                            <Card.Text>
                                <div className="d-flex justify-content-center align-items-center">
                                    <i className="fa-solid fa-star text-warning"></i>
                                    <i className="fa-solid fa-star text-warning"></i>
                                    <i className="fa-solid fa-star text-warning"></i>
                                    <i className="fa-solid fa-star text-warning"></i>
                                    {/* <i className="fa-solid fa-star text-warning"></i> */}
                                </div>
                                <p style={{ textAlign: 'justify' }}>Loremjnefenffekfkckdjnrevjerjkvnjernvjrnevnereuvnuerenvuirenvnrevnrenvrenvnerevnerovnorenvorenviornevoionere</p>
                            </Card.Text>

                        </Card.Body>
                    </Card>


                </div>
            </div>

        </>
    )
}

export default Home