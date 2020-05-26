import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";

import AuthService from "../services/auth.service";
import SearchBook from './SearchBook';

const NavBar = () => {
    const [showModeratorBoard, setShowModeratorBoard] = useState(false)
    const [showAdminBoard, setShowtAdminBoard] = useState(false)
    const [currentUser, setCurrentUser] = useState()

    useEffect(() => {
        const user = AuthService.getCurrentUser();

        if (user) {
            setCurrentUser(AuthService.getCurrentUser())
            setShowtAdminBoard(user.roles.includes("ROLE_ADMIN"))
            setShowModeratorBoard(user.roles.includes("ROLE_MODERATOR"))

        }
    }, [])

    const logOut = () => {
        AuthService.logout();
    }

    return (
        <nav className="navbar navbar-expand navbar-dark bg-dark">
            <Link to={AuthService.getCurrentUser() && AuthService.getCurrentUser().roles.includes("ROLE_ADMIN") ? "/books/all/admin" : "/"} className="navbar-brand">
                GoodReads
            </Link>
            <div className="navbar-nav mr-auto">
                
                {currentUser && (
                    <>
                                        
                    <li className="nav-item">
                        <Link to={currentUser.roles.includes("ROLE_ADMIN") ? "/books/all/admin" : "/books/all/"} className="nav-link">
                            Books
                        </Link>
                    </li>

                    <li className="nav-item">
                        <Link to={currentUser.roles.includes("ROLE_ADMIN") ? "/categories" : "/categories/all"} className="nav-link">
                            Categories
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to={currentUser.roles.includes("ROLE_ADMIN") ? "/authors" : "/authors/:id"} className="nav-link">Authors</Link>
                    </li>
                    </>
                )}
            </div>

            {currentUser ? (
                <div className="navbar-nav ml-auto">
                    {!currentUser.roles.includes('ROLE_ADMIN') &&
                        <li className="nav-item">
                            <SearchBook/>
                        </li>
                    }
                    <li className="nav-item">
                        <Link to={"/profile"} className="nav-link">
                            {currentUser.username}
                        </Link>
                    </li>
                    <li className="nav-item">
                        <a href="/login" className="nav-link" onClick={logOut}>
                            Logout
                        </a>
                    </li>
                </div>
            ) : (
                    <div className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link to={"/login"} className="nav-link">
                                Login
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to={"/register"} className="nav-link">
                                Sign Up
                            </Link>
                        </li>
                    </div>
                )}
        </nav>

    )
}
export default NavBar