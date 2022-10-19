import React from 'react'
import { Link } from 'react-router-dom'
import "../css/Sidebar.css"
const Sidebar = () => {
  return (
        <>
    <div className='sidebar-container'>
        <div className='sidebar-items'>
          <ul className='sidebar-items-list'>
            <li className='sidebar-header'><h2>POPCORN</h2></li>
            <Link className='sidebar-btn' to="/addmovie"><li ><i className="fa-solid fa-plus"></i>&nbsp;&nbsp;&nbsp;Add Movie</li></Link>
            <Link className='sidebar-btn' to="/addwebseries"><li><i className="fa-solid fa-plus"></i>&nbsp;&nbsp;&nbsp;Add Webseries</li></Link>
            <Link className='sidebar-btn' to="/addepisode"><li><i className="fa-solid fa-plus"></i>&nbsp;&nbsp;&nbsp;Add Episodes</li></Link>
            <Link className='sidebar-btn' to="/addseason"><li><i className="fa-solid fa-plus"></i>&nbsp;&nbsp;&nbsp;Add Season</li></Link>
            <Link className='sidebar-btn' to="/addseason"><li><i className="fa-solid fa-image"></i>&nbsp;&nbsp;&nbsp;Change Carousel</li></Link>
            <Link className='sidebar-btn' to=""><li><i className="fa-solid fa-file-video"></i>&nbsp;&nbsp;&nbsp;Movies</li></Link>
            <Link className='sidebar-btn' to=""><li><i className="fa-solid fa-file-video"></i>&nbsp;&nbsp;&nbsp;Webseries</li></Link>
            <Link className='sidebar-btn' to=""><li><i className="fa-solid fa-user"></i>&nbsp;&nbsp;&nbsp;Add Admin</li></Link>
            <Link className='sidebar-btn' to=""><li><i className="fa-solid fa-unlock"></i>&nbsp;&nbsp;&nbsp;Change Password</li></Link>
          </ul>
        </div>
      </div>
    </>
  )
}

export default Sidebar