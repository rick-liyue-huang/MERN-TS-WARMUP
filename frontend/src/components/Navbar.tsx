import React from 'react';
import { UserI } from '../models/user';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { NavbarLoggedInView } from './NavbarLoggedInView';
import { NavbarLoggedOutView } from './NavbarLoggedOutView';
import { Link } from 'react-router-dom';

interface NavbarProps {
  loggedInUser: UserI | null;
  onSignupClicked: () => void;
  onLoginClicked: () => void;
  onLogoutClicked: () => void;
}

export const NavbarComp = ({
  loggedInUser,
  onSignupClicked,
  onLoginClicked,
  onLogoutClicked,
}: NavbarProps) => {
  return (
    <Navbar bg='primary' variant='dark' expand='sm' sticky='top'>
      <Container>
        <Navbar.Brand as={Link} to='/'>
          MERN TS WARM UP
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav>
            <Nav.Link as={Link} to='/'>
              Home
            </Nav.Link>
            <Nav.Link as={Link} to='/privacy'>
              Privacy
            </Nav.Link>
          </Nav>
          <Nav className='ms-auto'>
            {loggedInUser ? (
              <NavbarLoggedInView
                user={loggedInUser}
                onLogoutClicked={onLogoutClicked}
              />
            ) : (
              <NavbarLoggedOutView
                onLoginClicked={onLoginClicked}
                onSignupClicked={onSignupClicked}
              />
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
