import React from 'react';
import { UserI } from '../models/user';

interface NavbarProps {
  loggedInUser: UserI | null;
  onSignupClicked: () => void;
  onLoginClicked: () => void;
  onLogoutClicked: () => void;
}

export const Navbar = ({
  loggedInUser,
  onSignupClicked,
  onLoginClicked,
  onLogoutClicked,
}: NavbarProps) => {
  return <div>Navbar</div>;
};
