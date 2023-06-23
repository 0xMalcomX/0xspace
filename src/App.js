import React, { useEffect } from 'react';
import DiscoveryPage from './components/DiscoveryPage';
import CreateTweetPage from './components/CreateTweetPage';
import Credits from './components/Credits';
import Followers from './components/Followers';

import axios from 'axios';

const TWITTER_API_URL = 'http://localhost:3000/api';
const clientID = 'RFlUZlRUeW14aFdneEFhczRnMHQ6MTpjaQ';
const clientSecret = '-TJVuB8r8vrUD2rW_aEt76oP8lSXsCgDM8bUjq-YVY3djOOv_H';


const handleTwitterAuthClick = async () => {
  try {
    const response = await axios.get(`${TWITTER_API_URL}/auth/twitter`, {
      params: {
        clientID,
        clientSecret,
      },
    });

    window.location.href = response.data.redirectUrl;
  } catch (error) {
    console.error('Twitter authentication error:', error);
  }
};

const handleTwitterAuthCallback = async () => {
  try {
    const response = await axios.get(`${TWITTER_API_URL}/auth/twitter/callback`);

    console.log('Authenticated with Twitter:', response.data);
    // Esegui le operazioni necessarie dopo l'autenticazione con Twitter
  } catch (error) {
    console.error('Twitter authentication error:', error);
  }
};

const App = () => {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get('accessToken');

    if (accessToken) {
      handleTwitterAuthCallback();
    }
  }, []);

  return (
    <div className="App">
      <DiscoveryPage />
      <CreateTweetPage />
      <Followers />
      <Credits />
      <button onClick={handleTwitterAuthClick}>Sign In with Twitter</button>
    </div>
  );
};

export default App;
