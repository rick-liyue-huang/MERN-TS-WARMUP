import React from 'react';
import { Container } from 'react-bootstrap';
import styles from './styles/NotesPage.module.css';
import { SignupModal } from './components/SignupModal';
import { LoginModal } from './components/LoginModal';
import { NavbarComp } from './components/Navbar';
import { NotesPageWithLoggedIn } from './components/NotesPageWithLoggedIn';
import { getLoggedInUser } from './network/user_api';
import { UserI } from './models/user';
import { NotesPageWithLoggedOut } from './components/NotesPageWithLoggedOut';

function App() {
  const [loggedInUser, setLoggedInUser] = React.useState<UserI | null>(null);
  const [showSignupModal, setShowSignupModal] = React.useState(false);
  const [showLoginModal, setShowLoginModal] = React.useState(false);

  React.useEffect(() => {
    async function fetchLoggedInUser() {
      try {
        const user = await getLoggedInUser();
        setLoggedInUser(user);
      } catch (err) {
        console.log(err);
      }
    }

    fetchLoggedInUser();
  }, []);

  return (
    <>
      <NavbarComp
        loggedInUser={loggedInUser}
        onLoginClicked={() => setShowLoginModal(true)}
        onSignupClicked={() => setShowSignupModal(true)}
        onLogoutClicked={() => setLoggedInUser(null)}
      />
      <Container className={styles.notesPage}>
        <>
          {loggedInUser ? (
            <NotesPageWithLoggedIn />
          ) : (
            <NotesPageWithLoggedOut />
          )}
        </>
      </Container>
      {showSignupModal && (
        <SignupModal
          onDismiss={() => setShowSignupModal(false)}
          onSignupSuccessfully={(user) => {
            setLoggedInUser(user);
            setShowSignupModal(false);
          }}
        />
      )}
      {showLoginModal && (
        <LoginModal
          onDismiss={() => setShowLoginModal(false)}
          onLoginSuccessfully={(user) => {
            setLoggedInUser(user);
            setShowLoginModal(false);
          }}
        />
      )}
    </>
  );
}

export default App;
