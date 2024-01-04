import React from 'react';
import { UserI } from '../models/user';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { NavbarLoggedInView } from './NavbarLoggedInView';
import { NavbarLoggedOutView } from './NavbarLoggedOutView';

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
        <Navbar.Brand>MERN TS WARM UP</Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
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
