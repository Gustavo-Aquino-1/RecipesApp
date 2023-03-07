import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { getItem } from '../services/LocalStorageFuncs';

function Profile() {
  const [email, setEmail] = useState('');

  useEffect(() => {
    setEmail(getItem('user') ? getItem('user').email : '');
  }, []);
  const { push } = useHistory();

  const handleCLickLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('doneRecipes');
    localStorage.removeItem('favoriteRecipes');
    localStorage.removeItem('inProgressRecipes');
    push('/');
  };

  return (
    <section style={{ textAlign:'center' }}>
      <Header />
      {/* <p data-testid="profile-email">{email}</p> */}
      <button
        type="button"
        data-testid="profile-done-btn"
        onClick={ () => push('/done-recipes') }
      >
        Done Recipes
      </button>
      <button
        type="button"
        data-testid="profile-favorite-btn"
        onClick={ () => push('/favorite-recipes') }
      >
        Favorite Recipes
      </button>
      <button
        type="button"
        data-testid="profile-logout-btn"
        onClick={ handleCLickLogout }
      >
        Logout
      </button>
      <Footer />
    </section>
  );
}

export default Profile;
