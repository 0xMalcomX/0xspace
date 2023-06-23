import React, { useState } from 'react';
import axios from 'axios';

const Followers = () => {
  const [followers, setFollowers] = useState([]);

  const handleFollowBack = async (follower) => {
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/users/follow`, { follower });
      // Aggiorna l'array dei followers utilizzando setFollowers()
    } catch (error) {
      console.error('Error following back:', error);
    }
  };
  

  return (
    <div>
      <h2>Followers</h2>
      {followers.length > 0 ? (
        <ul>
          {followers.map((follower, index) => (
            <li key={index}>
              {follower.name} - {follower.username}
              <button onClick={() => handleFollowBack(follower)}>Follow Back</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No followers yet</p>
      )}
    </div>
  );
};

export default Followers;
