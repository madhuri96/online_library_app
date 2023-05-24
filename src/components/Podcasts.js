import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Podcasts = () => {
  const [podcasts, setPodcasts] = useState([]);

  useEffect(() => {
    const fetchPodcasts = async () => {
      try {
        const response = await axios.get(
          'https://www.googleapis.com/books/v1/volumes?q=podcasts'
        );
        setPodcasts(response.data.items);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPodcasts();
  }, []);

  return (
    <div>
      {/* <h2>Podcasts</h2> */}
      {podcasts.map((podcast) => (
        <div key={podcast.id}>
          <h3>{podcast.volumeInfo.title}</h3>
          <p>Author: {podcast.volumeInfo.authors?.join(', ') || 'Unknown'}</p>
          <p>Description: {podcast.volumeInfo.description || 'N/A'}</p>
          {/* Additional podcast details */}
        </div>
      ))}
    </div>
  );
};

export default Podcasts;
