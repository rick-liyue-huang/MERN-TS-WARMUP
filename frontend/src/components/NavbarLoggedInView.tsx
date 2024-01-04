import React from 'react';
import { UserI } from '../models/user';
import { logout } from '../network/user_api';
import { Button, Navbar } from 'react-bootstrap';

interface NavbarLoggedInViewProps {
  user: UserI;
  onLogoutClicked: () => void;
}

export const NavbarLoggedInView = ({
  user,
  onLogoutClicked,
}: NavbarLoggedInViewProps) => {
  async function handleLogout() {
    try {
      await logout();
      onLogoutClicked();
    } catch (err) {
      console.log(err);
      alert('Error logging out');
    }
  }
  return (
    <>
      <Navbar.Text className='me-2'>Signed in as: {user.username}</Navbar.Text>
      <Button onClick={handleLogout}>Log out</Button>
    </>
  );
};
