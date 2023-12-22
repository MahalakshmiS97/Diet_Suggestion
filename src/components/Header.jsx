import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Button } from 'react-bootstrap';
import useLogout from '../hooks/useLogout';

function Header() {
    let userData = JSON.parse(sessionStorage.getItem('userData'))
    let logout = useLogout()
  return (
   
      <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand className='App'>Diet Suggestion App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto header-nav-items pointer">
            <Nav.Item><h4 className='welocme'>{`Welcome ${userData.Name}!!`}</h4></Nav.Item>
            <Nav.Item onClick={logout}><Button variant='danger'>Logout</Button></Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header
