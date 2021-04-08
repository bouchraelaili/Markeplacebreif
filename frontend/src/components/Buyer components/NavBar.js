import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import { Nav,NavDropdown } from 'react-bootstrap';



 const NavBar = () => {
		
        
    return (

    <div>
           
           <Navbar collapseOnSelect expand="lg"  style={{backgroundColor: "black",marginBottom:150}} variant="dark">
           <Navbar.Brand href="#home">
           </Navbar.Brand> 
     
  <Navbar.Brand href="#home">homeActive</Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="mr-auto">
      <Nav.Link href="#features">home</Nav.Link>
      <Nav.Link href="#pricing">home</Nav.Link>
      <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
        <NavDropdown.Item href="#action/3.1">home</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.2">home</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.3">home</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="#action/3.4">home</NavDropdown.Item>
      </NavDropdown>
    </Nav>
  </Navbar.Collapse>
</Navbar>   


    </div>
        
    )
}



export default NavBar;
