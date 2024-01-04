import React from 'react';
import { Button } from 'react-bootstrap';

interface NavbarLoggedOutViewProps {
  onLoginClicked: () => void;
  onSignupClicked: () => void;
}
export const NavbarLoggedOutView = ({
  onLoginClicked,
  onSignupClicked,
}: NavbarLoggedOutViewProps) => {
  return (
    <>
      <Button onClick={onSignupClicked}>Sign Up</Button>
      <Button onClick={onLoginClicked}>Login</Button>
    </>
  );
};
