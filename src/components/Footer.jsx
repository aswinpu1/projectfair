
const Footer = () => {
    return (
      <div className=" shadow">
        <div className="row mt-3">
          <div className="col-md-4 mt-4">
            <h5 style={{ color: "white" }} className="ms-5 mb-1"><i className="fa-brands fa-r-project"> </i> Project fair</h5>
            <p className="ms-5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores, fugit. Quidem hic, dolor autem repellat ut illum at beatae </p><br />
            <p className="ms-5">Code licenced by luminar@cc</p><br />
            <p className="ms-5">Currently dnfjisf</p>
  
          </div>
          <div className="col-md-2 mt-4 ">
            <h5 className="mb-1">link</h5>
            <p className="fw-2 mb-1">Home </p>
            <p className="fw-2 mb-1">login </p>
            <p className="fw-2 mb-1">Register </p>
          </div>
          <div className="col-md-2 mt-4">
  
            <h5 className="mb-1">Guides</h5>
            <p className="fw-2 mb-1">React</p>
            <p className="fw-2 mb-1">React bootstrap</p>
            <p className="fw-2 mb-1">React Router</p>
          </div>
          <div className="col-md-4 mt-4">
            <h5 className="mb-1">Contacts</h5>
            <form className="d-flex" role="search">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
              <button className="btn btn-outline-success" type="submit">Search</button>
            </form><br />
            <i className="fa-brands fa-instagram ms-2"></i>
            <i className="fa-brands fa-twitter ms-4"></i>
            <i className="fa-brands fa-facebook ms-4"></i>
            <i className="fa-brands fa-linkedin ms-4"></i>
            <i className="fa-brands fa-phone ms-4"></i>
            <i className="fa-brands fa-github ms-4"></i>
           
  
          </div>
          <h6 className="text-center mt-5">&copy;Designed and developed by Aswin</h6>
        </div>
      </div>
    )
  }
  
  export default Footer