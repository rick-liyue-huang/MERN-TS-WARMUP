import React from 'react';
import { SignupModal } from './components/SignupModal';
import { LoginModal } from './components/LoginModal';
import { NavbarComp } from './components/Navbar';
import { getLoggedInUser } from './network/user_api';
import { UserI } from './models/user';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import NotesPage from './pages/NotesPage';
import PrivacyPage from './pages/PrivacyPage';
import NotFoundPage from './pages/NotFoundPage';
import styles from './styles/App.module.css';

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
    <BrowserRouter>
      <div>
        <NavbarComp
          loggedInUser={loggedInUser}
          onLoginClicked={() => setShowLoginModal(true)}
          onSignupClicked={() => setShowSignupModal(true)}
          onLogoutClicked={() => setLoggedInUser(null)}
        />

        <Container className={styles.pageContainer}>
          <Routes>
            <Route
              path='/'
              element={<NotesPage loggedInUser={loggedInUser} />}
            />
            <Route path='/privacy' element={<PrivacyPage />} />
            <Route path='/*' element={<NotFoundPage />} />
          </Routes>
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
      </div>
    </BrowserRouter>
  );
}

export default App;
