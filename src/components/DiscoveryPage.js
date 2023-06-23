import React, { useState, useEffect } from 'react';
import axios from 'axios';





const DiscoveryPage = () => {
  const [tweet, setTweet] = useState(null);
  const [follows, setFollows] = useState([]);
  const [likes, setLikes] = useState([]);
  const [retweets, setRetweets] = useState([]);
  const [comments, setComments] = useState([]);
  
  useEffect(() => {
    fetchRandomTweet();
  }, []);

  const fetchRandomTweet = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/tweets/random`);
      setTweet(response.data);
    } catch (error) {
      console.error('Error fetching random tweet:', error);
    }
  };

  const handleFollow = async (user) => {
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/actions/follow`, { user });
      // Incrementa il conteggio dei follows
      setFollows((prevFollows) => prevFollows + 1);
    } catch (error) {
      console.error('Error following user:', error);
    }
  };
  
  const handleLike = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/actions/like`);
      // Incrementa il conteggio dei likes
      setLikes((prevLikes) => prevLikes + 1);
    } catch (error) {
      console.error('Error liking tweet:', error);
    }
  };
  
  const handleRetweet = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/actions/retweet`);
      // Incrementa il conteggio dei retweets
      setRetweets((prevRetweets) => prevRetweets + 1);
    } catch (error) {
      console.error('Error retweeting tweet:', error);
    }
  };
  
  const handleComment = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/actions/comment`);
      // Incrementa il conteggio dei commenti
      setComments((prevComments) => prevComments + 1);
    } catch (error) {
      console.error('Error commenting on tweet:', error);
    }
  };
  
  const handleSkip = () => {
    fetchRandomTweet();
  };

  return (
    <div>
      {tweet ? (
        <div>
          <h2>Tweet</h2>
          <p>{tweet.content}</p>
          <h3>User</h3>
          <p>{tweet.user}</p>
          <button onClick={() => handleFollow(tweet.user)}>Follow</button>
          <button onClick={handleLike}>Like</button>
          <button onClick={handleRetweet}>Retweet</button>
          <button onClick={handleComment}>Comment</button>
          <button onClick={handleSkip}>Skip</button>
        </div>
      ) : (
        <p>Loading tweet...</p>
      )}
    </div>
  );
};

export default DiscoveryPage;
