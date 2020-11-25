import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'
import { logout } from '../actions/user'
import myPhoto from '../img/apple-icon-120x120.png'

const Navbar = () => {

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const dispatch = useDispatch()

    const logoutHandler = () => {
        dispatch(logout())
    }

    return (
        <>
        <nav className="navbar navbar-expand-sm p-0 navbar-light">
           <div className="container nav-container">
             <a href="/" className="navbar-brand">
                 <img src={myPhoto} className="img-fliud rounded-circle logo-img" width="50" />
                 <p className="d-inline ml-3 text-dark">Social App</p>
             </a>
             <button className="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
                 <span className="navbar-toggler-icon"></span>
             </button>
             <div className="navbar-collapse collapse" id="navbarCollapse">
                 <ul className="navbar-nav ml-auto">
                 {userInfo && userInfo.user && (
                         <>
                         <NavLink to="/newsfeeds" className="nav-item nav-link mx-2"><i className="fas fa-home"></i></NavLink>
                         <li className="nav-item dropdown">
                                 <a href="#" className="nav-link dropdown-toggle text-white mx-2" data-toggle="dropdown"> <img src={userInfo.user.avatar} className="img-fluid rounded-circle" width="25" style={{ height: "1.5rem" }} /> </a>
                                <div className="dropdown-menu">
                                    <Link to="/profile" className="dropdown-item"><i className="far fa-user-circle px-2"></i>Profile</Link>
                                    <Link to="/edit-profile" className="dropdown-item"><i className="fas fa-cog px-2"></i>Settings</Link>
                                    <hr />
                                    <Link onClick={logoutHandler} to="/" className="dropdown-item text-center">Logout</Link>
                                </div>
                             </li>
                        </>
                     )}
                 </ul>
             </div>
           </div> 
        </nav>
        </>
    )
}

export default Navbar




