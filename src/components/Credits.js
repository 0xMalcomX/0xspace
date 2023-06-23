import React, { useState } from 'react';

const Credits = () => {
  const [likes, setLikes] = useState(0);
  const [retweets, setRetweets] = useState(0);
  const [follows, setFollows] = useState(0);
  const [comments, setComments] = useState(0);

  return (
    <div>
      <h2>Credits</h2>
      <p>Likes: {likes}</p>
      <p>Retweets: {retweets}</p>
      <p>Follows: {follows}</p>
      <p>Comments: {comments}</p>
    </div>
  );
};

export default Credits;
