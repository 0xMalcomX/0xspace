import React, { useState } from 'react';

const CreateTweetPage = () => {
  const [tweetContent, setTweetContent] = useState('');

  const handleInputChange = (event) => {
    setTweetContent(event.target.value);
  };

  const handleSubmit = () => {
    // Esegui una chiamata API per creare un nuovo tweet utilizzando tweetContent come contenuto
    console.log('Create tweet:', tweetContent);
    setTweetContent('');
  };

  return (
    <div>
      <h2>Create Tweet</h2>
      <textarea value={tweetContent} onChange={handleInputChange} />
      <button onClick={handleSubmit}>Tweet</button>
    </div>
  );
};

export default CreateTweetPage;
