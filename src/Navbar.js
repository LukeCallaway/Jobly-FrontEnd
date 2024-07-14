import React, { useContext } from "react";
import "./Navbar.css";
import { NavLink } from "react-router-dom";
import { Navbar, Nav, NavItem } from "reactstrap";
import UserContext from "./UserContext";

function NavBar({ doLogout }) {
  const currUser = useContext(UserContext)
  return (
    <div>
      <Navbar expand="md">
        <NavLink to="/" className="navbar-brand">
          Jobly
        </NavLink>
        
        <Nav className="ml-auto" navbar>
          {!currUser.username ? 
          <>
          <NavItem>
            <NavLink to="/signup">Sign Up</NavLink>
          </NavItem> 

          <NavItem>
            <NavLink to="/login">Log In</NavLink>
          </NavItem> 
          </>
          :
          <>
          <NavItem>
            <NavLink to="/profile">{currUser.username}</NavLink>
          </NavItem> 

          <NavItem>
            <NavLink to="/companies">Companies</NavLink>
          </NavItem>

          <NavItem>
            <NavLink to="/jobs">Jobs</NavLink>
          </NavItem> 

          <NavItem>
            <button onClick={doLogout} className="logout-btn">Log Out</button>
          </NavItem>
          </>
        }
              
        </Nav>
      </Navbar>
    </div>
  );
}

export default NavBar;